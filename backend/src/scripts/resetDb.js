const fs = require('fs');
const bcrypt = require('bcryptjs');
const { initDb, dbPath, dataDir } = require('../config/database');

async function resetDatabase() {
  try {
    // ... other code ...

    // Create default admin user with real_name = 'Administrator'
    console.log('Creating default admin user');
    const hashedPassword = bcrypt.hashSync('admin', 10);
    db.run(`
      INSERT INTO users (username, password, real_name, max_daily_downloads)
      VALUES (?, ?, ?, ?)
    `, ['admin', hashedPassword, 'Administrator', 999999]);

    // ... other code ...
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

module.exports = resetDatabase;