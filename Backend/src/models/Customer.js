
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        customerNumber: {
            type: String,
            required: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        companyName: {
            type: String,
            trim: true,
            maxlength: 150,
        },

        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
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

// Customer number unique within an organization
customerSchema.index(
    { organizationId: 1, customerNumber: 1 },
    { unique: true }
);

// Email unique within an organization
customerSchema.index(
    { organizationId: 1, email: 1 },
    { unique: true }
);

// A user can be linked to only one customer profile
customerSchema.index(
    { organizationId: 1, userId: 1 },
    {
        unique: true,
        partialFilterExpression: {
            userId: { $type: "objectId" },
        },
    }
);

customerSchema.index({
    organizationId: 1,
    status: 1,
    createdAt: -1,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
