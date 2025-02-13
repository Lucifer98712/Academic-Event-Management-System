const Event = require("../../../models/events.model");
const fs = require('fs');
const path = require('path');

const updateEvent = async (req, res) => {

  const { id,title, description, date, status } = req.body;

  
    try {
        // Log received data
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
      // Trim whitespace (including newlines) from the id
      const trimmedId = id.trim();
      const event = await Event.findById(trimmedId);
      if (!event) throw new Error("Event not found!");


      // Handle image update
      let imagePath = event.image;
      if (req.file) {
          // Delete old image if exists
          if (event.image) {
              const oldImagePath = path.join(__dirname, '../../../', event.image);
              if (fs.existsSync(oldImagePath)) {
                  fs.unlinkSync(oldImagePath);
              }
          }
          imagePath = `/uploads/events/${req.file.filename}`;
      }

    const updatedEvent = await Event.findByIdAndUpdate(
      trimmedId, // Use trimmed ID here,
      { title, description, date, status,
        ...(imagePath && { image: imagePath })
       },
      { new: true } // Returns the updated document
    );

    if (!updatedEvent) throw new Error("Event not found!");

    res.status(200).json({
      status: "success",
      message: "Event updated successfully!",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }

};

module.exports = updateEvent;
