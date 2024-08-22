const { WebSocketServer } = require('ws');
const axios = require('axios');
require('dotenv').config();

const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      const userMessage = message.toString();

      try {
        // Отправляем запрос к OpenAI GPT API
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'text-davinci-003',
            prompt: userMessage,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Отправляем ответ обратно клиенту через WebSocket
        ws.send(response.data.choices[0].text.trim());
      } catch (error) {
        console.error('Error with OpenAI API:', error);
        ws.send('Произошла ошибка при обработке вашего запроса.');
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server is running');
};

module.exports = createWebSocketServer;
