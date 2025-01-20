const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const systemService = require('../services/systemService');

const router = express.Router();

// Get system info (public)
router.get('/system-info', async (req, res) => {
  try {
    const info = await systemService.getSystemInfo();
    res.json(info);
  } catch (error) {
    console.error('Error fetching system info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update system info (admin only)
router.put('/system-info', adminAuth, async (req, res) => {
  try {
    await systemService.updateSystemInfo(req.body);
    res.json({ message: 'System info updated successfully' });
  } catch (error) {
    console.error('Error updating system info:', error);
    if (error.message === 'Invalid title') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get system stats (authenticated users)
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await systemService.getSystemStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching system stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;