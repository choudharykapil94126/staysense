const express = require('express'),
      {isLoggedIn , isHotelAuthor} = require('../middlewares/index');
const router = express.Router();
const Hotel = require('../models/hotel');

// Cloud upload
const multer = require('multer');
const {storage} = require('../cloudinary/cloud_config.js');
const upload = multer({storage});

router.get('/' , (req,res)=>{
    res.render('landing');
})


router.get('/hotels' , async(req,res)=>{
    try {
        let hotels = await Hotel.find({});
        res.render('hotels/index' , {hotels});
        
    } catch (error) {
        req.flash('error' , 'error while fetching the hotels , please try later')
        res.redirect('/');
    }

});

router.get('/hotels/new' ,isLoggedIn, (req,res)=>{
    res.render('hotels/new');
});

router.post('/hotels' , isLoggedIn, upload.array('image') , async(req,res)=>{
    try {
        let hotel = new Hotel(req.body.hotel);
        hotel.author = req.user._id;
        for(let file of req.files){
            hotel.images.push({
                url: file.path,
                filename: file.filename
            });
        }
        await hotel.save();
        req.flash('success','hotel created');
        res.redirect(`/hotels/${hotel._id}`);
        
    } catch (error) {
        req.flash('error','error while creating hotels,please try later')
        console.log(error);
        res.redirect('/hotels');
        
    }
});

router.get('/hotels/:id' , async(req,res)=>{
    try {
        let hotel = await Hotel.findById(req.params.id)
        .populate({
            path: 'author'
        })
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        });
        res.render('hotels/show',{hotel});
        
    } catch (error) {
        req.flash('error','error while fetching the hotel, please try again later');
        console.log(error);
        res.redirect('/hotels');
    }
});

router.get('/hotels/:id/edit' , isLoggedIn , isHotelAuthor , async (req,res)=>{
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
router.patch('/hotels/:id' , isLoggedIn , isHotelAuthor ,async (req,res)=>{
    try {
        await Hotel.findByIdAndUpdate(req.params.id , req.body.hotel);
        req.flash('success' , 'update done');
        res.redirect(`/hotels/${req.params.id}`);
    } catch (error) {
        req.flash('error','error while updating a  hotel, please try again later');
        console.log(error);
        res.redirect('/hotels');
    }
});

router.delete('/hotels/:id' , isLoggedIn , isHotelAuthor , async(req,res)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);  
        req.flash('success' , 'delete done');
        res.redirect('/hotels');
    } catch (error) {
        req.flash('error','error while deleting a  hotel, please try again later');
        console.log(error);
        res.redirect('/hotels');
    }
})

module.exports = router;