import Application from "../models/applicationModel.js";

export const applyForJob = async (req, res) => {
  try {
    const { jobId, userId, resume, coverLetter } = req.body;

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    // Create a new application
    const application = new Application({
      jobId,
      userId,
      resume,
      coverLetter,
    });

    await application.save();

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Fetch all applications for the job
    const applications = await Application.find({ jobId })
      .populate("userId", "name email skills") // Populate user details
      .populate("jobId", "jobTitle");

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this job." });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["submitted", "reviewed", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all applications made by the user
    const applications = await Application.find({ userId })
      .populate("jobId", "jobTitle location company")
      .sort({ appliedAt: -1 }); // Sort by most recent applications

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this user." });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
