const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const cardController = require('../controllers/cardController');

const router = express.Router();

// Get all cards
router.get('/', auth, (req, res) => cardController.getAllCards(req, res));

// Get card by ID
router.get('/:id', auth, (req, res) => cardController.getCardById(req, res));

// Create new card (admin only)
router.post('/', adminAuth, (req, res) => cardController.createCard(req, res));

// Update card (admin only)
router.put('/:id', adminAuth, (req, res) => cardController.updateCard(req, res));

// Delete card (admin only)
router.delete('/:id', adminAuth, (req, res) => cardController.deleteCard(req, res));

module.exports = router;