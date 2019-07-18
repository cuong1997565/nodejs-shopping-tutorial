const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');
const mongoose = require("mongoose");
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
const expressValidator = require('express-validator');
require('./config/passport');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extend : false}));
app.use(bodyParser.json());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
//ejs
app.set("view engine","ejs");
app.set("views","./api/views");
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header("Access-Control-Allow-Headers",
//     "Origin,X-Requested-With, Content-Type, Accept, Authorization");
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
//         return res.status(200).json({});
//     }
//     next();        
// });
mongoose.connect("mongodb://localhost:27017/shopping",  function(err, db) {
    if(err) {
        console.log('Unable to connect to the server ', err);
    } else {
        console.log("Connection mongodb");
    }
});


//routes which should handle requests
app.use('/products', productRoutes);
app.use('/users',userRoutes);
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