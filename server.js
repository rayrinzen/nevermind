const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 📥 Принимаем все данные с клиента
app.post('/track', (req, res) => {
  const d = req.body;

  console.log(`
📦 Новые данные от пользователя:
----------------------------------------
🌍 IP: ${d.ip}
📍 Город: ${d.city}, ${d.region}, ${d.country}
🛰️ Провайдер: ${d.org}
📌 Координаты: ${d.loc}
🕓 Часовой пояс: ${d.timezone} (offset: ${d.timezoneOffset})

🧠 Устройство:
  📱 Тип: ${d.device}
  💻 Платформа: ${d.platform}
  🔧 Архитектура: ${d.architecture}
  🧩 User-Agent: ${d.userAgent}
  📦 UA Brands: ${d.brands}
  📏 Экран: ${d.screen}
  🌐 Язык: ${d.language}
  👆 Сенсор: ${d.touchSupport ? 'Да' : 'Нет'}
  💾 Память: ${d.memory}
  🔌 Онлайн: ${d.online}

📶 Сеть:
  Тип: ${d.network}
  Скорость: ${d.downlink}

🔋 Батарея:
  Уровень: ${d.battery}
  Зарядка: ${d.charging}
----------------------------------------
  `);

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
