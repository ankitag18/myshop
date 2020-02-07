const ProductModel = require('../models/product');
const ProductAttributeModel = require('../models/product_attribute');
const helper = require('../helpers/helper');


module.exports = function (app) {

    app.get('/list', (req, res) => {
        ProductModel.find({}, { _id: 0, __v: 0 }).then((result) => {
            ProductAttributeModel.find().then((attributeDetails) => {
                const products = result.map((item) => {
                    const { productAttributes: attributes, defaultVariant } = helper.getProductAttributes(item.variants);

                    item = item.toObject();
                    delete item.variants;

                    return {
                        ...item,
                        attributes,
                        defaultVariant,
                    }
                });

                // console.log({ products, attributeDetails });
                res.render('product', { products, attributeDetails });
            })

        }).catch((err) => {
            res.json(err.message);
        })
    });

    app.post('/getProductDetailByAttr', (req, res) => {
        const product_id = req.body.product_id;
        const attribute = req.body.attribute;
        let selectedAttributes = req.body.selectedAttributes;

        ProductModel.findOne({ id: product_id }, { _id: 0, __v: 0 }).then((result) => {

            selectedAttributes = selectedAttributes.map((item) => {
                if (item.id === attribute.id) {
                    return attribute;
                }
                return item;
            });

            let defaultVariant = result.variants.filter(({ attributes }) => {
                let isAttrValid = true;
                attributes.forEach((attr) => {
                    if (!selectedAttributes.find(({ id, value }) => id == attr.key && value == attr.value)) {
                        isAttrValid = false;
                    }
                });

                return isAttrValid;
            });

            defaultVariant = defaultVariant.length ? defaultVariant[0] : {}

            res.json({ defaultVariant, product_id });
        });

    });

    app.get('/details/:id', (req, res) => {
        const product_id = req.params.id;
        ProductModel.findOne({ id: product_id }, { _id: 0, __v: 0 }).then((result) => {
            const product = result ? result.toObject() : {};
            // console.log(product);
            res.render('detail', { product });
        });
    });

}