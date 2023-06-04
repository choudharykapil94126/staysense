

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');


router.get('/register' , (req,res)=>{
    res.render('users/register');
});
 
router.post('/register' , async (req,res)=>{
    try {
        let newuser = new User({
            username: req.body.username
    });
    // hashing and salting and saving
    let registeredUser = await User.register(newuser , req.body.password);
    // saved user is not logged in 
    // passport -> cookied will automatically generate 
    req.login(registeredUser, (err)=>{
        if(err) {
            req.flash('error' , 'registration failed, please try again');
            console.log(err);
            return res.redirect('/register');
    
        }
        req.flash('success', 'welcome user');
        res.redirect('/hotels');
    });
    } catch (error) {
        req.flash('error' , 'registration failed, please try again');
        console.log(error);
        return res.redirect('/register');
    }
});

router.get('/login' , (req,res)=>{
    res.render('users/login');
}); 

router.post('/login' , passport.authenticate('local' , {
    failueFlash: true,
    failureRedirect: 'login'
}) ,  
    (req,res)=>{
        req.flash('success' , 'welcome back user');
        res.redirect('/hotels');
});

router.get('/logout' , (req , res)=>{
    req.logout((err)=>{
        if(err){
            req.flash('error' , 'something went wrong while loggin out');
            console.log(err);
            return res.redirect('/hotels');
        }
        res.flash('success' , 'logout done');
        res.redirect('/hotels')
    })
})

module.exports = router;


