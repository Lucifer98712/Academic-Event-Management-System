const Event = require("../../../models/events.model");

const deleteEvent = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) throw new Error("Event not found!");

    res.status(200).json({
      status: "success",
      message: "Event deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

module.exports = deleteEvent;
