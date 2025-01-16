const { CardValidationError } = require('../errors');

/**
 * Validates card input data
 * @param {Object} cardData Card data to validate
 * @param {boolean} isUpdate Whether this is an update operation
 * @returns {string|null} Error message if validation fails, null if validation passes
 */
const validateCardInput = (cardData, isUpdate = false) => {
  if (!cardData || typeof cardData !== 'object') {
    return 'Invalid card data';
  }

  const { name, description, category_id, download_url, preview_url, markdown_content } = cardData;

  // Skip validation for optional fields during update
  if (!isUpdate) {
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return 'Card name must be at least 2 characters long';
    }

    if (!category_id || !Number.isInteger(Number(category_id)) || Number(category_id) < 1) {
      return 'Valid category ID is required';
    }
  } else if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      return 'Card name must be at least 2 characters long';
    }
  }

  // Validate optional fields if provided
  if (description !== undefined && typeof description !== 'string') {
    return 'Description must be a string';
  }

  if (download_url !== undefined && typeof download_url !== 'string') {
    return 'Download URL must be a string';
  }

  if (preview_url !== undefined && typeof preview_url !== 'string') {
    return 'Preview URL must be a string';
  }

  if (markdown_content !== undefined && typeof markdown_content !== 'string') {
    return 'Markdown content must be a string';
  }

  return null;
};

module.exports = {
  validateCardInput
};