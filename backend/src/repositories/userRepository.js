const { run, get, all } = require('../config/database');

/**
 * User Repository
 * Handles database operations for users
 * 
 * User Fields:
 * - id (INTEGER): Primary key, auto-incrementing
 * - username (TEXT): Unique username
 * - password (TEXT): Hashed password
 * - real_name (TEXT): User's real name
 * - allow_download (INTEGER): Whether user can download (1=yes, 0=no)
 * - max_daily_downloads (INTEGER): Maximum downloads per day
 * - current_downloads (INTEGER): Current download count for the day
 * - status (INTEGER): User status (0=inactive, 1=active, 2=suspended)
 * - is_admin (INTEGER): Admin flag (1=admin, 0=regular user)
 */
class UserRepository {
  async findAll() {
    return await all(`
      SELECT 
        id,
        username,
        real_name,
        allow_download,
        max_daily_downloads,
        current_downloads,
        status,
        is_admin
      FROM users
      ORDER BY id ASC
    `);
  }

  async findById(id) {
    return await get(`
      SELECT 
        id,
        username,
        real_name,
        allow_download,
        max_daily_downloads,
        current_downloads,
        status,
        is_admin
      FROM users
      WHERE id = ?
    `, [id]);
  }

  async findByUsername(username) {
    return await get(`
      SELECT 
        id,
        username,
        password,
        real_name,
        allow_download,
        max_daily_downloads,
        current_downloads,
        status,
        is_admin
      FROM users
      WHERE username = ?
    `, [username]);
  }
}

module.exports = new UserRepository();