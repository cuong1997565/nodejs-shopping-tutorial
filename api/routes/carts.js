const express = require('express');
const router = express.Router();
const CartController = require("../controller/CartController");
//list product
router.get('/add-to-cart/:id', CartController.addToCart);
router.get('/shopping-cart', CartController.shoppingCart);
router.get('/checkout', CartController.CheckCart);
router.post('/checkout', CartController.postCheckCart);
module.exports = router;
