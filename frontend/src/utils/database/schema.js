const { run } = require('../../config/database');

async function createTables() {
  try {
    // Create categories table
    await run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        is_hidden INTEGER DEFAULT 0
      );
    `);

    // Create cards table
    await run(`
      CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        category_id INTEGER NOT NULL,
        creator_name TEXT,
        download_url TEXT,
        preview_url TEXT,
        markdown_content TEXT,
        status INTEGER DEFAULT 1,
        created_at INTEGER,
        updated_at INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);

    // Create users table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        real_name TEXT,
        allow_download INTEGER DEFAULT 1,
        max_daily_downloads INTEGER DEFAULT 10,
        current_downloads INTEGER DEFAULT 0,
        status INTEGER DEFAULT 1,
        is_admin INTEGER DEFAULT 0
      );
    `);

    // Create system_info table with new fields
    await run(`
      CREATE TABLE IF NOT EXISTS system_info (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        title TEXT NOT NULL,
        announcement TEXT,
        website_title TEXT NOT NULL DEFAULT '卡片管理系统',
        logo_url TEXT,
        background_url TEXT
      );
    `);

  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

module.exports = { createTables };