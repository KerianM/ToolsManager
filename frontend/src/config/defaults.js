const DEFAULT_CATEGORY = {
  id: 1,
  name: '默认分类',
  is_hidden: 0
};

const DEFAULT_CARD = {
  id: 1,
  name: '示例卡片',
  description: '这是一个示例卡片，展示了卡片的基本功能',
  category_id: 1,
  creator_name: 'system',
  download_url: 'https://example.com/download',
  preview_url: 'https://example.com/preview',
  markdown_content: `# 示例卡片

这是一个示例卡片的详细说明。

## 功能特点

- 基本信息展示
- Markdown格式支持
- 下载链接
- 预览图片`,
  status: 1
};

module.exports = {
  DEFAULT_CATEGORY,
  DEFAULT_CARD
};