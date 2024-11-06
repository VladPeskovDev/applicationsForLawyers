const TelegramBot = require('node-telegram-bot-api');
const bcrypt = require('bcrypt');
const { User } = require('../db/models'); // Подключите вашу модель
const { generateTokens } = require('./utils/generateTokens'); // Подключите функцию генерации токенов

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Нажмите на кнопку, чтобы открыть сайт', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Открыть сайт',
              web_app: {
                url: 'https://c2ab-95-164-12-129.ngrok-free.app',  
              },
            },
          ],
        ],
      },
    });
  });

// Обработка команды для регистрации /signup
bot.onText(/\/signup (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userData = match[1].split(' '); // Ожидаем формат: /signup email username password

  if (userData.length !== 3) {
    return bot.sendMessage(chatId, 'Пожалуйста, введите данные в формате: /signup email username password');
  }

  const [email, username, password] = userData;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { username, password: await bcrypt.hash(password, 10) },
    });

    if (!created) {
      return bot.sendMessage(chatId, 'Пользователь с таким email уже существует.');
    }

    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    bot.sendMessage(chatId, `Вы успешно зарегистрированы!\nAccessToken: ${accessToken}`);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Произошла ошибка на сервере, попробуйте позже.');
  }
});

// Обработка команды для входа /signin
bot.onText(/\/signin (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userData = match[1].split(' '); // Ожидаем формат: /signin email password

  if (userData.length !== 2) {
    return bot.sendMessage(chatId, 'Пожалуйста, введите данные в формате: /signin email password');
  }

  const [email, password] = userData;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return bot.sendMessage(chatId, 'Пользователь с таким email не найден.');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return bot.sendMessage(chatId, 'Неверный пароль.');
    }

    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    bot.sendMessage(chatId, `Вы успешно вошли!\nAccessToken: ${accessToken}`);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Произошла ошибка на сервере, попробуйте позже.');
  }
});
//ngrok http 5173
