const mongoose = require('mongoose');
const Product = require('../models/Product')

module.exports = async function (req, res, next) {
    const {
        productId
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(403).json({
            error: 'Product not found'
        })
    }

    try {
        let product = await Product.findById(productId).populate('category')

        if (!product) {
            return res.status(403).json({
                error: 'Product not found'
            })
        }

        req.product = product
    } catch (error) {
        console.log(error)
        res.send('Server error');
    }

    next()
}