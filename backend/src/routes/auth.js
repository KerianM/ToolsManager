const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { get } = require('../config/database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        is_admin: user.is_admin 
      }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;