const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required!"],
    },
    description: {
      type: String,
      required: [true, "Event description is required!"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required!"],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the user (organizer)
      required: true,
    },
    // Adding status field to eventSchema
    status: {
      type: String,
      enum: ["pending", "active", "completed"],
      default: "pending",
    },
    image: {
      type: String, // URL of the image
      required: false,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // References registered users
      },
    ],
    materials: [
      {
        name: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("events", eventSchema);
module.exports = Event;
