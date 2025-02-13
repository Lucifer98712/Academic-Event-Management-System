// EventManagement.jsx
import React, { useEffect, useState } from "react";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../../Utils/ClientApi";
import "./EventManagement.css";

const EventManagement = ({ onUpdate }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    status: "pending", // Add status field
    image: null
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response.data.events);
    } catch (error) {
      setError("Failed to fetch events");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files & files.length > 0) {
      console.log('Image file:', files[0]); // Debug log
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
  
     // Add non-file fields
     formDataToSend.append('title', formData.title);
     formDataToSend.append('date', formData.date);
     formDataToSend.append('description', formData.description);
     formDataToSend.append('status', formData.status);
 
     // Add ID if editing
     if (selectedEvent) {
       formDataToSend.append('id', selectedEvent._id);
     }
     console.log('Form image before append:', formData.image); // Debug log

    // Add image if exists
    if (formData.image instanceof File) {
      formDataToSend.append('image', formData.image);
    }
      // Send the request
      if (selectedEvent) {
        await updateEvent(formDataToSend); // Pass FormData directly
      } else {
        await createEvent(formDataToSend); // Pass FormData directly
      }
  
      await fetchEvents(); // Refresh events list
      onUpdate?.(); // Notify parent component
      handleCloseModal(); // Close modal
    } catch (error) {
      setError("Failed to save event");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        setLoading(true);
        await deleteEvent(eventId);
        await fetchEvents();
        onUpdate?.();
      } catch (error) {
        setError("Failed to delete event");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: new Date(event.date).toISOString().split("T")[0],
      description: event.description,
      status: event.status,
      image: event.image || null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData({
      title: "",
      date: "",
      description: "",
      status: "pending",
      image: null,
    });
  };

  return (
    <div className="event-management">
      <div className="event-header">
        <h2>Event Management</h2>
        <button className="create-button" onClick={() => setIsModalOpen(true)}>
          Create New Event
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="events-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${event.status}`}>{event.status}</span>
                </td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(event)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(event._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedEvent ? "Edit Event" : "Create New Event"}</h3>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
               <label>Event Date</label>
                <input
                   type="date"
                   name="date"
                   value={formData.date}
                   onChange={handleInputChange}
                   required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Event Image</label>
                <input 
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? "Saving..." : selectedEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
