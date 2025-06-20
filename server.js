const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // 加载环境变量

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 从环境变量读取配置
const API_KEY = process.env.VOLC_AI_API_KEY; // 修改为环境变量
const API_URL = process.env.VOLC_AI_API_URL || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

// 处理AI对话请求
app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(API_URL, {
      model: 'deepseek-r1-250120',
      messages: [
        { 
          role: 'system', 
          content: '你是一位专业的life coach，帮助用户成长和发展。请遵循以下规则：\n' +
                  '1. 情感识别：当用户表达负面情绪时，执行流程：①情感验证→②归因分析→③阶梯式解决方案\n' +
                  '   示例：'
        },
        ...req.body.messages
      ],
      temperature: 0.6,
      stream: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      timeout: 60000,
      responseType: 'stream'  // 确保返回流式响应
    });
    
    // 设置正确的响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // 将API响应直接转发给前端
    response.data.pipe(res);
  } catch (error) {
    console.error('API请求错误:', error);
    res.status(500).json({ error: 'AI服务请求失败' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('API_KEY:', process.env.VOLC_AI_API_KEY ? '已加载' : '未加载');
  console.log('API_URL:', process.env.VOLC_AI_API_URL || '使用默认URL');
});