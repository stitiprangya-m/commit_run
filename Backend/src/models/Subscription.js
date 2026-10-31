
const mongoose = require("mongoose");

const subscriptionItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        taxRate: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const subscriptionSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        subscriptionNumber: {
            type: String,
            required: true,
            trim: true,
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: true,
        },

        planName: {
            type: String,
            required: true,
        },

        billingFrequency: {
            type: String,
            enum: ["monthly", "yearly"],
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        expiryDate: {
            type: Date,
            default: null,
        },

        currentPeriodStart: {
            type: Date,
            default: null,
        },

        currentPeriodEnd: {
            type: Date,
            default: null,
        },

        nextBillingDate: {
            type: Date,
            default: null,
        },

        paymentTerms: {
            type: String,
            enum: ["immediate", "net_7", "net_15", "net_30"],
            default: "immediate",
        },

        items: {
            type: [subscriptionItemSchema],
            default: [],
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        taxAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
            uppercase: true,
        },

        status: {
            type: String,
            enum: [
                "draft",
                "confirmed",
                "active",
                "paused",
                "closed",
            ],
            default: "draft",
        },

        pausedAt: {
            type: Date,
            default: null,
        },

        closedAt: {
            type: Date,
            default: null,
        },

        autoClose: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

subscriptionSchema.index(
    { organizationId: 1, subscriptionNumber: 1 },
    { unique: true }
);

subscriptionSchema.index({
    organizationId: 1,
    customerId: 1,
    status: 1,
});

subscriptionSchema.index({
    organizationId: 1,
    status: 1,
    nextBillingDate: 1,
});

subscriptionSchema.index({
    organizationId: 1,
    status: 1,
    expiryDate: 1,
});

subscriptionSchema.pre("validate", function () {
    if (
        this.currentPeriodStart &&
        this.currentPeriodEnd &&
        this.currentPeriodEnd <= this.currentPeriodStart
    ) {
        this.invalidate(
            "currentPeriodEnd",
            "Billing period end must be after its start"
        );
    }

    if (
        this.expiryDate &&
        this.startDate &&
        this.expiryDate <= this.startDate
    ) {
        this.invalidate(
            "expiryDate",
            "Expiry date must be after the start date"
        );
    }
});

const Subscription = mongoose.model(
    "Subscription",
    subscriptionSchema
);

module.exports = Subscription;
