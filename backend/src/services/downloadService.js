const { run, get } = require('../config/database');

class DownloadService {
  async checkDownloadEligibility(userId) {
    const user = await get(
      'SELECT allow_download, current_downloads, max_daily_downloads FROM users WHERE id = ?', 
      [userId]
    );
    
    if (!user) {
      throw new Error('User not found');
    }

    return {
      canDownload: user.allow_download === 1 && user.current_downloads < user.max_daily_downloads,
      remainingDownloads: user.max_daily_downloads - user.current_downloads,
      maxDailyDownloads: user.max_daily_downloads,
      currentDownloads: user.current_downloads
    };
  }

  async decreaseDownloadCount(userId) {
    const user = await get(
      'SELECT current_downloads, max_daily_downloads FROM users WHERE id = ?', 
      [userId]
    );
    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.current_downloads >= user.max_daily_downloads) {
      throw new Error('Daily download limit reached');
    }

    await run(
      'UPDATE users SET current_downloads = current_downloads + 1 WHERE id = ?',
      [userId]
    );

    return {
      remainingDownloads: user.max_daily_downloads - (user.current_downloads + 1)
    };
  }

  async resetAllDownloadCounts() {
    await run('UPDATE users SET current_downloads = 0 WHERE status = 1');
  }
}

module.exports = new DownloadService();