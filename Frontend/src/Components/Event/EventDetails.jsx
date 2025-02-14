import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mernimg from "../../Assets/mern.jpeg";
import { getEventById, registerForEvent, rateEvent } from "../../Utils/ClientApi";
import Navbar from "../Navbar/Navbar";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [ratingStatus, setRatingStatus] = useState(""); // To track like/dislike status
  const [userRating, setUserRating] = useState(null); // To store user's current rating

  // Get logged in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEventById(id);
        console.log("Fetched Event Attendees:", response?.data?.event.attendees);

        setEvent(response?.data?.event);
      } catch (err) {
        setError("Failed to fetch event details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const confirmRegistration = window.confirm(
      "Are you sure you want to register for this event?"
    );

    if (!confirmRegistration) {
      return;
    }

    try {
      await registerForEvent({ eventId: id });
      setRegistrationStatus("Successfully registered for the event!");
      const updatedEvent = await getEventById(id);
      console.log("Updated Event Attendees:", updatedEvent?.data?.event.attendees);

      setEvent(updatedEvent?.data?.event);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  const handleRateEvent = async (choice) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const isUserRegistered = event.attendees?.some(
      (attendee) => attendee.toString() === user.id
    );

    if (!isUserRegistered) {
      alert("You must register for the event before rating it.");
      return;
    }

    try {
      await rateEvent({ eventId: id, choice }); // Call the backend API
      setUserRating(choice); // Update local state to reflect the user's rating
      setRatingStatus(`You ${choice}d the event!`);
    } catch (err) {
      setError("Failed to rate the event. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!event) return <div className="error-message">Event not found</div>;

  const isUserRegistered = event.attendees?.includes(user.id);

  return (
    <div className="event-details-container">
      <Navbar />
      <div className="event-details-content">
        <button onClick={() => navigate("/event")} className="back-button">
          ← Back to Events
        </button>
        <div className="event-header">
          <img
            src={event.image ? `http://localhost:8000${event.image}` : mernimg}
            alt={event.title}
            className="event-detail-image"
          />
          <h1 className="event-detail-title">{event.title}</h1>
        </div>
        <div className="event-info">
          <div className="event-main-details">
            <p className="event-detail-description">{event.description}</p>
            <div className="event-metadata">
              <div className="metadata-item">
                <span className="metadata-label">Date:</span>
                <span>{new Date(event.date).toLocaleString()}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Status:</span>
                <span>{event.status}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Attendees:</span>
                <span>{event.attendees?.length || 0}</span>
              </div>
            </div>
          </div>
          <div className="registration-section">
            <h2>Event Registration</h2>
            {registrationStatus && (
              <div className="registration-status success">{registrationStatus}</div>
            )}
            {!user && (
              <div className="login-prompt">
                Please{" "}
                <button onClick={() => navigate("/login")}>login</button> to
                register for this event
              </div>
            )}
            {user && !isUserRegistered && (
              <button onClick={handleRegister} className="register-button">
                Register for Event
              </button>
            )}
            {user && isUserRegistered && (
              <div className="already-registered">
                You are already registered for this event
              </div>
            )}
          </div>

          {/* Rating Section */}
          <div className="rating-section">
            <h2>Rate This Event</h2>
            {ratingStatus && (
              <div className="rating-status">{ratingStatus}</div>
            )}
            <div className="rating-buttons">
              <button
                onClick={() => handleRateEvent("like")}
                disabled={userRating === "like"}
                className={`rate-button ${userRating === "like" ? "disabled" : ""}`}
              >
                {userRating === "like" ? "Liked" : "Like"}
              </button>
              <button
                onClick={() => handleRateEvent("dislike")}
                disabled={userRating === "dislike"}
                className={`rate-button ${userRating === "dislike" ? "disabled" : ""}`}
              >
                {userRating === "dislike" ? "Disliked" : "Dislike"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;