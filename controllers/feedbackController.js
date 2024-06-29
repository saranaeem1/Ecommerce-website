import feedbackModel from "../models/feedbackModel.js";

export const submitFeedback = async (req, res) => {
  try {
    const { type, name, email, phone, details } = req.body;

    // Validation
    switch (true) {
      case !type:
        return res.status(500).send({ error: "Type is Required" });
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !email:
        return res.status(500).send({ error: "Email is Required" });
      case !phone:
        return res.status(500).send({ error: "Phone Number is Required" });
      case !details:
        return res.status(500).send({ error: "Detail is Required" });
    }

    // Create a new instance of Feedback model
    const feedback = new feedbackModel({ type, name, email, phone, details });

    // Save the feedback to the database
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};
