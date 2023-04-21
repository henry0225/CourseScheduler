import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
function Home() {
    const [courseList, setCourseList] = useState('');
    const [result, setResult] = useState('');
    const navigate = useNavigate();

    
    function temp(){
      console.log("result: ", result)
      navigate("/Schedules", { state: courseList});
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = { courseList: courseList};
      
      fetch('http://127.0.0.1:6969/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          setResult(data.result);
          navigate("/Schedules", { state: data.result});
        })
        .catch(error => console.error(error))
        console.log("result: ", result)
        
    }
    return (
      <div>
        <h1>Rice University Course Scheduler</h1>
        <form onSubmit={handleSubmit} style={{ display: 'block' }}>
          <label style={{ display: 'block' }}>
            Courses (ex: COMP 140,COMP 182,COMP 215):
            <input type="text" value={courseList} onChange={(e) => setCourseList(e.target.value)} />
          </label>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default Home
  