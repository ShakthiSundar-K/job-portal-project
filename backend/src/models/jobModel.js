import mongoose from "./index.js";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String, required: true },
    skillsRequired: { type: [String], required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true }, // E.g., "3-5 years"
    status: { type: String, enum: ["open", "closed"], default: "open" },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPoster",
      required: true,
    }, // Reference to job poster
    salaryRange: { type: String }, // E.g., "$40,000 - $60,000"
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
