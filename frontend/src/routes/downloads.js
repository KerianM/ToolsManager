const express = require('express');
const { auth } = require('../middleware/auth');
const downloadService = require('../services/downloadService');

const router = express.Router();

// Check download eligibility
router.get('/check', auth, async (req, res) => {
  try {
    const result = await downloadService.checkDownloadEligibility(req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error checking download eligibility:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Decrease download count
router.post('/decrease', auth, async (req, res) => {
  try {
    const result = await downloadService.decreaseDownloadCount(req.user.id);
    res.json({
      message: 'Download count updated',
      ...result
    });
  } catch (error) {
    console.error('Error updating download count:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Daily download limit reached') {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;