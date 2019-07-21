var Order = require('./../models/order');
var Cart = require('./../models/cart');
exports.getSingnUp = (req, res, next) => {
    var totalQty = 0;
    if( req.session.cart != undefined ) {
        totalQty =  req.session.cart.totalQty;
    }
    var messages = req.flash('error');
    res.render('user/signup', { title: 'Sign Acount', 
    csrfToken: req.csrfToken(), 
    messages: messages,
    totalQty: totalQty, 
    hasErrors: messages.length > 0});
}

exports.postSingnUp = (req, res, next) => {
    res.redirect('/products');
}

exports.getProfile = (req, res, next) => {
    var totalQty = 0;
    if( req.session.cart != undefined ) {
        totalQty =  req.session.cart.totalQty;
    }

    Order.find({ user: req.user }, function(err,orders){
            if(err) {
                 return res.write('Error!');
            }
            var cart;
            orders.forEach(function(order){
                cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
        res.render('user/profile',  { title: 'Profile', totalQty: totalQty, orders: orders });
    });
}

exports.getSignin = (req, res, next) => {
    var messages = req.flash('error');
    var totalQty = 0;
    if( req.session.cart != undefined ) {
        totalQty =  req.session.cart.totalQty;
    }
    res.render('user/signin', { 
    title: 'Sign In', 
    csrfToken: req.csrfToken(),
    messages: messages,
    totalQty: totalQty,
    hasErrors: messages.length > 0
    });
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/products');
}