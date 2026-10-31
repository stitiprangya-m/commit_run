
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"],
            trim: true,
            maxlength: 100,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            select: false,
        },

        role: {
            type: String,
            enum: [
                "super_admin",
                "org_owner",
                "staff",
                "customer",
            ],
            required: true,
        },

        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            default: null,
        },

        permissions: {
            type: [String],
            default: [],
            enum: [
                "customers.read",
                "customers.create",
                "customers.update",
                "customers.deactivate",

                "products.read",
                "products.create",
                "products.update",
                "products.archive",

                "plans.read",
                "plans.create",
                "plans.update",
                "plans.manage_status",

                "subscriptions.read",
                "subscriptions.create",
                "subscriptions.update",
                "subscriptions.pause",
                "subscriptions.close",

                "invoices.read",
                "invoices.create",
                "invoices.confirm",
                "invoices.cancel",
                "invoices.download",

                "payments.read",
                "payments.record",
                "payments.allocate",

                "dashboard.view",

                "staff.read",
                "staff.invite",
                "staff.update",
                "staff.permissions.manage",
            ],
        },

        accountStatus: {
            type: String,
            enum: ["invited", "active", "deactivated"],
            default: "invited",
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },

        passwordSetAt: {
            type: Date,
            default: null,
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Validate organization association based on role
userSchema.pre("validate", function () {
    if (this.role === "super_admin" && this.organizationId) {
        this.invalidate(
            "organizationId",
            "Super Admin cannot belong to an organization"
        );
    }

    if (
        ["org_owner", "staff", "customer"].includes(this.role) &&
        !this.organizationId
    ) {
        this.invalidate(
            "organizationId",
            "Organization is required for this role"
        );
    }

    if (this.role !== "staff" && this.permissions?.length > 0) {
        this.invalidate(
            "permissions",
            "Custom permissions are only applicable to staff"
        );
    }
});

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) {
        return;
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordSetAt = new Date();
});

// Compare entered password with stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!this.password) return false;

    return bcrypt.compare(enteredPassword, this.password);
};

// Index for organization-based user queries
userSchema.index({
    organizationId: 1,
    role: 1,
    accountStatus: 1,
});

// Only one organization owner per organization
userSchema.index(
    { organizationId: 1 },
    {
        unique: true,
        partialFilterExpression: {
            role: "org_owner",
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
