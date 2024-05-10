const userModel = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email and Password are required',
    });
  }

  const userCheck = await userModel.findOne({ email }).select('+password');

  if (
    !userCheck ||
    !(await userCheck.correctPassword(password, userCheck.password))
  ) {
    return res.status(401).json({
      status: 'fail',
      message: 'Authentication failed',
    });
  }

  const token = jwt.sign({ id: userCheck._id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expiration,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.protect = async (req, res, next) => {
  let token = req.header('Authorization').split(' ')[1];

  if (
    req.header('Authorization') &&
    req.header('Authorization').split(' ')[1]
  ) {
    token = req.header('Authorization').split(' ')[1];
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Not authenticated',
    });
  }

  //2)verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_Secret);
  console.log(decoded);

  next();
};
