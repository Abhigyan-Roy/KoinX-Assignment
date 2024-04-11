import React, { useState } from 'react';
import axios from 'axios';

function Task3() {
    const [currency, setCurrency] = useState('bitcoin');
    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/companies-holding-coin?currency=${currency}`);
            setCompanies(response.data.companies);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="App">
            <h1>Companies Holding Cryptocurrency</h1>
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
            </select>
            <button onClick={fetchCompanies}>Fetch Companies</button>
            {companies.map((company, index) => (
                <div key={index}>
                    <span>Company Name - {company.name} , </span>
                    <span>Total Holdings - {company.total_holdings}</span>
                </div>
            ))}
        </div>
    );
}

export default Task3;
