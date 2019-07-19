const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');
const cartRoutes = require('./api/routes/carts');

const mongoose = require("mongoose");
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var MongoStore = require('connect-mongo')(session);
const expressValidator = require('express-validator');
require('./config/passport');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extend : false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'mysupersecret', 
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
//ejs
app.set("view engine","ejs");
app.set("views","./api/views");
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/shopping",  function(err, db) {
    if(err) {
        console.log('Unable to connect to the server ', err);
    } else {
        console.log("Connection mongodb");
    }
});

app.use('/products', productRoutes);
app.use('/users',userRoutes);
app.use('/carts',cartRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
});

module.exports = app;