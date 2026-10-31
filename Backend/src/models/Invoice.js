
const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: null,
        },

        description: {
            type: String,
            required: true,
            trim: true,
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

        taxAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const invoiceSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        invoiceNumber: {
            type: String,
            required: true,
            trim: true,
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscription",
            default: null,
        },

        invoiceDate: {
            type: Date,
            required: true,
            default: Date.now,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        billingPeriod: {
            startDate: {
                type: Date,
                default: null,
            },

            endDate: {
                type: Date,
                default: null,
            },
        },

        // Stable key for a subscription billing period.
        // Example: 2026-11-01_2026-12-01
        billingPeriodKey: {
            type: String,
            default: null,
        },

        items: {
            type: [invoiceItemSchema],
            required: true,
            validate: {
                validator: items => items.length > 0,
                message: "Invoice must contain at least one item",
            },
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

        discountAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        amountPaid: {
            type: Number,
            default: 0,
            min: 0,
        },

        balanceDue: {
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
                "outstanding",
                "partially_paid",
                "paid",
                "overdue",
                "cancelled",
            ],
            default: "draft",
        },

        notes: {
            type: String,
            trim: true,
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

// Invoice number unique within an organization
invoiceSchema.index(
    { organizationId: 1, invoiceNumber: 1 },
    { unique: true }
);

// Prevent duplicate invoices for the same subscription
// and billing period.
invoiceSchema.index(
    {
        organizationId: 1,
        subscriptionId: 1,
        billingPeriodKey: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            subscriptionId: { $type: "objectId" },
            billingPeriodKey: { $type: "string" },
        },
    }
);

invoiceSchema.index({
    organizationId: 1,
    customerId: 1,
    invoiceDate: -1,
});

invoiceSchema.index({
    organizationId: 1,
    status: 1,
    dueDate: 1,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
