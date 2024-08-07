const ApiFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

exports.renderSign = (req, res, next) => {
  res.render("signup");
};
exports.renderLogin = (req, res, next) => {
  res.render("login");
};
exports.renderIndex = (req, res, next) => {
  res.render("index");
};
exports.renderApi = (req, res, next) => {
  res.render("api");
};
exports.renderApiPage = (req, res, next) => {
  res.render("apiPage");
};
exports.renderProfile = (req, res, next) => {
  res.render("profile");
};
exports.renderForgot = (req, res, next) => {
  res.render("forgot");
};
exports.renderReset = (req, res, next) => {
  res.render("reset");
};
