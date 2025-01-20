const { CardValidationError } = require('./errors');

/**
 * Validates user input for creation
 * @param {Object} userData User data to validate
 * @returns {string|null} Error message if validation fails, null if validation passes
 */
const validateUser = (userData) => {
  const { username, password, real_name, allow_download, max_daily_downloads } = userData;

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return 'Username must be at least 3 characters long';
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  if (real_name && (typeof real_name !== 'string' || real_name.trim().length < 2)) {
    return 'Real name must be at least 2 characters long';
  }

  if (allow_download !== undefined && typeof allow_download !== 'number') {
    return 'Allow download must be a number (0 or 1)';
  }

  if (max_daily_downloads !== undefined && (!Number.isInteger(max_daily_downloads) || max_daily_downloads < 0)) {
    return 'Max daily downloads must be a positive integer';
  }

  return null;
};

/**
 * Validates user input for updates
 * @param {Object} userData User data to validate
 * @returns {string|null} Error message if validation fails, null if validation passes
 */
const validateUserUpdate = (userData) => {
  const { username, password, real_name, allow_download, max_daily_downloads, status } = userData;

  if (username && (typeof username !== 'string' || username.trim().length < 3)) {
    return 'Username must be at least 3 characters long';
  }

  if (password && (typeof password !== 'string' || password.length < 6)) {
    return 'Password must be at least 6 characters long';
  }

  if (real_name && (typeof real_name !== 'string' || real_name.trim().length < 2)) {
    return 'Real name must be at least 2 characters long';
  }

  if (allow_download !== undefined && typeof allow_download !== 'number') {
    return 'Allow download must be a number (0 or 1)';
  }

  if (max_daily_downloads !== undefined && (!Number.isInteger(max_daily_downloads) || max_daily_downloads < 0)) {
    return 'Max daily downloads must be a positive integer';
  }

  if (status !== undefined && typeof status !== 'number') {
    return 'Status must be a number';
  }

  return null;
};

/**
 * Validates category input
 * @param {Object} categoryData Category data to validate
 * @param {boolean} isUpdate Whether this is an update operation
 * @returns {string|null} Error message if validation fails, null if validation passes
 */
const validateCategory = ({ name }, isUpdate = false) => {
  if (!isUpdate && !name) {
    return 'Category name is required';
  }
  
  if (name && (typeof name !== 'string' || name.trim().length < 2)) {
    return 'Category name must be at least 2 characters long';
  }

  return null;
};

/**
 * Validates an ID
 * @param {number|string} id The ID to validate
 * @throws {CardValidationError} If ID is invalid
 */
const validateId = (id) => {
  const numId = Number(id);
  if (!id || isNaN(numId) || numId < 1) {
    throw new CardValidationError('Invalid ID');
  }
};

module.exports = {
  validateUser,
  validateUserUpdate,
  validateCategory,
  validateId
};