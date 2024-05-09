const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');

const userschema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  photo: String,
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
    message: 'password is not same',
  },
});

module.exports = mongoose.model('user', userschema);
