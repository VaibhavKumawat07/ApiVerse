const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for population statistics
const populationStatsSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
    },
    populationSize: {
      type: Number,
      required: true,
    },
    growthRate: {
      type: Number,
      required: true,
    },
    density: {
      type: Number,
      required: true,
    },
    ageBreakdown: {
      children: {
        type: Number,
        required: true,
      },
      adults: {
        type: Number,
        required: true,
      },
      seniors: {
        type: Number,
        required: true,
      },
    },
    genderBreakdown: {
      male: {
        type: Number,
        required: true,
      },
      female: {
        type: Number,
        required: true,
      },
      other: {
        type: Number,
        required: true,
      },
    },
    ethnicBreakdown: [String],
    urbanPopulation: {
      type: Number,
      required: true,
    },
    ruralPopulation: {
      type: Number,
      required: true,
    },
    economicFactors: {
      employmentRate: {
        type: Number,
        required: true,
      },
      averageIncome: {
        type: Number,
        required: true,
      },
    },
    historicalData: {
      type: Boolean,
      required: true,
    },
    futureProjections: {
      type: Boolean,
      required: true,
    },
    migrationPatterns: {
      type: String,
      required: true,
    },
    educationStats: {
      type: String,
      required: true,
    },
    healthStats: {
      type: String,
      required: true,
    },
    housingStats: {
      type: String,
      required: true,
    },
    secureAuthentication: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Create the model from the schema
const PopulationStats = mongoose.model(
  "PopulationStats",
  populationStatsSchema
);

module.exports = PopulationStats;
