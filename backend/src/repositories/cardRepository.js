const { run, get, all } = require('../config/database');

class CardRepository {
  async findAll() {
    return await all(`
      SELECT 
        c.id,
        c.name,
        c.description,
        c.category_id,
        c.creator_name,
        c.download_url,
        c.preview_url,
        c.markdown_content,
        c.status,
        c.created_at,
        c.updated_at,
        cat.name as category_name
      FROM cards c
      LEFT JOIN categories cat ON c.category_id = cat.id
      ORDER BY c.id DESC
    `);
  }

  async findById(id) {
    return await get(`
      SELECT 
        c.id,
        c.name,
        c.description,
        c.category_id,
        c.creator_name,
        c.download_url,
        c.preview_url,
        c.markdown_content,
        c.status,
        c.created_at,
        c.updated_at,
        cat.name as category_name
      FROM cards c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.id = ?
    `, [id]);
  }

  async create(cardData) {
    const now = Math.floor(Date.now() / 1000);
    
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
      cardData.id,
      cardData.name,
      cardData.description || '',
      cardData.category_id,
      cardData.creator_name,
      cardData.download_url || '',
      cardData.preview_url || '',
      cardData.markdown_content || '',
      cardData.status || 1,
      now,
      now
    ]);
    
    return cardData.id;
  }

  async update(id, cardData) {
    const updates = [];
    const params = [];
    const now = Math.floor(Date.now() / 1000);

    if (cardData.name !== undefined) {
      updates.push('name = ?');
      params.push(cardData.name);
    }
    if (cardData.description !== undefined) {
      updates.push('description = ?');
      params.push(cardData.description);
    }
    if (cardData.category_id !== undefined) {
      updates.push('category_id = ?');
      params.push(cardData.category_id);
    }
    if (cardData.download_url !== undefined) {
      updates.push('download_url = ?');
      params.push(cardData.download_url);
    }
    if (cardData.preview_url !== undefined) {
      updates.push('preview_url = ?');
      params.push(cardData.preview_url);
    }
    if (cardData.markdown_content !== undefined) {
      updates.push('markdown_content = ?');
      params.push(cardData.markdown_content);
    }
    if (cardData.status !== undefined) {
      updates.push('status = ?');
      params.push(cardData.status);
    }

    if (updates.length === 0) return null;

    updates.push('updated_at = ?');
    params.push(now);
    
    params.push(id);
    await run(`
      UPDATE cards 
      SET ${updates.join(', ')} 
      WHERE id = ?
    `, params);
    
    return true;
  }

  async delete(id) {
    return await run('DELETE FROM cards WHERE id = ?', [id]);
  }

  async exists(id) {
    const result = await get('SELECT id FROM cards WHERE id = ?', [id]);
    return result !== null;
  }

  async categoryExists(categoryId) {
    const result = await get('SELECT id FROM categories WHERE id = ?', [categoryId]);
    return result !== null;
  }
}

module.exports = new CardRepository();