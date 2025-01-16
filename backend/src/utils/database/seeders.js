const { run } = require('../../config/database');
const bcrypt = require('bcryptjs');
const { DEFAULT_CATEGORY, DEFAULT_CARD } = require('../../config/defaults');

async function seedDefaultData() {
  try {
    const now = Math.floor(Date.now() / 1000);

    // Seed default category
    await run(`
      INSERT INTO categories (id, name, is_hidden)
      VALUES (?, ?, ?)
      ON CONFLICT(id) DO NOTHING
    `, [DEFAULT_CATEGORY.id, DEFAULT_CATEGORY.name, DEFAULT_CATEGORY.is_hidden]);

    // First delete any existing cards to ensure clean state
    await run('DELETE FROM cards');

    // Seed default card with correct data
    await run(`
      INSERT INTO cards (
        id,
        name,
        description,
        category_id,
        creator_name,
        download_url,
        preview_url,
        markdown_content,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      DEFAULT_CARD.id,
      DEFAULT_CARD.name,
      DEFAULT_CARD.description,
      DEFAULT_CARD.category_id,
      DEFAULT_CARD.creator_name,
      DEFAULT_CARD.download_url,
      DEFAULT_CARD.preview_url,
      DEFAULT_CARD.markdown_content,
      DEFAULT_CARD.status,
      now,
      now
    ]);

    // Seed default admin user if not exists
    const hashedPassword = bcrypt.hashSync('admin', 10);
    await run(`
      INSERT INTO users (username, password, real_name, max_daily_downloads, is_admin)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(username) DO NOTHING
    `, ['admin', hashedPassword, 'Administrator', 999999, 1]);

  } catch (error) {
    console.error('Error seeding default data:', error);
    throw error;
  }
}

module.exports = { seedDefaultData };