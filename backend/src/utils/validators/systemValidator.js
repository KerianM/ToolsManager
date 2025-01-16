/**
 * Validates system info update data
 * @param {Object} data System info data to validate
 * @returns {string|null} Error message if validation fails, null if validation passes
 */
const validateSystemInfo = (data) => {
  if (!data || typeof data !== 'object') {
    return 'Invalid system info data';
  }

  const { title, announcement, website_title, logo_url, background_url } = data;

  if (title !== undefined && (typeof title !== 'string' || title.trim().length < 1)) {
    return 'Title is required and must not be empty';
  }

  if (announcement !== undefined && typeof announcement !== 'string') {
    return 'Announcement must be a string';
  }

  if (website_title !== undefined && (typeof website_title !== 'string' || website_title.trim().length < 1)) {
    return 'Website title must not be empty';
  }

  if (logo_url !== undefined && typeof logo_url !== 'string') {
    return 'Logo URL must be a string';
  }

  if (background_url !== undefined && typeof background_url !== 'string') {
    return 'Background URL must be a string';
  }

  return null;
};

module.exports = {
  validateSystemInfo
};