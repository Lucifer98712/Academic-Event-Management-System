const Event = require("../../../models/events.model");
const UserChoice = require("../../../models/userChoices.model");

const rateEvent = async (req, res) => {
  const { eventId, choice } = req.body;
  const userId = req.user.id;

  // Validate choice
  if (!["like", "dislike"].includes(choice)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid choice. Only 'like' or 'dislike' are allowed."
    });
  }

  try {
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: "failed",
        message: "Event not found"
      });
    }

    // Check if user participated in the event
    if (!event.attendees.includes(userId)) {
      return res.status(403).json({
        status: "failed",
        message: "Only event participants can rate events"
      });
    }

    // Update or create user choice
    await UserChoice.findOneAndUpdate(
      { userId, eventId },
      { choice },
      { upsert: true, new: true }
    );

    res.status(200).json({
      status: "success",
      message: `Event ${choice}d successfully`
    });

  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message
    });
  }
};

module.exports = rateEvent;