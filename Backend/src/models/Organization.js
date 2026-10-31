
const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Organization name is required"],
            trim: true,
            maxlength: 150,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        // Email of the founder invited by Super Admin
        ownerEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        // Assigned after founder activates their account.
        // An organization can have only one owner reference.
        ownerUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            immutable: true,
        },

        status: {
            type: String,
            enum: ["pending", "active", "suspended"],
            default: "pending",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        settings: {
            currency: {
                type: String,
                default: "INR",
            },

            timezone: {
                type: String,
                default: "UTC",
            },
        },
    },
    {
        timestamps: true,
    }
);

// A user can own only one organization.
organizationSchema.index(
    { ownerUserId: 1 },
    {
        unique: true,
        partialFilterExpression: {
            ownerUserId: { $type: "objectId" },
        },
    }
);

const Organization = mongoose.model(
    "Organization",
    organizationSchema
);

module.exports = Organization;
