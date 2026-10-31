const crypto = require("crypto");
const mongoose = require("mongoose");

const User = require("../models/User");
const Invitation = require("../models/Invitation");
const Organization = require("../models/Organization");
const Customer = require("../models/Customer");

const jwt = require("jsonwebtoken");
const Session = require("../models/Session");

const {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
} = require("../utils/tokenUtils");

const activateAccount = async ({ token, name, password }) => {
    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const mongoSession = await mongoose.startSession();

    try {
        let activatedUser;

        await mongoSession.withTransaction(async () => {
            const invitation = await Invitation.findOne({
                tokenHash,
                status: "pending",
                expiresAt: { $gt: new Date() },
            })
                .select("+tokenHash")
                .session(mongoSession);

            if (!invitation) {
                const error = new Error(
                    "Invitation is invalid, expired, or already used"
                );
                error.statusCode = 400;
                throw error;
            }

            const organization = await Organization.findById(
                invitation.organizationId
            ).session(mongoSession);

            if (!organization) {
                const error = new Error("Organization not found");
                error.statusCode = 404;
                throw error;
            }

            if (organization.status === "suspended") {
                const error = new Error(
                    "This organization is currently suspended"
                );
                error.statusCode = 403;
                throw error;
            }

            // Owner activation must match the organization's registered owner email.
            if (
                invitation.invitedRole === "org_owner" &&
                organization.ownerEmail.toLowerCase() !==
                    invitation.invitedEmail.toLowerCase()
            ) {
                const error = new Error(
                    "Invitation email does not match the organization's owner email"
                );
                error.statusCode = 400;
                throw error;
            }

            // The User model's pre-save hook should hash the password.
            const user = new User({
                name,
                email: invitation.invitedEmail,
                password,
                role: invitation.invitedRole,
                organizationId: invitation.organizationId,
                permissions:
                    invitation.invitedRole === "staff"
                        ? invitation.permissions || []
                        : [],
                accountStatus: "active",
                emailVerified: true,
                passwordSetAt: new Date(),
                createdBy: invitation.invitedBy,
            });

            await user.save({ session: mongoSession });

            if (invitation.invitedRole === "org_owner") {
                if (organization.ownerUserId) {
                    const error = new Error(
                        "This organization already has an owner"
                    );
                    error.statusCode = 409;
                    throw error;
                }

                organization.ownerUserId = user._id;
                organization.status = "active";

                await organization.save({ session: mongoSession });
            }

            if (invitation.invitedRole === "customer") {
                if (!invitation.customerId) {
                    const error = new Error(
                        "Customer invitation is missing its customer record"
                    );
                    error.statusCode = 400;
                    throw error;
                }

                const customer = await Customer.findOneAndUpdate(
                    {
                        _id: invitation.customerId,
                        organizationId: invitation.organizationId,
                        email: invitation.invitedEmail,
                        userId: null,
                    },
                    { $set: { userId: user._id } },
                    { new: true, session: mongoSession }
                );

                if (!customer) {
                    const error = new Error(
                        "Matching customer record not found or already linked"
                    );
                    error.statusCode = 409;
                    throw error;
                }
            }

            invitation.status = "accepted";
            invitation.acceptedBy = user._id;
            invitation.acceptedAt = new Date();

            await invitation.save({ session: mongoSession });

            activatedUser = user;
        });

        return {
            user: {
                id: activatedUser._id,
                name: activatedUser.name,
                email: activatedUser.email,
                role: activatedUser.role,
                organizationId: activatedUser.organizationId,
                permissions: activatedUser.permissions,
            },
        };
    } finally {
        await mongoSession.endSession();
    }
};

const login = async ({ email, password, userAgent, ipAddress }) => {
    const user = await User.findOne({
        email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    if (user.accountStatus !== "active") {
        const error = new Error("Your account is not active");
        error.statusCode = 403;
        throw error;
    }

    let organization = null;

    if (user.role !== "super_admin") {
        organization = await Organization.findById(user.organizationId);

        if (!organization || organization.status !== "active") {
            const error = new Error(
                "Your organization is not active"
            );
            error.statusCode = 403;
            throw error;
        }
    }

    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    const createdSession = await Session.create({
        userId: user._id,
        organizationId: user.organizationId || null,
        refreshTokenHash: "pending",
        expiresAt,
        userAgent,
        ipAddress,
        lastUsedAt: new Date(),
    });

    const refreshToken = generateRefreshToken(
        user,
        createdSession._id
    );

    createdSession.refreshTokenHash = hashToken(refreshToken);
    await createdSession.save();

    const accessToken = generateAccessToken(user);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            permissions: user.permissions || [],
        },
    };
};

module.exports = {
    activateAccount,
    login,
};