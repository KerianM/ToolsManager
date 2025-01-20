const { initDb } = require('../config/database');
const { createTables } = require('../utils/database/schema');
const { seedDefaultData } = require('../utils/database/seeders');
const { addTimestampsToCards, updateSystemInfoTable } = require('../utils/database/migrations');

async function setupInitialData() {
  try {
    console.log('初始化数据...');
    
    // 强制创建新数据库
    await initDb(true);
    
    // 创建数据库表
    await createTables();
    
    // 运行迁移
    await addTimestampsToCards();
    await updateSystemInfoTable();
    
    // 填充默认数据
    await seedDefaultData();
    
    console.log('初始数据设置完成');
  } catch (error) {
    console.error('初始化数据失败:', error);
    throw error;
  }
}

module.exports = setupInitialData;

// 允许直接运行
if (require.main === module) {
  setupInitialData().catch(console.error);
}