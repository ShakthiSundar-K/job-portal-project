import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
export const postJob = async (req, res) => {
  try {
    const {
      jobTitle,
      description,
      location,
      company,
      skillsRequired,
      qualification,
      experience,
      salaryRange,
      jobType,
    } = req.body;

    const newJob = new Job({
      jobTitle,
      description,
      location,
      company,
      skillsRequired,
      qualification,
      experience,
      salaryRange,
      jobType,
      postedBy: req.user.id, // Assuming middleware sets req.user
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { search } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { jobTitle: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query).populate("postedBy", "companyName");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recommendJobs = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recommendedJobs = await Job.find({
      skillsRequired: { $in: user.skills },
      qualification: user.education.map((edu) => edu.degree),
    });

    res.status(200).json(recommendedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterJobs = async (req, res) => {
  try {
    // Extract query parameters
    const {
      jobTitle,
      location,
      company,
      skillsRequired,
      qualification,
      experience,
      salaryRange,
      jobType,
      status,
    } = req.query;

    // Construct a dynamic query object
    const query = {};

    if (jobTitle) query.jobTitle = { $regex: jobTitle, $options: "i" }; // Case-insensitive search
    if (location) query.location = { $regex: location, $options: "i" };
    if (company) query.company = { $regex: company, $options: "i" };
    if (skillsRequired)
      query.skillsRequired = { $in: skillsRequired.split(",") }; // Match any of the skills
    if (qualification)
      query.qualification = { $regex: qualification, $options: "i" };
    if (experience) query.experience = { $regex: experience, $options: "i" };
    if (salaryRange) query.salaryRange = { $regex: salaryRange, $options: "i" };
    if (jobType) query.jobType = jobType;
    if (status) query.status = status;

    // Fetch jobs matching the query
    const jobs = await Job.find(query).populate("postedBy", "companyName");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editJob = async (req, res) => {
  try {
    const { id } = req.params; // Job ID
    const updates = req.body; // Fields to update

    // Update the job entry
    const updatedJob = await Job.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params; // Job ID

    // Delete the job entry
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job deleted successfully", job: deletedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
