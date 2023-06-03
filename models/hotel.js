const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
    name :{
        type : String,
        required: [true,'Please add hotel name'],
    },
    address :{
        type: String,
        required: [true,'Please add hotel address'],
    },
    price : {
        type: Number,
        required: [true, 'Pleae add hotel price'],
        min: [100,'Hotel room price should be atlead 100Rs'],
        max: [10000, 'Hotel room price should be atmost 10000Rs'],
    },
    isRoomAvailable  : {
        type : Boolean,
        default: true
    },
    image : {
        type: String,
        requried: [true , 'Please add hotel image'],
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    reviews : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }
    ],


});

const Hotel = mongoose.model('hotel' , hotelSchema);
module.exports = Hotel;
