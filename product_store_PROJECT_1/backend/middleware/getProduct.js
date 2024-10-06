import Product from "../models/productModel.js";

async function getProduct(req, res, next) {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({
            message: 'missing id field',
        });
    }

    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }
        req.product = product;
        next();
    } catch (err) {
        return res.status(404).json({
            message: 'Invalid id or server error.',
            error:err
        })
    }
}

export default getProduct;