const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');

router.get('/' , (req,res)=>{
    res.render('landing');
})


router.get('/hotels' , async(req,res)=>{
    try {
        let hotels =await Hotel.find({});
        res.render('hotels/index' , {hotels});
        
    } catch (error) {
        req.flash('error' , 'error while fetching the hotels , please try later')
        res.redirect('/');
    }

});

router.get('/hotels/new' , (req,res)=>{
    res.render('hotels.new');
});

router.post('hotels' , async(req,res)=>{
    try {
        let hotel = new Hotel(req.body.hotel);
        await hotel.save();
        req.flash('success','hotel created');
        res.redirect(`/hotels/${hotel._id}`)
        
    } catch (error) {
        req.flash('error','error while creating hotels,please try later')
        
    }
});

router.get('/hotels/:id' , async(req,res)=>{
    try {
        let hotel = await Hotel.findById(req.params.id);
        res.render('hotels/show',{hotel});
        
    } catch (error) {
        req.flash('error','error while fetching the hotel, please try again later');
        console.log(error);
        res.redirect('/hotels');
    }
});

router.get('/hotels/:id/edit' , async (req,res)=>{
    try {
        let hotel = await Hotel.findById(req.params.id);
        res.render('hotels/edit' , {hotel});
        } catch (error) {
            req.flash('error','error while edit the hotel, please try again later');
            console.log(error);
            res.redirect('/hotels');
        
    }
});
// update
router.patch('/hotels/:id' , async (req,res)=>{
    try {
        await Hotel.findByIdAndUpdate(req.params.id , req.body.hotel);
        res.redirect(`/hotels/${req.params.id}`);
    } catch (error) {
        req.flash('error','error while updating a  hotel, please try again later');
            console.log(error);
            res.redirect('/hotels');
    }
});

router.delete('/hotels/:id',async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;