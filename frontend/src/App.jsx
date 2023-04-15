import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [num1, setNum1] = useState('');
  const [result, setResult] = useState('');

  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { num1 };
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
          <input type="text" value={num1} onChange={handleNum1Change} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  )
}

export default App
