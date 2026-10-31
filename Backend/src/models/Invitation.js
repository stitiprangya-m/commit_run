
const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            index: true,
        },

        invitedEmail: {
            type: String,
            required: [true, "Recipient email is required"],
            lowercase: true,
            trim: true,
        },

        invitedRole: {
            type: String,
            enum: ["org_owner", "staff", "customer"],
            required: true,
        },

        // SHA-256 hash of the raw activation token
        tokenHash: {
            type: String,
            required: true,
            unique: true,
            select: false,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "revoked", "expired"],
            default: "pending",
        },

        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        acceptedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        acceptedAt: {
            type: Date,
            default: null,
        },

        revokedAt: {
            type: Date,
            default: null,
        },

        // Used when inviting an existing customer profile
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            default: null,
        },

        // Permissions assigned to the invited staff member
        permissions: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Prevent multiple pending invitations for the same
// email, role and organization.
invitationSchema.index(
    {
        organizationId: 1,
        invitedEmail: 1,
        invitedRole: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            status: "pending",
        },
    }
);

// Useful for finding pending invitations that need processing
invitationSchema.index({
    organizationId: 1,
    status: 1,
    expiresAt: 1,
});

invitationSchema.pre("validate", function () {
    // Only staff invitations can contain permissions
    if (
        this.invitedRole !== "staff" &&
        this.permissions.length > 0
    ) {
        this.invalidate(
            "permissions",
            "Permissions are only applicable to staff invitations"
        );
    }

    // Customer invitation must reference a customer profile
    if (
        this.invitedRole === "customer" &&
        !this.customerId
    ) {
        this.invalidate(
            "customerId",
            "Customer profile is required for customer invitations"
        );
    }

    // Only pending invitations can be accepted
    if (
        this.status === "accepted" &&
        (!this.acceptedBy || !this.acceptedAt)
    ) {
        this.invalidate(
            "acceptedAt",
            "Accepted invitation must have acceptance details"
        );
    }
});

const Invitation = mongoose.model(
    "Invitation",
    invitationSchema
);

module.exports = Invitation;
