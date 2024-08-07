const AppError = require("./../../utils/appError");
const pop = require("./../../Model/apis/travelGuideModel");
const ApiFeatures = require("./../../utils/apiFeatures");

exports.insert = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new AppError("Only Administrator can access", 400));
  }
  try {
    const data = await pop.create(req.body);
    res.status(200).json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      err,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const features = new ApiFeatures(pop.find(), req.query)
      .paginate()
      .sort()
      .limitFields();
    const data = await features.query.select("-__v");

    res.status(200).json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      err,
    });
  }
};

exports.getDetails = async (req, res) => {
  try {
    console.log(req.params.destination);
    const data = await pop
      .find({ destination: req.params.destination })
      .select("-__v");
    res.status(200).json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      err,
    });
  }
};

exports.getDetailsById = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new AppError("Only Administrator can access", 400));
  }

  try {
    const data = await pop.find({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      err,
    });
  }
};

exports.deleteDetail = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new AppError("Only Administrator can access", 400));
  }

  try {
    await pop.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      err,
    });
  }
};

exports.UpdateDetail = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new AppError("Only Administrator can access", 400));
  }

  try {
    const data = await pop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "sucess",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      err,
    });
  }
};
