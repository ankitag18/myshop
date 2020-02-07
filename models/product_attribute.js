const db = require('../db');

const ProductAttributeSchema = new db.Schema(
    {
        id: { type: Number, default: 0 },
        name: String,
    },
    {
        collection: 'product_attribute'
    }
);

const ProductAttribute = db.model('ProductAttribute', ProductAttributeSchema);

module.exports = ProductAttribute;