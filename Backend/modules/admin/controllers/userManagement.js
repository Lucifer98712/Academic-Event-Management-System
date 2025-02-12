const User = require("../../../models/users.model");

// View Organizer Requests
const viewRequests = async (req, res) => {
  try {
    const requests = await User.find({ role: "organizer", status: "pending" });
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve/Dismiss Requests
const handleRequest = async (req, res) => {
  const { userId, action } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.status = action === "approve" ? "approved" : "rejected";
    await user.save();
    res.status(200).json({ message: `User ${action} successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Monitor All Users
const monitorUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { viewRequests, handleRequest, monitorUsers };
