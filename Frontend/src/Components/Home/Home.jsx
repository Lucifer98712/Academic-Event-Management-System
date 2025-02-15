import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../Assets/streamline.jpg";
import { getEvents } from "../../Utils/ClientApi";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

// Add these icon components at the top of your file
const SecurityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
      fill="#1A289F"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
      fill="#1A289F"
    />
  </svg>
);

const AutomationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.8 10.7L4.2 5L3 6.3L7.9 11.2C7.3 11.7 7 12.3 7 13C7 14.7 8.3 16 10 16C10.7 16 11.3 15.7 11.8 15.1L15.7 19L17 17.8L11.3 2.2C11.7 2 12.3 2 13 2C17.4 2 21 5.6 21 10C21 10.7 20.9 11.3 20.8 11.9L19.8 10.7ZM10 14C9.4 14 9 13.6 9 13C9 12.4 9.4 12 10 12C10.6 12 11 12.4 11 13C11 13.6 10.6 14 10 14Z"
      fill="#1A289F"
    />
  </svg>
);

const CustomizeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
      fill="#1A289F"
    />
  </svg>
);

// Add these social media icons for the footer
const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
      fill="currentColor"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 7.8V7.8C2 4.6 4.6 2 7.8 2ZM16.2 4H7.8C5.7 4 4 5.7 4 7.8V16.2C4 18.3 5.7 20 7.8 20H16.2C18.3 20 20 18.3 20 16.2V7.8C20 5.7 18.3 4 16.2 4ZM12 7C14.8 7 17 9.2 17 12C17 14.8 14.8 17 12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7ZM12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9Z"
      fill="currentColor"
    />
  </svg>
);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      const upcomingEvents = response?.data?.events
        .filter((event) => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

      setEvents(upcomingEvents);
    } catch (err) {
      setError("Failed to fetch events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="home-container">
      <Navbar />
      <section className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your
              <span className="highlight"> Academic Events</span>
            </h1>
            <p className="hero-subtitle">
              Elevate your academic gatherings with our seamless event management platform. From
              workshops to conferences, we make it simple.
            </p>
            <div className="hero-cta">
              <button className="primary-btn" onClick={() => navigate("/event")}>
                Explore Events
              </button>
              <button className="secondary-btn" onClick={() => navigate("/about")}>
                Learn More
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Events</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Institutions</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={img1} alt="Academic Conference" className="hero-main-image" />
            <div className="hero-overlay"></div>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="section-header">
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">Features that make us stand out</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon secure">
              <SecurityIcon />
            </div>
            <h3>Secure Registration</h3>
            <p>End-to-end encrypted data protection for all your participants</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon analytics">
              <AnalyticsIcon />
            </div>
            <h3>Real-time Analytics</h3>
            <p>Track attendance, engagement, and feedback in real-time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon automation">
              <AutomationIcon />
            </div>
            <h3>Smart Automation</h3>
            <p>Automated reminders, certificates, and attendee management</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon customize">
              <CustomizeIcon />
            </div>
            <h3>Custom Branding</h3>
            <p>Personalize your event page with your institution's branding</p>
          </div>
        </div>
      </section>
      <section className="upcoming-events">
        <div className="section-header">
          <span className="section-subtitle">What's Next</span>
          <h2 className="section-title">Upcoming Events</h2>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Loading amazing events...</span>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="events-showcase">
            {events.map((event, index) => (
              <div key={event._id} className={`event-card ${index === 1 ? "featured" : ""}`}>
                <div className="event-image">
                <img 
                  src={event.image ? `http://localhost:8000${event.image}` : img1} 
                  alt={event.title} 
                />
                  <div className="event-date">
                    <span className="day">{new Date(event.date).getDate()}</span>
                    <span className="month">
                      {new Date(event.date).toLocaleString("default", { month: "short" })}
                    </span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-category">{event.category}</div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-footer">
                    <span className="event-attendees">
                      {event.attendees?.length || 0} registered
                    </span>
                    <button className="register-btn" onClick={() => handleRegister(event._id)}>
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="events-cta">
          <button className="view-all-btn" onClick={() => navigate("/event")}>
            View All Events
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Get notified about new events and academic opportunities</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="/about">About Us</a>
            <a href="/event">Events</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <div className="contact-info">
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                    fill="Blue"
                  />
                </svg>
                <span style={{ color: 'blue' }}>info@academicevents.com</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                    fill="Blue"
                  />
                </svg>
                <span style={{ color: 'blue' }}>+977 9856324156</span>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-icon">
                <LinkedInIcon />
              </a>
              <a href="#" className="social-icon">
                <TwitterIcon />
              </a>
              <a href="#" className="social-icon">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Academic Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
