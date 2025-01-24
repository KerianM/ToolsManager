# ToolsManager
基于nodejs工具管理系统，前后端分布式管理，并通过docker分阶段部署运行，附带DockerFile和nginx.conf配置
## Node版本：18
## nodejs添加依赖包
### npm install
## 前端构建
### npm run build
## 前后端运行(需要修改前端url)
### npm run dev

## docker构建教程
### 1.如果想修改端口就修改nginx.conf文件中的listen和server_name
### 2.通过```docker build -t my-app .```构建容器镜像

## 如果你不想自己构建镜像，可以前往Tag下载本地镜像自行导入。
