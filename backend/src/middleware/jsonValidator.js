const validateJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      error: 'Invalid JSON format. Please check your request body.' 
    });
  }
  next();
};

module.exports = validateJson;