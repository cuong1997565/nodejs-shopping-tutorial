const express = require('express');
const router = express.Router();
const UserController = require('./../controller/UserController');
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
router.use(csrfProtection);
//list product
router.get('/singnup/', UserController.getSingnUp);
router.post('/singnup/',passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/singnup',
    failureFlash: true
}));
router.get('/profile', isLoggedIn,  UserController.getProfile);

router.get('/signin', UserController.getSignin);
router.post('/signin',passport.authenticate('local.signin', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/products');
}

module.exports = router;
