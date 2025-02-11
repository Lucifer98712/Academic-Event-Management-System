import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // Let the browser set it automatically
  }
  return config;
});

//User API calls
export const registerUser = async (userData) => {
    return axiosInstance.post(`/users/register`, userData);
};

export const loginUser = async (userData) => {
    return axiosInstance.post(`/users/login`, userData);
};

export const deleteUser = async (userId) => {
  return axiosInstance.delete(`/users/delete`, { data: { id: userId } });
};

//Event API calls
export const getEvents = async () => {
    return axiosInstance.get(`/events`);
};

export const getEventById = async (eventId) => {
    return axiosInstance.get(`/events/${eventId}`);
};

export const createEvent = async (eventData) => {
    return axiosInstance.post(`/events/create`, eventData);
};

export const updateEvent = async (formData) => {
  return axiosInstance.patch(`/events/update`, formData); // Remove headers
};

export const deleteEvent = async (eventId) => {
    return axiosInstance.delete(`/events/delete`,{ data: { id: eventId } });
};

export const registerForEvent = async (registrationData) => {
    return axiosInstance.post(`/events/register`, registrationData);
}

export const rateEvent = async (ratingData) => {
    return axiosInstance.post('/events/rate', ratingData);
  };

// Admin API calls
export const getAllUsers = async () => {
    return axiosInstance.get(`/admin/monitor-users`);
};

export const getAdminRequests = async () => {
    return axiosInstance.get('/admin/view-requests');
};
  
export const handleAdminRequest = async (requestData) => {
  return axiosInstance.post('/admin/handle-request', requestData);
};

export const getDashboardStats = async () => {
  return axiosInstance.get('/admin/dashboard/stats');
};

export const getEventStatusData = async () => {
  return axiosInstance.get('/admin/dashboard/event-status');
};

export const getVisitorStats = async () => {
  return axiosInstance.get('/admin/dashboard/visitor-stats');
};


// Utility API calls
export const getRecommendations = async (category = {}) => {
    return axiosInstance.post(`/api/events`, category);
};

export const sendReminder = async (reminderData) => {
    return axiosInstance.post(`/api/notifications`, reminderData);
};

// Notification API calls
export const getMyNotifications = async () => {
  return axiosInstance.get('/api/notifications/my');
};

export const getUnreadCount = async () => {
  return axiosInstance.get('/api/notifications/unread/count');
};

export const markNotificationRead = async (notificationId) => {
  return axiosInstance.patch(`/api/notifications/${notificationId}/read`);
};


  