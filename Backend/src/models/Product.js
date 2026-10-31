
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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

        sku: {
            type: String,
            trim: true,
            uppercase: true,
            default: null,
        },

        type: {
            type: String,
            enum: ["software", "service", "physical", "other"],
            required: true,
        },

        salesPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        costPrice: {
            type: Number,
            default: 0,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
            uppercase: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        status: {
            type: String,
            enum: ["active", "inactive", "archived"],
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

// Product SKU unique within an organization
productSchema.index(
    { organizationId: 1, sku: 1 },
    {
        unique: true,
        partialFilterExpression: {
            sku: { $type: "string" },
        },
    }
);

productSchema.index({
    organizationId: 1,
    status: 1,
    createdAt: -1,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
