const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

// OpenWeatherMap API 키
const apiKey = '2f8c1752748a6d53ed4217a3e2a6431e';  // OpenWeatherMap에서 발급받은 API 키

// 날씨 정보 가져오기 API 엔드포인트
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'Seoul';  // 기본값은 서울로 설정
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

    try {
        const response = await axios.get(url);
        res.json({
            city: city,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// 기본 API 엔드포인트
app.get('/', (req, res) => {
    res.send('Hello, Weather App Backend!');
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
