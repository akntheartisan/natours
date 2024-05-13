const userModel = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const userSchema = require('../Models/userSchema');
const sendMail = require('../utility/Mail');
//edited file
exports.signup = async (req, res, next) => {
  try {
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      passwordChangedAt: req.body.passwordChangedAt,
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

  // validation for getting email and password. if there is anyone is missing error message will shown.

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email and Password are required',
    });
  }

  //after getting username and password check if it is correct by comparing token original token and test token

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
  // if correct proceed signin operation
  const token = jwt.sign({ id: userCheck._id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expiration,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.protect = async (req, res, next) => {
  //getting token and check if it exists
  let token = req.header('Authorization').split(' ')[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_Secret);

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

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_Secret);
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Token expired please login again',
    });
  }

  //3) check if user still exists

  const checkUser = await userModel.findById(decoded.id);

  if (!checkUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'This user is no longer exists',
    });
  }

  //4) checking for password change

  if (checkUser.passwordChangedAfter(decoded.iat)) {
    return res.status(401).json({
      status: 'fail',
      message: 'Password changed, please login again',
    });
  }

  req.user = checkUser;

  console.log('current user:' + req.user);

  next();
};

exports.forgetPassword = async (req, res, next) => {
  //1)get user from the posted mail

  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(402).json({
      status: 'fail',
      message: 'there is no user for this mail',
    });
  }

  //2) generate the random token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) send it to your mail

  const url = `${req.protocol}://${req.get(
    'host'
  )}/users/resetPassword/${resetToken}`;
  const message = `this is the password reset link ${url}.\n click here.`;

  try {
    await sendMail({
      email: user.email,
      subject: 'your password reset message',
      message: message,
    });

    res.status(200).json({
      status: 'success',
      message: 'token sent to mail',
    });
  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword = async (req, res, next) => {};
