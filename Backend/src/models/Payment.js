
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        paymentNumber: {
            type: String,
            required: true,
            trim: true,
        },

        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
            required: true,
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },

        currency: {
            type: String,
            default: "INR",
            uppercase: true,
        },

        method: {
            type: String,
            enum: [
                "credit_card",
                "debit_card",
                "upi",
                "bank_transfer",
                "cash",
            ],
            required: true,
        },

        paymentDate: {
            type: Date,
            required: true,
            default: Date.now,
        },

        referenceNumber: {
            type: String,
            trim: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        status: {
            type: String,
            enum: ["recorded", "voided", "refunded"],
            default: "recorded",
        },

        recordedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

paymentSchema.index(
    { organizationId: 1, paymentNumber: 1 },
    { unique: true }
);

paymentSchema.index({
    organizationId: 1,
    invoiceId: 1,
    status: 1,
});

paymentSchema.index({
    organizationId: 1,
    customerId: 1,
    paymentDate: -1,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
