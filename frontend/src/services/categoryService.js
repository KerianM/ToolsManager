const { run, get, all } = require('../config/database');

class CategoryService {
  async getAllCategories() {
    return await all(`
      SELECT c.*, COUNT(ca.id) as card_count 
      FROM categories c 
      LEFT JOIN cards ca ON c.id = ca.category_id 
      GROUP BY c.id
    `);
  }

  async createCategory(name, isHidden = 0) {
    const existingCategory = await get('SELECT id FROM categories WHERE name = ?', [name]);
    if (existingCategory) {
      throw new Error('Category already exists');
    }

    return await run('INSERT INTO categories (name, is_hidden) VALUES (?, ?)', [name, isHidden]);
  }

  async updateCategory(id, { name, isHidden }) {
    if (name) {
      const existingCategory = await get(
        'SELECT id FROM categories WHERE name = ? AND id != ?', 
        [name, id]
      );
      if (existingCategory) {
        throw new Error('Category name already exists');
      }
    }

    const updates = [];
    const params = [];

    if (name) {
      updates.push('name = ?');
      params.push(name);
    }
    if (isHidden !== undefined) {
      updates.push('is_hidden = ?');
      params.push(isHidden);
    }

    if (updates.length === 0) {
      return null;
    }

    params.push(id);
    return await run(`
      UPDATE categories 
      SET ${updates.join(', ')} 
      WHERE id = ?
    `, params);
  }

  async deleteCategory(id) {
    const category = await get('SELECT id FROM categories WHERE id = ?', [id]);
    if (!category) {
      throw new Error('Category not found');
    }

    const hasCards = await get('SELECT id FROM cards WHERE category_id = ? LIMIT 1', [id]);
    if (hasCards) {
      throw new Error('Cannot delete category with existing cards');
    }

    return await run('DELETE FROM categories WHERE id = ?', [id]);
  }
}

module.exports = new CategoryService();