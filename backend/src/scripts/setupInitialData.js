const { initDb } = require('../config/database');
const { createTables } = require('../utils/database/schema');
const { seedDefaultData } = require('../utils/database/seeders');
const { addTimestampsToCards, updateSystemInfoTable } = require('../utils/database/migrations');

async function setupInitialData() {
  try {
    console.log('Setting up initial data...');
    
    // Initialize database first
    await initDb();
    
    // Create database tables
    await createTables();
    
    // Run migrations
    await addTimestampsToCards();
    await updateSystemInfoTable();
    
    // Seed default data
    await seedDefaultData();
    
    console.log('Initial data setup complete');
  } catch (error) {
    console.error('Error setting up initial data:', error);
    throw error;
  }
}

module.exports = setupInitialData;

// Allow running directly
if (require.main === module) {
  setupInitialData().catch(console.error);
}