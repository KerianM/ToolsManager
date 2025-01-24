const { CardValidationError } = require('../errors');

const validateCardInput = (cardData, isUpdate = false) => {
  if (!cardData || typeof cardData !== 'object') {
    return '无效的卡片数据';
  }

  const { name, description, category_id, download_url, preview_url, markdown_content } = cardData;

  if (!isUpdate) {
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return '卡片名称至少需要2个字符';
    }

    if (!category_id || !Number.isInteger(Number(category_id)) || Number(category_id) < 1) {
      return '请选择有效的分类';
    }
  } else if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      return '卡片名称至少需要2个字符';
    }
  }

  if (description !== undefined && typeof description !== 'string') {
    return '描述必须是字符串';
  }

  if (download_url !== undefined && typeof download_url !== 'string') {
    return '下载链接必须是字符串';
  }

  if (preview_url !== undefined && typeof preview_url !== 'string') {
    return '预览链接必须是字符串';
  }

  if (markdown_content !== undefined && typeof markdown_content !== 'string') {
    return 'Markdown内容必须是字符串';
  }

  return null;
};

module.exports = {
  validateCardInput
};