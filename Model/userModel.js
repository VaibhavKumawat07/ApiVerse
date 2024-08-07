const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AppError = require("./../utils/appError");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Your's name..."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide Your's Email..."],
    validate: [validator.isEmail, "Please Provide a Valid Email..."],
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please Provide Paswword...."],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Confirm Your's Paswword...."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same, please try again...",
    },
  },
  role: {
    type: String,
    default: "user",
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  // if (!this.isModified("password"))
  //   return next(
  //     new AppError("Password has been changed, Please enter new password...")
  //   );
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  const a = await bcrypt.compare(candidatePassword, userPassword);
  return a;
};
userSchema.methods.encryptPassword = async function (password, next) {
  if (password.length < 8) {
    return next(new AppError("Password must be of minuimum 8 length"));
  }
  return await bcrypt.hash(password, 12);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // this.passwordChangedAt = Date.now();
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const users = mongoose.model("users", userSchema);

module.exports = users;
