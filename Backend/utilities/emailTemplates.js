const newEventTemplate = (event) => ({
    subject: `New Event: ${event.title}`,
    html: `
        <h2>New Event Added: ${event.title}</h2>
        <p>Description: ${event.description}</p>
        <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
    `
});

const reminderTemplate = (event) => ({
    subject: `Reminder: ${event.title} tomorrow`,
    html: `
        <h2>Event Reminder: ${event.title}</h2>
        <p>This is a reminder that the event is scheduled for tomorrow.</p>
        <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
    `
});

module.exports = { newEventTemplate, reminderTemplate };