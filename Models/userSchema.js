const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    select: false,
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
  passwordChangedAt:Date,
  passwordResetToken:String,
  passwordResetExpiresAt:Date
},{ timestamps: true });

userschema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

//correctPassword static instance method available for all documents
userschema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

userschema.methods.passwordChangedAfter = function(JWTtimestamp){

  if(this.passwordChangedAt){

    const passwordChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000,10);
    return JWTtimestamp < passwordChangedTimestamp;
  }
  return false
}

userschema.methods.createPasswordResetToken = function(){

  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  console.log(this.passwordResetToken);

  this.passwordResetExpiresAt = new Date() + 10*60*1000;

  return resetToken;

}

module.exports = mongoose.model('user', userschema);
