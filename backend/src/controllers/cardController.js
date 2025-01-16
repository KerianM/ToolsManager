const cardService = require('../services/cardService');
const { CardValidationError } = require('../utils/errors');
const { validateCardInput } = require('../utils/validators/cardValidator');

class CardController {
  async getAllCards(req, res) {
    try {
      const cards = await cardService.getAllCards();
      res.json(cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
      res.status(500).json({ error: 'Failed to fetch cards' });
    }
  }

  async getCardById(req, res) {
    try {
      const card = await cardService.getCardById(parseInt(req.params.id));
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.json(card);
    } catch (error) {
      if (error instanceof CardValidationError) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Error fetching card:', error);
      res.status(500).json({ error: 'Failed to fetch card' });
    }
  }

  async createCard(req, res) {
    try {
      const validationError = validateCardInput(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const card = await cardService.createCard(req.body, req.user.username);
      res.status(201).json(card);
    } catch (error) {
      if (error instanceof CardValidationError) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Error creating card:', error);
      res.status(500).json({ error: 'Failed to create card' });
    }
  }

  async updateCard(req, res) {
    try {
      const validationError = validateCardInput(req.body, true);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const card = await cardService.updateCard(parseInt(req.params.id), req.body);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.json(card);
    } catch (error) {
      if (error instanceof CardValidationError) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Error updating card:', error);
      res.status(500).json({ error: 'Failed to update card' });
    }
  }

  async deleteCard(req, res) {
    try {
      const card = await cardService.deleteCard(parseInt(req.params.id));
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.json({ message: 'Card deleted successfully', card });
    } catch (error) {
      if (error instanceof CardValidationError) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Error deleting card:', error);
      res.status(500).json({ error: 'Failed to delete card' });
    }
  }
}

// Export an instance of the controller
const cardController = new CardController();
module.exports = cardController;