const Product = require('../models/product');
const mongoose = require("mongoose");
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.addToCart = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart  : {});
    Product.findById(productId, function(err, product){
        if(err){
            return res.redirect('/products');
        }
        cart.add(product, product._id);
        req.session.cart = cart;
        res.redirect('/products');
    })
}


exports.reduceByOne = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/carts/shopping-cart')
}

exports.removeItem = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/carts/shopping-cart')
}

exports.shoppingCart = (req, res, next) => {
    if(!req.session.cart) {
        return res.render('shopping/shopping_cart',{products: null, totalQty: 0, title: 'shopping cart'});
    }
    var cart = new Cart(req.session.cart);
    var data =  cart.generateArray();
    res.render('shopping/shopping_cart', {
        products : cart.generateArray(),
        title: 'shopping cart', 
        totalQty: cart.totalQty, 
        totalPrice : cart.totalPrice});
}

exports.CheckCart = (req, res, next) => {
    if(!req.session.cart) {
        return res.render('shopping/checkout',{totalQty: 0, title: 'shopping checkout'});
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    return res.render('shopping/checkout',{
        totalQty: cart.totalQty, 
        totalPrice : cart.totalPrice,
        title: 'shopping checkout',
        errMsg: errMsg,
        noError : !errMsg
    });
}

exports.postCheckCart = (req, res, next) => {
    if (!req.session.cart) {
       return res.redirect('/carts/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var stripe = require("stripe")("sk_test_QFJXVbSACS4giw271Mz1LHK500wnBceHjC");
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge){
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/carts/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address : req.body.address,
            name : req.body.name,
            paymentId : charge.id
        });
        order.save(function(err, result){
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/products');
        });
    });
}