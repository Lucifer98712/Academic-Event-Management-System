import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';
import Navbar from '../Navbar/Navbar';
import { getMyNotifications, markNotificationRead, getUnreadCount } from '../../Utils/ClientApi';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchNotifications();
    fetchUnreadCount();
  }, [navigate]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getMyNotifications();
      
      // Check if response has the correct structure
      if (response?.data?.status === 'success' && Array.isArray(response.data.data)) {
        const sortedNotifications = response.data.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
        setError(null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error:', err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId);
      // Update local state after successful API call
      setNotifications(notifications.map(notif =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadCount();
      if (response?.data?.status === 'success') {
        setUnreadCount(response.data.count);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="notification-container">
          <div className="notification-header">
            <h2>Loading notifications...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="notification-container">
          <div className="notification-header">
            <h2>Error: {error}</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="notification-container">
        <div className="notification-header">
          <h2>Notifications {unreadCount > 0 && `(${unreadCount} unread)`}</h2>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification._id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => handleMarkAsRead(notification._id)}
              >
                <div className="notification-content">
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-timestamp">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
                {!notification.read && <div className="unread-indicator"></div>}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;