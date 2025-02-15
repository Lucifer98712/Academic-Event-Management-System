const express = require('express');
const router = express.Router();
const { auth, roleAuth } = require('../middlewares/auth');
const Notification = require('../models/notification.model');
const Event = require('../models/events.model');

// Get all notifications for logged in user

router.get('/my', auth, roleAuth(['user', 'admin', 'organizer']), async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .populate({
        path: 'eventId',
        model: 'events'
      })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      data: notifications
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Get unread notifications count
router.get('/unread/count', auth, roleAuth(['user', 'admin', 'organizer']), async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user.id,
      read: false
    });
    
    res.status(200).json({
      status: 'success',
      count
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Mark notification as read
router.patch('/:notificationId/read', auth, roleAuth(['user', 'admin', 'organizer']), async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.notificationId,
        userId: req.user.id
      },
      { read: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({
        status: 'failed',
        message: 'Notification not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: notification
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message
    });
  }
});

module.exports = router;