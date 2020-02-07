const db = require('../db');

const ProductVariantSchema = new db.Schema({
    id: Number,
    description: String,
    images: [String],
    price: Number,
    discounted_price: Number,
    is_default: { type: Boolean, default: false },
    attributes: [{
        key: Number,
        value: String
    }]
});

const ProductSchema = new db.Schema(
    {
        id: Number,
        name: String,
        description: String,
        variants: [ProductVariantSchema],
        images: [String],
        price: Number,
        discounted_price: Number,
    },
    {
        collection: 'product'
    }
);

const Product = db.model('Product', ProductSchema);

module.exports = Product;