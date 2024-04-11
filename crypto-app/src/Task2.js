import React, { useState } from 'react';
import axios from 'axios';

function Task2() {
    const [fromCurrency, setFromCurrency] = useState('bitcoin');
    const [toCurrency, setToCurrency] = useState('ethereum');
    const [date, setDate] = useState('01-01-2022');
    const [price, setPrice] = useState(null);

    const fetchPrice = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/get-price?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&date=${date}`);
            setPrice(response.data.price);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <h1>Get Price of Cryptocurrency</h1>
            <input value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} placeholder="From Currency" />
            <input value={toCurrency} onChange={e => setToCurrency(e.target.value)} placeholder="To Currency" />
            <input value={date} onChange={e => setDate(e.target.value)} placeholder="Date (dd-mm-yyyy)" />
            <button onClick={fetchPrice}>Fetch Price</button>
            {price && (
                <div>
                    <h2>1 {fromCurrency} equals: {price} {toCurrency}</h2>
                </div>
            )}
        </div>
    );
}

export default Task2;
