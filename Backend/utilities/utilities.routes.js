const express = require("express");
const {auth, roleAuth} = require("../middlewares/auth");
const { getEventRecommendations } = require("../utilities/contentRecommendation");

const recommendationRouter = express.Router();

// Protected recommendation routes
recommendationRouter.use(auth, roleAuth(['organizer','admin', 'user']));

// Get personalized event recommendations (modified to handle POST with category)
recommendationRouter.post("/events", async (req, res) => {
    try {
        const userId = req.user.id;
        const { category } = req.body;

        // Get recommendations with optional category
        const recommendations = await getEventRecommendations(userId, category);

        res.status(200).json({
            status: "success",
            recommendations
        });
    } catch (error) {
        console.error("Recommendation Error:", error);

        const statusCode = error.message.includes('required') ? 400 : 500;
        res.status(statusCode).json({
            status: "failed",
            error: error.message
        });
    }
});

module.exports = recommendationRouter;