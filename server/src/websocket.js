const { WebSocketServer } = require('ws');
const axios = require('axios');
require('dotenv').config();

let lastRequestTime = 0;
const requestInterval = 5000; // Ограничение на 1 запрос в 5 секунд

const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      const currentTime = Date.now();
      if (currentTime - lastRequestTime < requestInterval) {
        ws.send('Слишком много запросов, подождите немного.');
        return;
      }
      lastRequestTime = currentTime;

      const userMessage = message.toString();

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'Ты — юридический помощник на сайте, специализирующийся на уголовных делах. Твоя задача — давать краткие и точные ответы на вопросы пользователей, связанные с уголовным правом. Пожалуйста, используй профессиональные юридические термины, но объясняй их понятным языком. Избегай любых тем, не связанных с уголовным правом, и не давай советы, требующие детальной юридической консультации. Если пишут что задержали, то проси написать в чат какая статья, а также в каком отделе полиции находится человек после этого рекомендуй не общаться с полицией пока не приедет адвокат' },
              { role: 'user', content: userMessage }
            ],
            max_tokens: 190, 
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        ws.send(response.data.choices[0].message.content.trim());
      } catch (error) {
        console.error('Error with OpenAI API:', error.response?.data || error.message);
        ws.send('Произошла ошибка при обработке вашего запроса.');
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server is running!');
};

module.exports = createWebSocketServer;
