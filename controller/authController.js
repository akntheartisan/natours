const userModel = require('../Models/userSchema');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_Secret, {
      expiresIn: process.env.JWT_Expiration,
    });

    res.status(200).json({
      status: 'success',
      token,
      data: { user: newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
