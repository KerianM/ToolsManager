const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const categoryService = require('../services/categoryService');
const { validateCategory } = require('../utils/validation');

const router = express.Router();

// Get all categories
router.get('/', auth, async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new category (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, is_hidden } = req.body;
    
    const validationError = validateCategory({ name });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    await categoryService.createCategory(name, is_hidden);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.message === 'Category already exists') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update category (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { name, is_hidden } = req.body;

    const validationError = validateCategory({ name }, true);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    await categoryService.updateCategory(categoryId, { 
      name, 
      isHidden: is_hidden 
    });
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    if (error.message === 'Category name already exists') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete category (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    await categoryService.deleteCategory(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    if (error.message === 'Category not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Cannot delete category with existing cards') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;