const express = require('express');
const multer = require('multer');
const { adminAuth } = require('../middleware/auth');
const databaseService = require('../services/databaseService');

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 限制10MB
  }
});

// 导出数据库
router.get('/export', adminAuth, async (req, res) => {
  try {
    const data = await databaseService.exportDatabase();
    
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=database.sqlite');
    res.setHeader('Content-Length', data.length);
    
    res.send(data);
  } catch (error) {
    console.error('导出数据库失败:', error);
    res.status(500).json({ error: '导出数据库失败' });
  }
});

// 导入数据库
router.post('/import', adminAuth, upload.single('database'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请选择数据库文件' });
    }

    const result = await databaseService.importDatabase(req.file.buffer);
    res.json(result);
  } catch (error) {
    console.error('导入数据库失败:', error);
    res.status(500).json({ error: '导入数据库失败: ' + error.message });
  }
});

module.exports = router;