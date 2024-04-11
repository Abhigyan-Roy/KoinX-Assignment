const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 3000;
const db = require('./config/mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');
const cryptoController = require('./controllers/cryptoController');
const axios = require('axios');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
    session({
        secret: 'KoinX',
        resave: false,
        saveUninitialized: false,
        store: MongoDbStore.create({
            mongoUrl: 'mongodb+srv://Abhigyan:25052002@cluster0.ekfswbx.mongodb.net/KoinX_db?retryWrites=true&w=majority'
        })
    })
);
app.get('/fetch-and-store-cryptocurrencies', async (req, res) => {
    try {
        cryptoController.scheduleJob();
        res.send('Cryptocurrencies fetched and stored successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching and storing cryptocurrencies.');
    }
});
app.get('/get-price', async (req, res) => {
    const { fromCurrency, toCurrency, date } = req.body;
    const apiKey = 'CG-moSmYjszrcr3S5aEjX4VymTt'; // replace with your actual API key
    const config = {
        headers: {
            'x_cg_pro_api_key': apiKey
        }
    };
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}`, config);
    console.log(response);
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
