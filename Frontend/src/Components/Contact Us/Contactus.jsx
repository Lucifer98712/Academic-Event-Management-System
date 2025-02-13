import React, { useState } from 'react';
import './Contactus.css';
import Navbar from '../Navbar/Navbar';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <>
      <Navbar />
    <div className="contact-page">
       
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us for any questions or concerns</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Our Location</h3>
            <p>Patan Dhoka, Lalitpur, Nepal</p>
          </div>

          <div className="info-item">
            <i className="fas fa-phone"></i>
            <h3>Phone Number</h3>
            <p>+977 9856324156</p>
          </div>

          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <h3>Email Address</h3>
            <p>contact@aevent.com</p>
          </div>

          {/* <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div> */}
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1766.6278066143602!2d85.32056923779724!3d27.678493535182096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb194463f31ac1%3A0xf3ed1a3f036d8f89!2sYala%20Dhwakha%20-%20Patan%20Dhoka!5e0!3m2!1sen!2snp!4v1738837859056!5m2!1sen!2snp"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    </>
  );
};

export default Contactus;