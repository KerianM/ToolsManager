const bcrypt = require('bcryptjs');
const { run, get } = require('../config/database');
const downloadService = require('./downloadService');
const { UserValidationError } = require('../utils/errors');

class UserService {
  async checkUserExists(username) {
    const user = await get('SELECT id FROM users WHERE username = ?', [username]);
    return user !== null;
  }

  async createUser(userData) {
    const { username, password, real_name, allow_download, max_daily_downloads } = userData;
    
    // Check if username already exists
    const exists = await this.checkUserExists(username);
    if (exists) {
      throw new UserValidationError('Username already exists');
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const isAdmin = real_name === 'Administrator' ? 1 : 0;
    
    const result = await run(`
      INSERT INTO users (
        username, 
        password, 
        real_name, 
        allow_download, 
        max_daily_downloads,
        current_downloads,
        is_admin
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      username, 
      hashedPassword, 
      real_name || null, 
      allow_download || 1, 
      max_daily_downloads || 10,
      0, // Initialize current_downloads to 0
      isAdmin
    ]);

    return result;
  }

  async updateUser(userId, userData) {
    const { username, password, real_name, allow_download, max_daily_downloads, status } = userData;
    
    if (username) {
      const existingUser = await get(
        'SELECT id FROM users WHERE username = ? AND id != ?', 
        [username, userId]
      );
      if (existingUser) {
        throw new UserValidationError('Username already taken');
      }
    }

    const updates = [];
    const params = [];

    if (username) {
      updates.push('username = ?');
      params.push(username);
    }
    if (password) {
      updates.push('password = ?');
      params.push(bcrypt.hashSync(password, 10));
    }
    if (real_name !== undefined) {
      updates.push('real_name = ?');
      updates.push('is_admin = ?');
      params.push(real_name);
      params.push(real_name === 'Administrator' ? 1 : 0);
    }
    if (allow_download !== undefined) {
      updates.push('allow_download = ?');
      params.push(allow_download);
    }
    if (max_daily_downloads !== undefined) {
      updates.push('max_daily_downloads = ?');
      params.push(max_daily_downloads);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }

    if (updates.length === 0) {
      return null;
    }

    params.push(userId);
    return await run(`
      UPDATE users 
      SET ${updates.join(', ')}
      WHERE id = ?
    `, params);
  }

  async deleteUser(userId) {
    const user = await get('SELECT real_name FROM users WHERE id = ?', [userId]);
    if (!user) {
      throw new UserValidationError('User not found');
    }
    if (user.real_name === 'Administrator') {
      throw new UserValidationError('Cannot delete admin user');
    }

    return await run('DELETE FROM users WHERE id = ?', [userId]);
  }

  async isAdmin(userId) {
    const user = await get('SELECT real_name FROM users WHERE id = ?', [userId]);
    return user ? user.real_name === 'Administrator' : false;
  }
}

module.exports = new UserService();