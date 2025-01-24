# 卡片管理系统 API 文档

## 目录

1. [通用说明](#通用说明)
2. [认证接口](#认证接口)
3. [卡片管理](#卡片管理)
4. [分类管理](#分类管理)
5. [下载管理](#下载管理)
6. [系统信息](#系统信息)
7. [用户管理](#用户管理)
8. [错误处理](#错误处理)

## 通用说明

### 基础URL
```
http://localhost:3000/api
```

### 认证方式
除了登录接口外，所有请求都需要在header中携带token：
```
Authorization: Bearer <token>
```

### 响应格式
所有响应都使用JSON格式，状态码遵循HTTP标准。

## 认证接口

### 登录
```http
POST /auth/login
```

**请求体:**
```json
{
  "username": "string",
  "password": "string"
}
```

**成功响应:** `200 OK`
```json
{
  "token": "string"
}
```

## 卡片管理

### 获取所有卡片
```http
GET /cards
```

**成功响应:** `200 OK`
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "category_id": "number",
    "creator_name": "string",
    "status": "number",
    "download_url": "string",
    "preview_url": "string",
    "markdown_content": "string",
    "category_name": "string"
  }
]
```

### 获取单个卡片
```http
GET /cards/:id
```

**成功响应:** `200 OK`
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "category_id": "number",
  "creator_name": "string",
  "status": "number",
  "download_url": "string",
  "preview_url": "string",
  "markdown_content": "string",
  "category_name": "string"
}
```

### 创建卡片 (管理员)
```http
POST /cards
```

**请求体:**
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "category_id": "number",
  "download_url": "string",
  "preview_url": "string",
  "markdown_content": "string"
}
```

**成功响应:** `201 Created`

### 更新卡片 (管理员)
```http
PUT /cards/:id
```

**请求体:**
```json
{
  "name": "string",
  "description": "string",
  "category_id": "number",
  "download_url": "string",
  "preview_url": "string",
  "markdown_content": "string"
}
```

**成功响应:** `200 OK`

## 下载管理

### 检查下载资格
```http
GET /downloads/check
```

**成功响应:** `200 OK`
```json
{
  "canDownload": "boolean",
  "remainingDownloads": "number",
  "maxDailyDownloads": "number",
  "currentDownloads": "number"
}
```

### 减少下载次数
```http
POST /downloads/decrease
```

**成功响应:** `200 OK`
```json
{
  "message": "Download count updated",
  "remainingDownloads": "number"
}
```

**错误响应:**
- `403 Forbidden`: 已达到每日下载限制
- `404 Not Found`: 用户不存在

## 系统信息

### 获取系统信息
```http
GET /system-info
```

**成功响应:** `200 OK`
```json
{
  "title": "string",
  "announcement": "string"
}
```

### 更新系统信息 (管理员)
```http
PUT /system-info
```

**请求体:**
```json
{
  "title": "string",
  "announcement": "string"
}
```

### 获取系统统计信息
```http
GET /stats
```

**成功响应:** `200 OK`
```json
{
  "uptime": "number",
  "memory": {
    "total": "number",
    "used": "number",
    "free": "number",
    "percentage": "number"
  },
  "database": {
    "users": {
      "total": "number",
      "active": "number"
    },
    "cards": "number",
    "categories": "number"
  }
}
```

## 错误处理

### 通用错误响应

**401 未授权**
```json
{
  "error": "Please authenticate"
}
```

**403 禁止访问**
```json
{
  "error": "Admin access required"
}
```

**404 未找到**
```json
{
  "error": "Resource not found"
}
```

**400 请求错误**
```json
{
  "error": "Invalid input"
}
```

**500 服务器错误**
```json
{
  "error": "Server error"
}
```

## 数据验证规则

### 卡片验证规则
- `id`: 必填，正整数
- `name`: 字符串，最少2个字符
- `category_id`: 数字，必须大于0且存在
- `description`: 可选，字符串
- `download_url`: 可选，字符串
- `preview_url`: 可选，字符串
- `markdown_content`: 可选，字符串

### 系统信息验证规则
- `title`: 必填，字符串
- `announcement`: 可选，字符串