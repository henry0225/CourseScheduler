import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const [courseList, setCourseList] = useState('');
  const [courseArr, setCourseArr] = useState([])
  const [subjectCode, setSubjectCode] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [earliestTime, setEarliestTime] = useState('');
  const [latestTime, setLatestTime] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { courseList: courseList, earliest: earliestTime, latest: latestTime };
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
        navigate("/Schedules", { state: data.result });
      })
      .catch(error => console.error(error))
  }

  const handleReset = () => {
    setCourseList('');
    setCourseArr([])
  }

  const handleAddCourse = (event) => {
    event.preventDefault();
    const course = `${subjectCode} ${courseNumber}`;
    if (courseList == [])
      setCourseList(`${course}`)
    else
      setCourseList(`${courseList}` + ',' + `${course}`);
    setCourseArr([...courseArr, course]);
    console.log(courseList)
    setSubjectCode('');
    setCourseNumber('');
  }


  return (
    <div className="parent">
      <h1 className= "title">Rice University Course Scheduler</h1>
      <div className="input-container-box">
        <form onSubmit={handleSubmit} style={{ display: 'block' }}>
            <label style={{ display: 'block' }}>
              Subject Code: 
              <input type="text" style={{marginLeft: '10px'}} placeholder="ex: COMP" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} />
            </label>
            <label style={{ display: 'block' }}>
              Course Number:
              <input type="text" style={{marginLeft: '10px'}} placeholder="ex: 140" value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} />
            </label>
            <label style={{ display: 'block' }}>
             Earliest Start Time:
              <input type="text" style={{marginLeft: '10px'}} placeholder="ex: 9:00AM" value={earliestTime} onChange={(e) => setEarliestTime(e.target.value)} />
            </label>
            <label style={{ display: 'block' }}>
             Latest End Time:
              <input type="text" style={{marginLeft: '10px'}} placeholder="ex: 5:00PM" value={latestTime} onChange={(e) => setLatestTime(e.target.value)} />
            </label>
            <button type="submit" style={{ background: 'blue', color: 'white', marginRight: '10px' }}>Submit</button>
            <button type="button" style={{ background: 'grey', color: 'white', marginLeft: '10px', marginRight: '10px' }} onClick={handleAddCourse}>Add Course</button>
            <button type="button" style={{ background: 'red', color: 'white', marginLeft: '10px' }} onClick={handleReset}>Reset</button>
        </form>
      </div>
      <div className="course-box">
        <label style={{ display: 'block' }}>
          Current courses
          <ul>
            {courseArr.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </label>
      </div>
    </div>
  );
}

export default Home;
