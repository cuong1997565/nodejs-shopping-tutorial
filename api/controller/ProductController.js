const Product = require('../models/product');
const mongoose = require("mongoose");

exports.product_list = (req, res, next) => {
    Product.find().sort({ _id: -1 })
        .exec()
        .then(result => {
            var totalQty = 0;
            if( req.session.cart != undefined ) {
                totalQty =  req.session.cart.totalQty;
            }
            // var productChunks = [];
            // var chunlSize = 3;
            // for(var i = 0 ; i < result.length; i += chunlSize) {
            //         productChunks.push(result.slice(i, i+ chunlSize));
            // }
            res.render('shopping/content', { title: 'Shopping Cart', products:result, totalQty: totalQty});
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}