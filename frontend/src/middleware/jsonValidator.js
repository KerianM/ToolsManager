const validateJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      error: 'JSON格式无效，请检查请求内容' 
    });
  }
  next();
};

module.exports = validateJson;