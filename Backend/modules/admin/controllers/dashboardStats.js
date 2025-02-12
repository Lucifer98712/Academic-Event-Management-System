const User = require("../../../models/users.model");
const Event = require("../../../models/events.model");

// Get Dashboard Statistics
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalRequests = await User.countDocuments({ role: "organizer", status: "pending" });
    const successfulEvents = await Event.countDocuments({ status: "completed" });

    res.status(200).json({ totalUsers, totalEvents, totalRequests, successfulEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
