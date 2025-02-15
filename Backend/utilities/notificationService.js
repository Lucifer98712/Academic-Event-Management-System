const cron = require('node-cron');
const transporter = require('./emailConfig');
const { newEventTemplate, reminderTemplate } = require('./emailTemplates');
const User = require('../models/users.model');
const Event = require('../models/events.model');

// Send new event notifications to logged-in users
const sendNewEventNotification = async (event) => {
    try {
        // Assuming you have a way to track logged-in users
        const loggedInUsers = await User.find({ isLoggedIn: true }, 'email');
        
        for (const user of loggedInUsers) {
            await transporter.sendMail({
                to: user.email,
                ...newEventTemplate(event)
            });
        }
    } catch (error) {
        console.error('Error sending new event notification:', error);
    }
};

// Check and send event reminders
const sendEventReminders = async () => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const events = await Event.find({
            date: {
                $gte: tomorrow,
                $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
            }
        }).populate('attendees', 'email');

        for (const event of events) {
            for (const attendee of event.attendees) {
                await transporter.sendMail({
                    to: attendee.email,
                    ...reminderTemplate(event)
                });
            }
        }
    } catch (error) {
        console.error('Error sending event reminders:', error);
    }
};

// Schedule daily reminder check
const scheduleReminders = () => {
    cron.schedule('0 0 * * *', sendEventReminders); // Run at midnight every day
};

module.exports = {
    sendNewEventNotification,
    scheduleReminders
};