import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Aboutus.css';
import Navbar from '../Navbar/Navbar';

const Aboutus = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
  };
  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="about-header">
          <h1>About AEvent</h1>
          <p>Transforming Event Management Through Innovation</p>
        </div>

        <section className="company-overview">
          <div className="container">
            <h2>Our Story</h2>
            <p>Founded in 2024, AEvent has revolutionized the way events are planned and managed. 
               We believe in creating memorable experiences through seamless event organization.</p>
          </div>
        </section>

        <section className="our-values">
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-star"></i>
              <h3>Excellence</h3>
              <p>Committed to delivering outstanding event experiences</p>
            </div>
            <div className="value-card">
              <i className="fas fa-handshake"></i>
              <h3>Trust</h3>
              <p>Building lasting relationships with our clients</p>
            </div>
            <div className="value-card">
              <i className="fas fa-lightbulb"></i>
              <h3>Innovation</h3>
              <p>Embracing new technologies and ideas</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              {/* <img src="/team1.jpg" alt="Team Member" /> */}
              <h3>Samiksha Tiwari</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              {/* <img src="/team2.jpg" alt="Team Member" /> */}
              <h3>Kreshina Dhakal</h3>
              <p>Developer</p>
            </div>
            <div className="team-member">
              {/* <img src="/team3.jpg" alt="Team Member" /> */}
              <h3>Pratik Shah</h3>
              <p>Technical Lead</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Events Organized</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
            <div className="stat-item">
              <h3>20+</h3>
              <p>Awards Won</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"AEvent made our conference a huge success. Their attention to detail was impressive!"</p>
              <h4>- Anil Shrestha, Tech Corp</h4>
            </div>
            <div className="testimonial-card">
              <p>"The best event management platform we've ever worked with."</p>
              <h4>- Kopila Sapkota, StartUp Inc</h4>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Create Your Next Event?</h2>
          <p>Join us in making your event extraordinary</p>
          <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
        </section>
      </div>
    </>
  );
};

export default Aboutus;