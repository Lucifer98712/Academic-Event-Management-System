const Event = require("../../../models/events.model");
const multer = require("multer");
const path = require("path");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Upload Post-Event Materials
const uploadPostEventMaterials = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    // Attach uploaded file
    if (req.file) {
      event.postMaterials = req.file.path;
      await event.save();
      res.status(200).json({
        message: "Post-event materials uploaded successfully!",
        event,
      });
    } else {
      res.status(400).json({ message: "No file uploaded!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadPostEventMaterials, upload };
