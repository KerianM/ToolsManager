const { DatabaseError } = require('../utils/errors');

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof DatabaseError) {
    return res.status(500).json({ 
      error: '数据库操作失败' 
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: err.message 
    });
  }

  res.status(500).json({ 
    error: '服务器内部错误' 
  });
};

module.exports = errorHandler;