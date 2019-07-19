exports.getSingnUp = (req, res, next) => {
    var totalQty = req.session.cart.totalQty;
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
    res.render('user/profile',  { title: 'Profile', });
}

exports.getSignin = (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signin', { 
    title: 'Sign In', 
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
    });
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/products');
}