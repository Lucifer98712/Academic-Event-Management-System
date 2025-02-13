const Event = require("../../../models/events.model");

const registerEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        status: "failed",
        message: "Event not found"
      });
    }

    // Check if user is already registered
    if (event.attendees.includes(userId)) {
      return res.status(400).json({
        status: "failed",
        message: "User already registered for this event"
      });
    }

    // Add user to attendees array
    event.attendees.push(userId);
    await event.save();

    res.status(200).json({
      status: "success",
      message: "Successfully registered for event",
      event
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message
    });
  }
};

module.exports = registerEvent;