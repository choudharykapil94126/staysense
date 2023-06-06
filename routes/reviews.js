const express = require('express'),
      {isLoggedIn , isReviewAuthor} = require('../middlewares/index');
const router = express.Router();
const Hotel = require('../models/hotel');
const Review = require('../models/review');


// index - get all reviews for a particular hotel
// new - show
// create - newOverallRating = (old + curr)/hotel.reviews.length;
router.post('/hotels/:id/reviews' , isLoggedIn , async(req,res)=>{
    try {
        let newReview = new Review(req.body.review);
        newReview.author = req.user;
        await newReview.save();
        let hotel = await Hotel.findById(req.params.id);
        hotel.reviews.push(newReview);
        await hotel.save();
        req.flash('success' , 'comment added');
        res.redirect(`/hotels/${req.params.id}`);

    } catch (error) {
        req.flash('error','error while creating review,please try later');
        console.log(error);
        res.redirect(`/hotels/${req.params.id}`);
    }
});

// delete

router.delete('/hotels/:id/reviews/:reviewId' , isLoggedIn , isReviewAuthor , async(req,res)=>{
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        req.flash('success' , 'commment deleted');
        res.redirect(`/hotels/${req.params.id}`);
    } catch (error) {
        req.flash('error','error while creating review,please try later')
        console.log(error);
        res.redirect(`/hotels/${req.params.id}`);
    }
});

module.exports = router;