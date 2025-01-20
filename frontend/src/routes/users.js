const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const { all } = require('../config/database');
const { validateUser, validateUserUpdate } = require('../utils/validation');
const userService = require('../services/userService');

const router = express.Router();

router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await all(`
      SELECT id, username, real_name, allow_download, 
             max_daily_downloads, current_downloads, status 
      FROM users
    `);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/check-admin', auth, async (req, res) => {
  try {
    const isAdmin = await userService.isAdmin(req.user.id);
    res.json({ isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const userData = req.body;

    // Validate input
    const validationError = validateUser(userData);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Check if username already exists
    const exists = await userService.checkUserExists(userData.username);
    if (exists) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    await userService.createUser(userData);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    // Validate input
    const validationError = validateUserUpdate(userData);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    await userService.updateUser(userId, userData);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.message === 'Username already taken') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await userService.deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Cannot delete admin user') {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;