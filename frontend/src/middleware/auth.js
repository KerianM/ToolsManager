const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: '请先登录' });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.is_admin) {
      next();
    } else {
      res.status(403).json({ error: '需要管理员权限' });
    }
  });
};

module.exports = { auth, adminAuth };