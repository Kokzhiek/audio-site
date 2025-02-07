const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const audioDir = path.join(__dirname, 'audio');

// Даем доступ к папке с аудиофайлами
app.use('/audio', express.static(audioDir));

// Возвращаем список аудиофайлов
app.get('/audio-list', (req, res) => {
    fs.readdir(audioDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка чтения файлов' });
        }
        res.json(files.filter(file => file.endsWith('.mp3')));
    });
});

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
