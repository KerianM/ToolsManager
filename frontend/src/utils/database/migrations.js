const { run } = require('../../config/database');

async function addTimestampsToCards() {
  try {
    // Create a new table with timestamps
    await run(`
      CREATE TABLE IF NOT EXISTS cards_new (
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

    // Copy existing data with explicit column mapping
    await run(`
      INSERT INTO cards_new (
        id, name, description, category_id, creator_name,
        download_url, preview_url, markdown_content, status,
        created_at, updated_at
      )
      SELECT 
        id, name, description, category_id, creator_name,
        download_url, preview_url, markdown_content, status,
        CAST(strftime('%s', 'now') as INTEGER),
        CAST(strftime('%s', 'now') as INTEGER)
      FROM cards;
    `);

    // Drop old table and rename new one
    await run('DROP TABLE IF EXISTS cards;');
    await run('ALTER TABLE cards_new RENAME TO cards;');
  } catch (error) {
    console.error('Error adding timestamp columns:', error);
    throw error;
  }
}

async function updateSystemInfoTable() {
  try {
    // Create new system_info table with all fields
    await run(`
      CREATE TABLE IF NOT EXISTS system_info_new (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        title TEXT NOT NULL DEFAULT 'Card Management System',
        announcement TEXT DEFAULT 'Welcome!',
        website_title TEXT NOT NULL DEFAULT '卡片管理系统',
        logo_url TEXT DEFAULT '',
        background_url TEXT DEFAULT ''
      );
    `);

    // Copy existing data if any
    await run(`
      INSERT INTO system_info_new (id, title, announcement)
      SELECT id, title, announcement FROM system_info
      WHERE EXISTS (SELECT 1 FROM system_info)
      UNION ALL
      SELECT 1, 'Card Management System', 'Welcome!'
      WHERE NOT EXISTS (SELECT 1 FROM system_info);
    `);

    // Drop old table and rename new one
    await run('DROP TABLE IF EXISTS system_info;');
    await run('ALTER TABLE system_info_new RENAME TO system_info;');
  } catch (error) {
    console.error('Error updating system_info table:', error);
    throw error;
  }
}

module.exports = {
  addTimestampsToCards,
  updateSystemInfoTable
};