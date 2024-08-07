const AppError = require("./../utils/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const users = require("./../Model/userModel");

exports.authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new AppError("You are not loged in, Please Login", 404));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await users.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this group does no longer exist.",
          401
        )
      );
    }
    req.user = currentUser;
    next();
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

exports.logedin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new AppError("You are not loged in, Please Login", 404));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await users.findById(decoded.id);
    res.status(200).json({
      status: "Success",
      data: currentUser,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
