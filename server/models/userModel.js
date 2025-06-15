const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type:Number,
        required: true,
    },
     password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['jobseeker','employer'],
        required:true
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;