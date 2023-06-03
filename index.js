const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      flash = require('connect-flash'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      session = require('express-session'),
      methodOverride = require('method-override'),
      path = require('path');

require('dotenv').config();
const PORT = process.env.PORT;

//! MONGOOSE CONNECTION

const username = process.env.DB_USERNAME,
      pass = process.env.DB_PASSWARD;

mongoose
.connect(`mongodb+srv://${username}:${pass}@cluster0.fhavar4.mongodb.net/`)
.then(()=>{
    console.log('Data Base is connected');
})
.catch((err)=>{
    console.log('error');
})

// session setup
const sessionPass = process.env.SESSION_PASS;

app.use(
    session({
        secret: sessionPass,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            // secure: true,
            expires: Date.now() + 1000 * 60 * 60 * 24,
            maxAge : 1000 * 60 * 60 * 24
        }
    })
);

// passport setup
const User = require('./models/user');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//! server set and middlewares

app.use(express.static(path.join(__dirname,'public'))); // static resources
app.set('view engine' , 'ejs');// ejs extension
app.use(methodOverride('_method')); // patch/delete requests)
app.use(flash());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success  = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// set view engine
app.set('view engine' , 'ejs');
    

// ! APIs

const hotelRoutes = require('./routes/hotel')
app.use(hotelRoutes);

const authRoutes = require('./routes/auth');
app.use(authRoutes);




app.listen(PORT,()=>{
    console.log('server running on port' + PORT);
});