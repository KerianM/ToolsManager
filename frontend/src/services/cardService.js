const cardRepository = require('../repositories/cardRepository');
const { validateId } = require('../utils/validation');
const { CardValidationError } = require('../utils/errors');

class CardService {
  async getAllCards() {
    return await cardRepository.findAll();
  }

  async getCardById(id) {
    validateId(id);
    return await cardRepository.findById(id);
  }

  async createCard(cardData, creatorName) {
    // Validate ID is provided
    if (!cardData.id) {
      throw new CardValidationError('Card ID is required');
    }
    validateId(cardData.id);

    // Check if card ID already exists
    const exists = await cardRepository.exists(cardData.id);
    if (exists) {
      throw new CardValidationError('Card ID already exists');
    }

    // Validate category exists
    const categoryExists = await cardRepository.categoryExists(cardData.category_id);
    if (!categoryExists) {
      throw new CardValidationError('Category not found');
    }

    // Create card with provided ID
    await cardRepository.create({
      ...cardData,
      creator_name: creatorName
    });

    // Return the created card
    return await this.getCardById(cardData.id);
  }

  async updateCard(id, cardData) {
    validateId(id);
    
    // Check if card exists
    const exists = await cardRepository.exists(id);
    if (!exists) {
      return null;
    }

    // If category is being updated, validate it exists
    if (cardData.category_id) {
      const categoryExists = await cardRepository.categoryExists(cardData.category_id);
      if (!categoryExists) {
        throw new CardValidationError('Category not found');
      }
    }

    await cardRepository.update(id, cardData);
    return await this.getCardById(id);
  }

  async deleteCard(id) {
    validateId(id);
    const card = await this.getCardById(id);
    if (!card) {
      return null;
    }

    await cardRepository.delete(id);
    return card;
  }
}

module.exports = new CardService();