
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        recipientUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "organization_activated",
                "staff_invited",
                "customer_invited",
                "subscription_activated",
                "subscription_expiring",
                "subscription_renewed",
                "invoice_generated",
                "invoice_due",
                "payment_received",
                "payment_overdue",
                "general",
            ],
            default: "general",
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },

        entityType: {
            type: String,
            enum: [
                "organization",
                "user",
                "customer",
                "subscription",
                "invoice",
                "payment",
                null,
            ],
            default: null,
        },

        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        isRead: {
            type: Boolean,
            default: false,
        },

        readAt: {
            type: Date,
            default: null,
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// User-specific notification listing
notificationSchema.index({
    organizationId: 1,
    recipientUserId: 1,
    isRead: 1,
    createdAt: -1,
});

// Organization-level notification queries
notificationSchema.index({
    organizationId: 1,
    createdAt: -1,
});

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = Notification;
