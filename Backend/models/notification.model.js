const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    message: String,
    read: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});
notificationSchema.index({ createdAt: -1});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;