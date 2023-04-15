import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [result, setResult] = useState('');

  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  }

  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  }
  const handleNum3Change = (event) => {
    setNum3(event.target.value);
  }
  const handleNum4Change = (event) => {
    setNum4(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { num1, num2, num3, num4 };
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
          Courses (ex: COMP 140,COMP 182,COMP 215):
          <input type="text" value={num1} onChange={handleNum1Change} />
        </label>
        <label style={{ display: 'block' }}>
          Custom Time Blocks Name:
          <input type="text" value={num2} onChange={handleNum2Change} />
        </label>
        <label style={{ display: 'block' }}>
          Custom Time Block Start Time:
          <input type="text" value={num3} onChange={handleNum3Change} />
        </label>
        <label style={{ display: 'block' }}>
          Custom Time Block End Time:
          <input type="text" value={num4} onChange={handleNum4Change} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && (
  <div>
    <p>Result:</p>
    {result.map((innerList, index) => (
      <ul key={index}>
        {innerList.map((item, innerIndex) => (
          <li key={innerIndex}>{item}</li>
        ))}
      </ul>
    ))}
  </div>
)}
    </div>
  )
}

export default App
