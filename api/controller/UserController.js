exports.getSingnUp = (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signup', { title: 'Sign Acount', 
    csrfToken: req.csrfToken(), 
    messages: messages, 
    hasErrors: messages.length > 0});
}

exports.postSingnUp = (req, res, next) => {
    res.redirect('/products');
}

exports.getProfile = (req, res, next) => {
    res.render('user/profile');
}

exports.getSignin = (req, res, next) => {
    var messages = req.flash('error');
    console.log("data response :"+ messages);
    res.render('user/signin', { 
    title: 'Sign In', 
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
    });
}