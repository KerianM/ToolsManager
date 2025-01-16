const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '../data/database.sqlite');
const dataDir = path.join(__dirname, '../data');

let db = null;

// Helper to save database to file
const saveDatabase = () => {
  if (!db) throw new Error('Database not initialized');
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
};

// Initialize or create new database
const initDb = async (forceNew = false) => {
  try {
    console.log('Initializing database...');
    const SQL = await initSqlJs();
    
    if (!forceNew && fs.existsSync(dbPath)) {
      console.log('Loading existing database from:', dbPath);
      const filebuffer = fs.readFileSync(dbPath);
      db = new SQL.Database(filebuffer);
    } else {
      console.log('Creating new database');
      db = new SQL.Database();
    }
    
    console.log('Database initialization complete');
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Promisified database operations with better error handling
const run = async (sql, params = []) => {
  if (!db) throw new Error('Database not initialized');
  try {
    console.log('Running SQL:', sql, 'with params:', params);
    const result = db.run(sql, params);
    saveDatabase();
    return result;
  } catch (error) {
    console.error('Database run error:', error);
    throw error;
  }
};

const get = async (sql, params = []) => {
  if (!db) throw new Error('Database not initialized');
  try {
    console.log('Getting SQL:', sql, 'with params:', params);
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const result = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();
    console.log('Query result:', result);
    return result;
  } catch (error) {
    console.error('Database get error:', error);
    throw error;
  }
};

const all = async (sql, params = []) => {
  if (!db) throw new Error('Database not initialized');
  try {
    console.log('Getting all SQL:', sql, 'with params:', params);
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    console.log('Query results count:', rows.length);
    return rows;
  } catch (error) {
    console.error('Database all error:', error);
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