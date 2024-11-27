import mongoose from "./index.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["job_poster", "user"], default: "user" },
    profilePicture: { type: String }, // Optional profile picture URL
    bio: { type: String }, // Short bio
    experience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }, // Null if currently employed
        description: { type: String },
      },
    ], // Work experience
    skills: { type: [String], default: [] }, // Skills as an array
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ], // Educational qualifications
    contact: {
      phone: { type: String },
      address: { type: String },
      website: { type: String },
      linkedin: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
