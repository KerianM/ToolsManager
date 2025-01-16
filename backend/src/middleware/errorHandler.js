const { DatabaseError } = require('../utils/errors');

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof DatabaseError) {
    return res.status(500).json({ 
      error: 'Database operation failed' 
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: err.message 
    });
  }

  res.status(500).json({ 
    error: 'Internal server error' 
  });
};

module.exports = errorHandler;