const Review = require('../models/review'),
      Hotel = require('../models/hotel');
    

module.exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.session.returnTo = req.path || req.originalUrl;
        req.flash('error' , 'please sign in');
        res.redirect('/login');

    }
};

module.exports.isReviewAuthor = async(req,res,next)=>{
    let {reviewId} = req.params;
    let review = await Review.findById(reviewId).populate('author');
    if(review.author._id.equals(req.user._id)){
        next();
    }else{
        req.flash('error' , 'you are not permitted to do that');
        res.redirect('back');
    }
};
 
module.exports.isHotelAuthor = async(req,res,next)=>{
    let {id} = req.params;
    let hotel = await Hotel.findById(id).populate('author');
    if(hotel.author._id.equals(req.user._id)){
        next();
    } else {
        req.flash('error' , 'you are not permitted to do that');
        res.redirect('back');
    }
};
