const express = require("express");
const createEvent = require("./controllers/createEvent");
const { auth, roleAuth } = require("../../middlewares/auth");
const deleteEvent = require("./controllers/deleteEvent");
const updateEvent = require("./controllers/updateEvent");
const { getEventById, getEvents } = require("./controllers/getEvents");
const registerEvent = require("./controllers/registerEvent");
const rateEvent = require("./controllers/rateEvent");
const upload = require('../../middlewares/uploadMiddleware');


const eventRouter = express.Router();
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);

//protected routes for event management
eventRouter.use(auth);
eventRouter.post("/create", roleAuth(['organizer','admin']), upload.single('image'), createEvent);
eventRouter.delete("/delete", roleAuth(["organizer", "admin"]), deleteEvent);
eventRouter.patch("/update", roleAuth(['organizer','admin']), upload.single('image'), updateEvent);
eventRouter.post("/register", auth, registerEvent);
eventRouter.post("/rate", auth, rateEvent);

module.exports = eventRouter;
