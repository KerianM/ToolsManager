const validateSystemInfo = (data) => {
  if (!data || typeof data !== 'object') {
    return '无效的系统信息数据';
  }

  const { title, announcement, website_title, logo_url, background_url } = data;

  if (title !== undefined && (typeof title !== 'string' || title.trim().length < 1)) {
    return '标题不能为空';
  }

  if (announcement !== undefined && typeof announcement !== 'string') {
    return '公告必须是字符串';
  }

  if (website_title !== undefined && (typeof website_title !== 'string' || website_title.trim().length < 1)) {
    return '网站标题不能为空';
  }

  if (logo_url !== undefined && typeof logo_url !== 'string') {
    return 'Logo URL必须是字符串';
  }

  if (background_url !== undefined && typeof background_url !== 'string') {
    return '背景图片URL必须是字符串';
  }

  return null;
};

module.exports = {
  validateSystemInfo
};