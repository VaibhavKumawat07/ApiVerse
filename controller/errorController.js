const AppError = require("./../utils/appError");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.message.includes("E11000")) {
    err.message = "User is already Exist...";
  }
  if (err.message.includes("JsonWebTokenError")) {
    err.message = "Invalid user";
  }
  if (err.message.includes("ValidationError: confirmPassword:")) {
    err.message = "Passwords are not same, please try again...";
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
