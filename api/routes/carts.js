const express = require('express');
const router = express.Router();
const CartController = require("../controller/CartController");
//list product
router.get('/add-to-cart/:id', CartController.addToCart);
router.get('/shopping-cart', CartController.shoppingCart);
router.get('/checkout',isLoggedIn, CartController.CheckCart);
router.post('/checkout',isLoggedIn, CartController.postCheckCart);
router.get('/reduce/:id', CartController.reduceByOne);
router.get('/remove/:id', CartController.removeItem);
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/users/signin');
}
module.exports = router;
