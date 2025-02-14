const mongoose = require('mongoose');
const UserChoice = require('../models/userChoices.model');
const Event = require('../models/events.model');
const ContentBasedRecommender = require('content-based-recommender');

const recommender = new ContentBasedRecommender({
    minScore: 0.09,
    maxSimilarDocuments: 100
});

async function getEventRecommendations(userId, userCategory = null) {
    try {
        // 1. Get user's liked events
        const likedEvents = await UserChoice.aggregate([
            {
                $match: {
                    userId: userId, 
                    choice: "like"
                }
            },
            {
                $lookup: {
                    from: "events",
                    let: { eventId: "$eventId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", { $toObjectId: "$$eventId" }]
                                },
                            }
                        },
                        { $project: { __v: 0 } }
                    ],
                    as: "eventDetails"
                }
            },
            { $unwind: "$eventDetails" },
            {
                $project: {
                    _id: 1,
                    eventDetails: 1
                }
            }
        ]);

        // 2. Get upcoming events for users with liked events
        const upcomingEvents = await Event.find({
            status: { $in: ['active', 'pending','completed'] }
        });

        // Handle new users with no liked events
        if (likedEvents.length === 0) {

            if (!userCategory) {
                throw new Error('Category required for new users');
            }

            // Create training data with events and user's category
            const documents = upcomingEvents.map(event => ({
                id: event._id.toString(),
                content: [event.title, event.description].join(' ') // Use more content for better recommendations
            }));
            
            // Add user's category as a document
            documents.push({
                id: 'USER_CATEGORY',
                content: userCategory
            });

            recommender.train(documents);

            // Get recommendations based on user's category
            const similar = recommender.getSimilarDocuments('USER_CATEGORY', 0.1, 10);

            return similar
            .filter(rec => rec.id !== 'USER_CATEGORY')
            .map(rec => {
                const event = upcomingEvents.find(e => e._id.toString() === rec.id);
                return {
                    event,
                    score: rec.score * (event.status === 'active' ? 1.5 : 1.0)
                };
            })
            .filter(rec => rec.event)
            .filter(rec => rec.event.status !== 'completed')
            .sort((a, b) => b.score - a.score);
        }

        // Existing user logic remains unchanged
        const documents = upcomingEvents.map(event => ({
            id: event._id.toString(),
            content: [event.title, event.description].join(' ')
        }));
        
        recommender.train(documents);

        const likedEventIds = new Set(likedEvents.map(e => e.eventDetails._id.toString()));
        let allRecommendations = [];
        
        for (const likedEvent of likedEvents) {
            const similar = recommender.getSimilarDocuments(
                likedEvent.eventDetails._id.toString(),
                0.1,
                5
            );
            allRecommendations.push(...similar);
        }

        return allRecommendations
            .filter(rec => !likedEventIds.has(rec.id))
            .map(rec => {
                const event = upcomingEvents.find(e => e._id.toString() === rec.id);
                return {
                    event,
                    score: rec.score * (event.status === 'active' ? 1.5 : 1.0)
                };
            })
            .filter(rec => rec.event.status !== 'completed')
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

    } catch (error) {
        console.error("Error getting recommendations:", error);
        throw error;
    }
}

module.exports = { getEventRecommendations };