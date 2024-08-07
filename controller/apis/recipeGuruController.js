const AppError = require("./../../utils/appError");
const food = require("./../../Model/apis/recipeGuruModel");
const ApiFeatures = require("./../../utils/apiFeatures");

exports.insert = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new AppError("Only Administrator can access", 400));
  }
  try {
    const data = await fit.create(req.body);
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

exports.getAllFoodRecipes = async (req, res) => {
  try {
    const features = new ApiFeatures(food.find(), req.query)
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

exports.getFoodRecipeByName = async (req, res) => {
  try {
    const data = await food.find({ name: req.params.name }).select("-__v");
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
    const data = await fit.find({ _id: req.params.id });
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

exports.deleteRecipe = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new AppError("Only Administrator can access", 400));
  }
  try {
    await food.findByIdAndDelete(req.params.id);
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

exports.UpdateRecipe = async (req, res, next) => {
  if (req.user.role === "user") {
    return next(new AppError("Only Administrator can access", 400));
  }
  try {
    const data = await food.findByIdAndUpdate(req.params.id, req.body, {
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
