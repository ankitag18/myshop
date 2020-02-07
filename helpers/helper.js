const ProductAttributeModel = require('../models/product_attribute');

module.exports = {

    getProductAttributes(variants) {

        let counter = 0;
        const attributes = {};
        let defaultVariant = {}

        while (variants.length > counter) {

            if (variants[counter].is_default) {
                defaultVariant = variants[counter];
            }

            const productAttr = variants[counter].attributes;
            productAttr.forEach(item => {
                if (Object.keys(attributes).includes(String(item.key))) {
                    attributes[item.key].add(item.value);
                } else {
                    attributes[[item.key]] = new Set().add(item.value);
                }
            });

            counter++;
        }

        const productAttributes = {};
        for (var attr in attributes) {
            productAttributes[attr] = Array.from(attributes[attr]);
        }

        return {
            productAttributes,
            defaultVariant
        };
    }
}