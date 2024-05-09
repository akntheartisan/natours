const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator')


const userschema = new schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:validator.isEmail
    },
    photo:String,
    password:{
        type:String,
        required:true,
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',userschema);