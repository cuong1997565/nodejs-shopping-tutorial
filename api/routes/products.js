const express = require('express');
const router = express.Router();
const ProductController = require('./../controller/ProductController');
//list product
router.get('/', ProductController.product_list);
module.exports = router;