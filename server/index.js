

const axios = require('axios');
require('dotenv').config();

// Вставь сюда свой API ключ
const apiKey = process.env.OPENAI_API_KEY;

const makeGptTurboRequest = async () => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'Расскажи интересный факт о космосе.' }
        ],
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Ответ от OpenAI:', response.data.choices[0].message.content.trim());
  } catch (error) {
    console.error('Ошибка с OpenAI API:', error.response?.data || error.message);
  }
};

// Вызов функции для выполнения запроса
makeGptTurboRequest();
