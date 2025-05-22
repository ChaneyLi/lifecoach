# AI Life Coach 项目

## 项目概述
这是一个基于火山方舟DeepSeek R1 API的AI生活教练网站，通过对话为用户提供成长建议。

## 项目结构

### 后端 (server.js)
- 使用Express框架搭建服务器
- 处理与火山方舟API的通信
- 解决CORS问题
- 提供`/api/chat`接口处理前端请求

### 前端 (public/index.html)
- 简洁的聊天界面
- 用户消息显示在右侧(蓝色)
- AI回复显示在左侧(灰色)
- 响应式设计，适配不同设备

## 使用说明
1. 安装依赖：`npm install express cors axios`
2. 启动服务器：`node server.js`
3. 打开浏览器访问：`http://localhost:3000`

## 技术栈
- 前端：HTML5, CSS3, JavaScript
- 后端：Node.js, Express
- API：火山方舟DeepSeek R1

## 功能特点
- 实时对话交互
- 简洁美观的界面
- 跨设备兼容
- 错误处理和提示