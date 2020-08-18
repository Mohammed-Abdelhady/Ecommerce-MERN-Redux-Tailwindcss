const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const formidable = require('formidable')
const fs = require('fs')


// @route   Post api/product/
// @desc    Create a Product
// @access  Private Admin
router.post("/", auth, adminAuth, (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        if (!files.photo) {
            return res.status(400).json({
                error: 'Image is required'
            })
        }

        if (files.photo.type !== 'image/jpeg' && files.photo.type !== 'image/jpg' && files.photo.type !== 'image/png') {
            return res.status(400).json({
                error: 'Image type not allowed'
            })
        }

        // Check for all fields
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        let product = new Product(fields)
        // 1MB = 1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size'
            })
        }

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;

        try {
            await product.save()
            res.json('Product Created Successfully')
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    })
})

module.exports = router