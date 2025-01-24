const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '../data/database.sqlite');
const dataDir = path.join(__dirname, '../data');

let db = null;

// Helper to save database to file
const saveDatabase = () => {
  if (!db) throw new Error('数据库未初始化');
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
};

// Initialize or create new database
const initDb = async (forceNew = false) => {
  try {
    console.log('初始化数据库...');
    const SQL = await initSqlJs();
    
    // 确保数据目录存在
    if (!fs.existsSync(dataDir)) {
      console.log('创建数据目录:', dataDir);
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // 如果强制新建或数据库文件不存在，创建新数据库
    if (forceNew || !fs.existsSync(dbPath)) {
      console.log('创建新数据库');
      db = new SQL.Database();
      saveDatabase(); // 立即保存新数据库文件
    } else {
      try {
        console.log('加载现有数据库:', dbPath);
        const filebuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(filebuffer);
      } catch (error) {
        console.log('加载现有数据库失败，创建新数据库');
        db = new SQL.Database();
        saveDatabase();
      }
    }
    
    console.log('数据库初始化完成');
    return db;
  } catch (error) {
    console.error('数据库初始化错误:', error);
    throw error;
  }
};

// Promisified database operations with better error handling
const run = async (sql, params = []) => {
  if (!db) throw new Error('数据库未初始化');
  try {
    console.log('执行SQL:', sql, '参数:', params);
    const result = db.run(sql, params);
    saveDatabase();
    return result;
  } catch (error) {
    console.error('数据库执行错误:', error);
    throw error;
  }
};

const get = async (sql, params = []) => {
  if (!db) throw new Error('数据库未初始化');
  try {
    console.log('查询SQL:', sql, '参数:', params);
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const result = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();
    console.log('查询结果:', result);
    return result;
  } catch (error) {
    console.error('数据库查询错误:', error);
    throw error;
  }
};

const all = async (sql, params = []) => {
  if (!db) throw new Error('数据库未初始化');
  try {
    console.log('查询所有SQL:', sql, '参数:', params);
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    console.log('查询结果数量:', rows.length);
    return rows;
  } catch (error) {
    console.error('数据库查询错误:', error);
    throw error;
  }
};

module.exports = {
  initDb,
  run,
  get,
  all,
  dbPath,
  dataDir
};