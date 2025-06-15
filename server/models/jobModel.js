const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true, // e.g., Full-Time, Part-Time, Freelance
      enum: ["Full-Time", "Part-Time", "Freelance", "Internship", "Contract"],
    },
    description: {
      type: String,
      required: true,
    },
    inclusiveTags: {
      type: [String], // e.g., ["Veterans", "Disability-Friendly", "Returnees"]
      default: [],
    },
    inclusiveTypes: { type: [String], default: [] },
    skills: {
      type: [String], // e.g., ["React", "MongoDB", "Excel"]
      default: [],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
