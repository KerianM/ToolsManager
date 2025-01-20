const express = require('express');
const cors = require('cors');
const { initDb } = require('./config/database');
const validateJson = require('./middleware/jsonValidator');
const errorHandler = require('./middleware/errorHandler');
const setupInitialData = require('./scripts/setupInitialData');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

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
    const databaseRoutes = require('./routes/database'); // 新增数据库路由

    app.use(cors({
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    
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
    app.use('/api/database', databaseRoutes); // 新增数据库路由

    app.use(errorHandler);

    const server = app.listen(PORT, '0.0.0.0', () => {
      const host = server.address().address;
      const port = server.address().port;
      logger.info(`服务器运行在 http://${host}:${port}`);
      logger.info('要从局域网访问:');
      logger.info(`1. 确保防火墙允许端口 ${port}`);
      logger.info(`2. 使用 http://<服务器IP>:${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`端口 ${PORT} 已被占用`);
      } else {
        logger.error('服务器错误:', error);
      }
      process.exit(1);
    });
  } catch (error) {
    logger.error('启动服务器失败:', error);
    process.exit(1);
  }
}

startServer();