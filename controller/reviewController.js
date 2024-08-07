const reviews = require("./../Model/reviewModel");
const ApiFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

exports.createReview = async (req, res, next) => {
  try {
    const data = await reviews.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Thanks for reviewing us.",
    });
  } catch (err) {
    return next(new AppError("Please Provide Proper Details.", 400));
  }
};

exports.getAllReview = async (req, res, next) => {
  try {
    const features = new ApiFeatures(reviews.find(), req.query)
      .paginate()
      .sort();
    const data = await features.query.select("-_id").select("-__v");

    res.status(200).json({
      status: "success",
      message: data,
    });
  } catch (err) {
    return next(
      new AppError("Something went wrong, Please try again later.", 400)
    );
  }
};
