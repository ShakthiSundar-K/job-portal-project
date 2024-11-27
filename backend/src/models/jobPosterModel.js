import mongoose from "./index.js";

const jobPosterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    companyDescription: { type: String },
    industry: { type: String },
  },
  { timestamps: true }
);
export default mongoose.model("JobPoster", jobPosterSchema);
