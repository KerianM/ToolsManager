const systemRepository = require('../repositories/systemRepository');
const { totalmem, freemem } = require('os');
const { validateSystemInfo } = require('../utils/validators/systemValidator');

class SystemService {
  async getSystemInfo() {
    const info = await systemRepository.getSystemInfo();
    return info || { 
      title: 'Card Management System',
      announcement: 'Welcome!',
      website_title: '卡片管理系统',
      logo_url: '',
      background_url: ''
    };
  }

  async updateSystemInfo(data) {
    const validationError = validateSystemInfo(data);
    if (validationError) {
      throw new Error(validationError);
    }
    
    return await systemRepository.updateSystemInfo(data);
  }

  async getSystemStats() {
    const dbStats = await systemRepository.getStats();
    const memoryStats = this.getMemoryStats();
    
    return {
      uptime: Math.floor(process.uptime()),
      memory: memoryStats,
      database: dbStats
    };
  }

  getMemoryStats() {
    const total = Math.floor(totalmem() / 1024 / 1024);
    const free = Math.floor(freemem() / 1024 / 1024);
    const used = total - free;
    const percentage = Math.round((used / total) * 100);

    return {
      total,
      used,
      free,
      percentage
    };
  }
}

module.exports = new SystemService();