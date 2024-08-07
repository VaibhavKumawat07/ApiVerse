const ApiFeatures = require("../utils/apiFeatures");
const users = require("./../Model/userModel");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/nodeMailer");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const data = await users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
    });

    const token = signToken(data._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day
    res.cookie("security", "xyz65478247", {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password...", 404));
  }

  const userFind = await users.findOne({ email });
  if (
    !userFind ||
    !(await userFind.correctPassword(password, userFind.password))
  ) {
    return next(new AppError("Incorrect Email or Password", 404));
  }
  const token = signToken(userFind._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); // 1 day
  res.cookie("security", "xyz65478247", {
    httpOnly: false,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  }); // 1 day

  res.status(200).json({
    status: "success",
    token,
    message: {
      data: userFind,
    },
  });
};

exports.forgotPassword = async (req, res, next) => {
  // 1) Get user based on POSTed email
  const userFind = await users.findOne({ email: req.body.email });
  if (!userFind) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = userFind.createPasswordResetToken();
  await userFind.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/apiVerse/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: userFind.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    userFind.passwordResetToken = undefined;
    userFind.passwordResetExpires = undefined;
    await userFind.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const userFind = await users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    // 2) If token has not expired, and there is user, set the new password
    if (!userFind) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    userFind.password = req.body.password;
    userFind.confirmPassword = req.body.confirmPassword;
    userFind.passwordResetToken = undefined;
    userFind.passwordResetExpires = undefined;
    await userFind.save();
    res.status(200).json({
      status: "success",
      mesage: "Password succesfully changed.",
    });
  } catch (err) {
    return next(new AppError("Unable to rest password. Try Again!"), 500);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const currentUser = await users.findById(req.user._id);
    if (!currentUser) {
      return next(new AppError("User does not exist", 400));
    }
    if (
      !(await currentUser.correctPassword(
        req.body.password,
        currentUser.password
      ))
    ) {
      return next(new AppError("Password Does not match", 400));
    }
    const hashPassword = await currentUser.encryptPassword(
      req.body.newPassword
    );
    req.body.password = hashPassword;
    const userData = await users.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.clearCookie("token");
    res.clearCookie("security");
    res.status(200).json({
      status: "success",
      message: "password updated.",
      userData,
    });
  } catch (err) {
    console.log(err);
    next(new AppError(err, 400));
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    if (req.user.role === "user") {
      return next(new AppError("Only Administrator can access", 400));
    }
    const features = new ApiFeatures(users.find(), req.query)
      .paginate()
      .sort()
      .limitFields();
    const allUsers = await features.query;
    res.status(200).json({
      status: "success",
      length: allUsers.length,
      data: allUsers,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (req.user.role === "user") {
      return next(new AppError("Only Administrator can access", 400));
    }
    const userData = await users.findById(req.body.id);
    res.status(200).json({
      status: "success",
      length: userData.length,
      data: userData,
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userData = await users.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      length: userData.length,
      data: userData,
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userData = await users.findByIdAndDelete(req.user._id);
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "User succesfully deleted.",
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
};

exports.logout = async (req, res, next) => {
  if (!req.cookies.token) {
    return next(new AppError("Invalud Request", 400));
  }
  res.clearCookie("token");
  res.clearCookie("security");
  res.status(200).json({
    status: "success",
  });
};
