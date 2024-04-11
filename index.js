const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 4000;
const db = require('./config/mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');
const cryptoController = require('./controllers/cryptoController');
const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));
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
app.get('/', (req, res) => {
    res.send('Welcome to the Crypto App!');
});

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
    const { fromCurrency, toCurrency, date } = req.query;
    console.log(fromCurrency)
    const apiKey = 'CG-moSmYjszrcr3S5aEjX4VymTt';
    const config = {
        headers: {
            'x_cg_pro_api_key': apiKey
        }
    };
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}`, config);
    const priceInUsd = response.data.market_data.current_price.usd;
    const responseTo = await axios.get(`https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}`, config);
    const priceInUsdTo = responseTo.data.market_data.current_price.usd;
    const price = priceInUsd / priceInUsdTo;
    res.json({ price });
});
app.get('/companies-holding-coin', async (req, res) => {
    const { currency } = req.query;
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('An error occurred while fetching the list of companies.');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
