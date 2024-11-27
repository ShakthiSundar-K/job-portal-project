import JobPoster from "../models/jobPosterModel.js";

export const createJobPosterProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const userId = id;
    console.log(userId);
    const { companyName, companyWebsite, companyDescription, industry } =
      req.body;

    const jobPoster = new JobPoster({
      userId,
      companyName,
      companyWebsite,
      companyDescription,
      industry,
    });

    await jobPoster.save();
    res
      .status(201)
      .json({ message: "Job poster profile created successfully", jobPoster });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJobPosterProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const updates = req.body;
    console.log(id);
    const updatedJobPoster = await JobPoster.findOneAndUpdate(
      { userId: id },
      updates,
      {
        new: true,
      }
    );
    if (!updatedJobPoster) {
      return res.status(404).json({ message: "Job poster profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      jobPoster: updatedJobPoster,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
