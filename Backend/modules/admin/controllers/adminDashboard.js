const User = require("../../../models/users.model");
const Event = require("../../../models/events.model");

// Get Admin Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalRequests = await User.countDocuments({ role: "organizer", status: "pending" });
    const successfulEvents = await Event.countDocuments({ status: "completed" });

    res.status(200).json({
      totalUsers,
      totalEvents,
      totalRequests,
      successfulEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Event Status Data for Chart
const getEventStatusData = async (req, res) => {
  try {
    const activeEvents = await Event.countDocuments({ status: "active" });
    const completedEvents = await Event.countDocuments({ status: "completed" });
    const pendingEvents = await Event.countDocuments({ status: "pending" });

    res.status(200).json({
      activeEvents,
      completedEvents,
      pendingEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Visitor Statistics (Dummy Data Example)
const getVisitorStatistics = async (req, res) => {
  try {
    const visitorData = [
      { month: "January", visitors: 120 },
      { month: "February", visitors: 150 },
      { month: "March", visitors: 180 },
      { month: "April", visitors: 200 },
      { month: "May", visitors: 230 },
    ];

    res.status(200).json(visitorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getEventStatusData,
  getVisitorStatistics,
};
