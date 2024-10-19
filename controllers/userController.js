import User from "../models/userModel.js";

// Fetch all non-admin users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 0 }); // Fetch users with role 0
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

