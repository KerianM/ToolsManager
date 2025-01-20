const { run, get } = require('../config/database');

class SystemRepository {
  async getSystemInfo() {
    return await get(`
      SELECT 
        title,
        announcement,
        website_title,
        logo_url,
        background_url
      FROM system_info 
      LIMIT 1
    `);
  }

  async updateSystemInfo(data) {
    const updates = [];
    const params = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
    }
    if (data.announcement !== undefined) {
      updates.push('announcement = ?');
      params.push(data.announcement);
    }
    if (data.website_title !== undefined) {
      updates.push('website_title = ?');
      params.push(data.website_title);
    }
    if (data.logo_url !== undefined) {
      updates.push('logo_url = ?');
      params.push(data.logo_url);
    }
    if (data.background_url !== undefined) {
      updates.push('background_url = ?');
      params.push(data.background_url);
    }

    if (updates.length === 0) return false;

    await run(`
      INSERT OR REPLACE INTO system_info (
        id,
        ${updates.map(u => u.split(' = ')[0]).join(', ')}
      )
      VALUES (
        1,
        ${updates.map(() => '?').join(', ')}
      )
    `, params);

    return true;
  }

  async getStats() {
    const totalUsers = await get('SELECT COUNT(*) as count FROM users');
    const totalCards = await get('SELECT COUNT(*) as count FROM cards');
    const totalCategories = await get('SELECT COUNT(*) as count FROM categories');
    const activeUsers = await get('SELECT COUNT(*) as count FROM users WHERE status = 1');

    return {
      users: {
        total: totalUsers.count,
        active: activeUsers.count
      },
      cards: totalCards.count,
      categories: totalCategories.count
    };
  }
}

module.exports = new SystemRepository();