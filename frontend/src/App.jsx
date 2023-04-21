import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import './App.css'
import Home from '../components/Home'
import Schedules from '../components/Schedules'
function App() {
  
  return (
    <Router>
       <main>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Schedules" element={<Schedules/>} />
        </Routes>
      </main>
    </Router>
    
  );
}

export default App
