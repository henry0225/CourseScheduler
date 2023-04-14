import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  }

  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { num1, num2 };
    fetch('http://127.0.0.1:6969/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => setResult(data.result))
      .catch(error => console.error(error))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'block' }}>
        <label style={{ display: 'block' }}>
          Number 1:
          <input type="number" value={num1} onChange={handleNum1Change} />
        </label>
        <label style={{ display: 'block' }}>
          Number 2:
          <input type="number" value={num2} onChange={handleNum2Change} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  )
}

export default App
