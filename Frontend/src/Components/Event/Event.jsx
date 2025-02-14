import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mernimg from "../../Assets/mern.jpeg";
import { getEvents, getRecommendations } from "../../Utils/ClientApi";
import Navbar from "../Navbar/Navbar";
import "./Event.css";

const EventCard = ({ event }) => (
  <Link to={`/events/${event._id}`} className="event-card">
    <div className="event-image">
    <img 
  src={event.image ? `http://localhost:8000${event.image}` : mernimg} 
  alt={event.title} 
/>    </div>
    <div className="event-content">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>
      <div className="event-meta">
        <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
        <span className={`event-status ${event.status}`}>{event.status}</span>
      </div>
    </div>
  </Link>
);

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Adding check for logged in user
  const isLoggedIn = localStorage.getItem("user") !== null;  
  
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response?.data?.events || []);
      } catch (err) {
        setError("Failed to fetch events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  // Filter upcoming events: not completed 
  const upcomingEvents = events.filter(event => {
    return event.status !== "completed";
  });
  const fetchRecommendations = async () => {
    if (!isLoggedIn) {
      setError("Please login to get recommendations");
      return;
    }
    
    setIsLoadingRecommendations(true);
    try {
      const requestData = category.trim() ? { category } : {};
      const response = await getRecommendations(requestData);
      
      if (response.data.status === "success") {
        setRecommendedEvents(response.data.recommendations.map(rec => rec.event));
      } else {
        throw new Error(response.data.error || 'Failed to get recommendations');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="event-container">
      <Navbar />

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="upcoming-event">
          <h1 className="event-heading">UPCOMING EVENTS</h1>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="no-events">
            <p>No upcoming events available</p>
          </div>
        )}

      </section>

      {/* Only show recommended section if user is logged in */}
      {isLoggedIn && (
        <section className="events-section recommended-section">
          <div className="section-header">
            <h2 className="section-heading">Recommended For You</h2>
            <p className="section-description">
              {category ? 'Events matching your interests' : 'Based on your history'}
            </p>
            
            <div className="recommendation-controls">
              <input
                type="text"
                placeholder="Enter category (compulsory for new users)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-input"
              />
              <button 
                onClick={fetchRecommendations}
                disabled={isLoadingRecommendations}
                className="recommendation-button"
              >
                {isLoadingRecommendations ? 'Loading...' : 'Get Recommendations'}
              </button>
            </div>
          </div>

          {isLoadingRecommendations ? (
            <div className="loading-spinner">Loading recommendations...</div>
          ) : recommendedEvents.length > 0 ? (
            <div className="events-grid">
              {recommendedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <p className="no-recommendations">No recommendations available</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Event;
