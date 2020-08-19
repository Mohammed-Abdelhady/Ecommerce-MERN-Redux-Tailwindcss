const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const productById = require('../middleware/productById');
const _ = require('lodash');



// @route   Get api/product/:productId
// @desc    Get a list of products  with filter 
//  options(order = asc or desc, sortBy any product propert like name, limit, number of returned product)
// @access  Public
router.get('/list', async (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    try {
        let products = await Product.find({})
            .select('-photo')
            .populate('category')
            .sort([
                [sortBy, order]
            ])
            .limit(limit).exec();
        if (!products) {
            return res.status(400).json({
                error: 'Products not found',
            });
        }

        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid querys');
    }
});

// @route   Post api/product/
// @desc    Create a Product
// @access  Private Admin
router.post('/', auth, adminAuth, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }

        if (!files.photo) {
            return res.status(400).json({
                error: 'Image is required',
            });
        }

        if (
            files.photo.type !== 'image/jpeg' &&
            files.photo.type !== 'image/jpg' &&
            files.photo.type !== 'image/png'
        ) {
            return res.status(400).json({
                error: 'Image type not allowed',
            });
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
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        ) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }

        let product = new Product(fields);
        // 1MB = 1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size',
            });
        }

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;

        try {
            await product.save();
            res.json('Product Created Successfully');
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});

// @route   Get api/product/productId
// @desc    Get a Product information
// @access  Public
router.get('/:productId', productById, (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
});

// @route   Get api/product/photo/productId
// @desc    Get a Product Image
// @access  Public
router.get('/photo/:productId', productById, (req, res) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    res.status(400).json({
        error: 'failed to load image',
    });
});

// @route   Delete api/product/productId
// @desc    Delete a Product
// @access  Private Admin
router.delete('/:productId', auth, adminAuth, productById, async (req, res) => {
    let product = req.product;
    try {
        let deletedProduct = await product.remove();
        res.json({
            message: `${deletedProduct.name} deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// @route   Put api/product/:productId
// @desc    Update Single product
// @access  Private Admin
router.put('/:productId', auth, adminAuth, productById, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size',
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        try {
            let productDetails = await product.save();
            productDetails.photo = undefined;
            res.json(productDetails);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});



module.exports = router;