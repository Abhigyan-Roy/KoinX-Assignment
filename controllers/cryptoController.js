const axios = require('axios');
const Crypto = require('../models/Crypto');
const cron = require('node-cron');
exports.fetchCryptocurrencies = async () => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
    console.log(response.data);
    return response.data;
};
exports.storeCryptocurrencies = async (data) => {
    await Crypto.insertMany(data);
};
exports.scheduleJob = async () => {
    cron.schedule('* * * * *', async () => {
        const data = await this.fetchCryptocurrencies();
        await this.storeCryptocurrencies(data);
    });
};