const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const eventRouter = require("./modules/events/events.routes");
const adminRouter = require("./modules/admin/admin.routes");
const cors = require("cors");
const path = require('path');
const morgan = require("morgan");

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  }));

//Utility routes
const recommendationRouter = require("./utilities/utilities.routes");
const { scheduleReminders } = require('./utilities/notificationService');
const notificationRoutes = require('./utilities/notification.routes');

require("dotenv").config();


app.use(morgan("dev"));


mongoose.connect(process.env.mongo_connect, {}).then(() => {
    console.log("Connection to database successful!");
}).catch((e) => {
    console.log("Connection to database failed!", e);
});

app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/admin", adminRouter);
app.use("/api",recommendationRouter);
app.use('/api/notifications', notificationRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start reminder service
scheduleReminders();

app.listen(8000, () => {
    console.log("Server started successfully!");
});