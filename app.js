const express = require("express");
const app = express();
const recipeRoutes = require("./Routes/apis/recipeGuruRoutes");
const fitFlexRoutes = require("./Routes/apis/fitFlexRoutes");
const nutriTrackRoutes = require("./Routes/apis/nutriTrackRoutes");
const popStatsRoutes = require("./Routes/apis/popStatsRoutes");
const travelGuideRoutes = require("./Routes/apis/travelGuideRoutes");
const carHubRoutes = require("./Routes/apis/carHubRoutes");
const userRoutes = require("./Routes/userRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const viewRoutes = require("./Routes/viewRoutes");
const apiRoutes = require("./Routes/apiRoutes");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const hpp = require("hpp");
const compression = require("compression");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["page", "limit", "limitFields"],
  })
);

app.use(compression());

app.use("/", viewRoutes);

app.use("/apiVerse/v1/users", userRoutes);
app.use("/apiVerse/v1/reviews", reviewRoutes);
app.use("/apiVerse/v1/api", apiRoutes);
app.use("/apiVerse/v1/recipeGuru", recipeRoutes);
app.use("/apiVerse/v1/fitFlex", fitFlexRoutes);
app.use("/apiVerse/v1/nutriTrack", nutriTrackRoutes);
app.use("/apiVerse/v1/popStats", popStatsRoutes);
app.use("/apiVerse/v1/travelGuide", travelGuideRoutes);
app.use("/apiVerse/v1/carHub", carHubRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
