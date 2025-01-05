import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [conversionRate, setConversionRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      setConversionRate(response.data.rates.BRL);
    };

    fetchConversionRate();
  }, [fromCurrency]);

  const handleConvert = () => {
    if (amount && conversionRate) {
      setResult((amount * conversionRate).toFixed(2));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Conversor de Moeda</h1>
      <div className="form-group">
        <label>Valor:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Moeda:</label>
        <select
          className="form-control"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="mt-3">
        <p>Taxa de câmbio atual: 1 {fromCurrency} = {conversionRate} BRL</p>
      </div>
      <button className="btn btn-primary" onClick={handleConvert}>
        Converter
      </button>
      {result && (
        <div className="mt-3">
          <h3>Resultado: R$ {result}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
