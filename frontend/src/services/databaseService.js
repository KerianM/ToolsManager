const fs = require('fs');
const path = require('path');
const { dbPath, initDb } = require('../config/database');

class DatabaseService {
  async exportDatabase() {
    try {
      if (!fs.existsSync(dbPath)) {
        throw new Error('数据库文件不存在');
      }

      const data = fs.readFileSync(dbPath);
      return data;
    } catch (error) {
      console.error('导出数据库失败:', error);
      throw error;
    }
  }

  async importDatabase(fileBuffer) {
    try {
      if (!fileBuffer || !(fileBuffer instanceof Buffer)) {
        throw new Error('无效的数据库文件');
      }

      // 备份当前数据库
      if (fs.existsSync(dbPath)) {
        const backupPath = `${dbPath}.backup.${Date.now()}`;
        fs.copyFileSync(dbPath, backupPath);
      }

      // 写入新数据库文件
      fs.writeFileSync(dbPath, fileBuffer);

      // 重新初始化数据库连接
      await initDb();

      return { message: '数据库导入成功' };
    } catch (error) {
      console.error('导入数据库失败:', error);
      throw error;
    }
  }
}

module.exports = new DatabaseService();