const mongoose = require("mongoose");

const travelGuideSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: [String],
    required: true,
  },
  recommendations: {
    hotels: {
      type: [String],
      required: true,
    },
    restaurants: {
      type: [String],
      required: true,
    },
    attractions: {
      type: [String],
      required: true,
    },
  },
  searchTags: {
    type: [String],
    required: true,
  },
  userReviews: [
    {
      user: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      review: {
        type: String,
        required: true,
      },
    },
  ],
  localInfo: {
    customs: {
      type: String,
      required: true,
    },
    weather: {
      type: String,
      required: true,
    },
    bestTravelTime: {
      type: String,
      required: true,
    },
  },
  travelTips: {
    type: [String],
    required: true,
  },
  itineraries: {
    type: [String],
    required: true,
  },
  bookingIntegration: {
    type: Boolean,
    required: true,
  },
  mapInfo: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
});

const TravelGuide = mongoose.model("travelGuide", travelGuideSchema);

module.exports = TravelGuide;
