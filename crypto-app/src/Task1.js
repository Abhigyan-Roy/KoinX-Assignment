import React from 'react';
import axios from 'axios';

function Task1() {
  const fetchAndStoreCryptocurrencies = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/fetch-and-store-cryptocurrencies`);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Fetch and Store Cryptocurrencies</h1>
      <button onClick={fetchAndStoreCryptocurrencies}>Fetch and Store</button>
    </div>
  );
}

export default Task1;
