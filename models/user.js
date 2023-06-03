const mongoose = require('mongoose');
// by using this passportLocalMongoose its automatically add hashed password
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: [true , 'you need to pass a username'],
    unique: true,
    trim : true
   },
   image: {
    type: String,
   }
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user' , userSchema);
module.exports = User;
