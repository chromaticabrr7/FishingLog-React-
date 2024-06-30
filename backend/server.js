const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logRoutes = require('./routes/logs');
const axios = require('axios');

// creating express app
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Log endpoints via express routes
app.use('/api/logs', logRoutes);

// Endpoint to load environment variables
app.get('/api/config', (req, res) => {
    res.json({
        openWeatherApiKey: process.env.OPENWEATHER_API_KEY
    });
});

// connecting to Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB...');
    // listening for requests
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${port}...`);
    });
})
.catch(err => console.error('Could not connect to MongoDB...', err));

// Endpoint to handle weather data request from frontend
app.get('/api/fetch-data', async (req, res) => {
    const {latitude, longitude} = req.query;

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const thirdPartyUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

        const response = await axios.get(thirdPartyUrl);
        const data = response.data;

        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
