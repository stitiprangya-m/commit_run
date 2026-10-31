
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
            uppercase: true,
        },

        billingFrequency: {
            type: String,
            enum: ["monthly", "yearly"],
            required: true,
        },

        minimumQuantity: {
            type: Number,
            default: 1,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: "Minimum quantity must be an integer",
            },
        },

        availableFrom: {
            type: Date,
            default: null,
        },

        availableUntil: {
            type: Date,
            default: null,
        },

        autoClose: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
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

planSchema.index(
    { organizationId: 1, name: 1 },
    { unique: true }
);

planSchema.index({
    organizationId: 1,
    status: 1,
});

planSchema.pre("validate", function () {
    if (
        this.availableFrom &&
        this.availableUntil &&
        this.availableUntil <= this.availableFrom
    ) {
        this.invalidate(
            "availableUntil",
            "Available until must be later than available from"
        );
    }
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
