# 使用 node:18-alpine 作为基础镜像
FROM node:18-alpine AS nodejs

# 设置工作目录
WORKDIR /app

# 复制后端文件到容器中
COPY backend/ .

# 安装依赖并构建（如果需要）
RUN npm install
# 如果需要构建，取消下面的注释
# RUN npm run build

# 使用 nginx:alpine 作为基础镜像
FROM nginx:alpine

# 从 nodejs 阶段复制后端文件
COPY --from=nodejs /app /app

# 复制前端文件到 Nginx 的默认服务目录
COPY frontend/dist/ /usr/share/nginx/html/

# 复制自定义的 Nginx 配置文件（如果需要）
COPY nginx.conf /etc/nginx/nginx.conf

# 安装 Node.js 运行时
RUN apk add --no-cache nodejs

# 暴露前端端口
EXPOSE 3000
EXPOSE 3030

# 启动 Nginx 和 Node.js 应用
CMD nginx && node /app/src/index.js