const api = require("./../Model/apiModel");
const ApiFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

exports.getAllApi = async (req, res, next) => {
  try {
    const features = new ApiFeatures(api.find(), req.query)
      .paginate()
      .sort()
      .limitFields();

    const data = await features.query.select("-__v");
    res.status(200).json({
      status: "Success",
      length: data.length,
      message: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.getApi = async (req, res, next) => {
  try {
    const data = await api.find({ _id: req.params.id }).select("-__v");
    res.status(200).json({
      status: "Success",
      message: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.updateApi = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new Error("Only admin can access."));
  }
  try {
    const data = await api.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      message: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.deleteApi = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new Error("Only admin can access."));
  }
  try {
    const data = await api.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};
