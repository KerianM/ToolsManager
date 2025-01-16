const express = require('express');
const cors = require('cors');
const { initDb } = require('./config/database');
const validateJson = require('./middleware/jsonValidator');
const errorHandler = require('./middleware/errorHandler');
const setupInitialData = require('./scripts/setupInitialData');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDb();
    await setupInitialData();

    const authRoutes = require('./routes/auth');
    const userRoutes = require('./routes/users');
    const categoryRoutes = require('./routes/categories');
    const cardRoutes = require('./routes/cards');
    const downloadRoutes = require('./routes/downloads');
    const systemRoutes = require('./routes/system');

    // 配置 CORS，允许所有来源
    app.use(cors({
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // 增加请求体大小限制
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(validateJson);

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/cards', cardRoutes);
    app.use('/api/downloads', downloadRoutes);
    app.use('/api', systemRoutes);

    // Error handling
    app.use(errorHandler);

    // 监听所有网络接口
    const server = app.listen(PORT, '0.0.0.0', () => {
      const host = server.address().address;
      const port = server.address().port;
      logger.info(`Server is running at http://${host}:${port}`);
      logger.info('To access from other devices in LAN:');
      logger.info(`1. Make sure port ${port} is allowed in firewall`);
      logger.info(`2. Use http://<server-ip>:${port}`);
    });

    // 增加错误处理
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use`);
      } else {
        logger.error('Server error:', error);
      }
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
