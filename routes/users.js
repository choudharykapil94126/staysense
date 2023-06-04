const User = require('../models/user');

const express = require('express'),
    { isLoggedIn } = require('../middlewares/index'),
      router = express.Router(),
      user = require('../models/user');


router.get('/users/:id' , isLoggedIn , async(req,res)=>{
    try {
        let user = await User.findById(req.params.id);
        res.render('users/show.ejs' , { user });
    } catch (error) {
        req.flash('error','error while fetching user,please try later')
        console.log(error);
        res.redirect('/hotels');
    }
});


router.get('/users/:id/edit' , async (req,res)=>{
    try {
        let user = await User.findById(req.params.id);
        res.render('users/edit' , { user });
    } catch (error) {
        req.flash('error','error while fetching user,please try later')
        console.log(error);
        res.redirect('/hotels');
    }
});
router.patch('/users/:id' , async(req,res)=>{
    try {
        let user = await User.findByIdAndUpdate(req.params.id , req.body.user);
        req.flash('success' , 'user update done');
        res.redirect(`/users/${req.params.id}`)
    } catch (error) {
        req.flash('error','error while updating user,please try later')
        console.log(error);
        res.redirect(`/users/${req.params.id}`);
    }
});



module.exports = router;