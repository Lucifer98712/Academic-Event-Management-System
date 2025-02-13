const Event = require("../../../models/events.model");
const Notification = require("../../../models/notification.model");
const User = require("../../../models/users.model");
const {
  sendNewEventNotification,
} = require("../../../utilities/notificationService");

const createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newEvent = await Event.create({
      title,
      description,
      date,
      organizer: req.user.id,
      image: req.file ? `/uploads/events/${req.file.filename}` : null
      });

    // Create notifications for all users
    const users = await User.find({});
    await Promise.all(
      users.map((user) =>
        Notification.create({
          userId: user._id,
          eventId: newEvent._id,
          message: `New event created: ${newEvent.title}`,
        })
      )
    );

    // Send email notifications
    await sendNewEventNotification(newEvent);

    res.status(200).json({
      status: "success",
      message: "Event created successfully!",
      event: newEvent,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      error: e.message,
    });
    return;
  }
};
module.exports = createEvent;
