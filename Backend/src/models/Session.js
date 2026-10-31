
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            default: null,
        },

        refreshTokenHash: {
            type: String,
            required: true,
            select: false,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        revokedAt: {
            type: Date,
            default: null,
        },

        userAgent: {
            type: String,
            default: null,
        },

        ipAddress: {
            type: String,
            default: null,
        },

        lastUsedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

sessionSchema.index({
    userId: 1,
    revokedAt: 1,
});

sessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
