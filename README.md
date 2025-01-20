# 2025-01-20更新
## 1.修复了登陆界面错误弹窗
## 2.优化了部分界面的翻译
## 3.新增了数据库的导入和导出功能
## 4.优化了后端部分无用的代码
## 5.添加了卡片的禁用下载功能(只有状态已发布的才需允许下载)

# ToolsManager
基于nodejs工具管理系统，前后端分布式管理，并通过docker分阶段部署运行，附带DockerFile和nginx.conf配置
## Node版本：18
## 前后端构建
### npm run build
## 前后端运行
### npm run dev

## docker构建教程
### 1.如果想修改端口就修改nginx.conf文件中的listen和server_name
### 2.通过```docker build -t my-app .```构建容器镜像
