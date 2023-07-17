import React, { useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import DemoApp from "./calendar.jsx"
import "./CalendarStyles.css"
import html2canvas from 'html2canvas';
function convertToMilitaryTime(timeString) {
  let timeArray = timeString.split(':');
  let hours = parseInt(timeArray[0]);
  let minutes = parseInt(timeArray[1].substring(0, 2));
  let isPM = timeArray[1].substring(2).toUpperCase() === 'PM';
  
  if (isPM && hours !== 12) {
    hours += 12;
  } else if (!isPM && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
}

function Schedules() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || '';
  const letterToNumberMap = new Map();
  letterToNumberMap.set('U', '05');
  letterToNumberMap.set('M', '06');
  letterToNumberMap.set('T', '07');
  letterToNumberMap.set('W', '08');
  letterToNumberMap.set('R', '09');
  letterToNumberMap.set('F', '10');
  letterToNumberMap.set('S', '11');
  
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(0);
  const events = [];
  Object.entries(data).map(([title, timeBlocks]) => {
    let schedule = [];
    timeBlocks.map(([text, times,]) => {
      times.map(([startTime, endTime, dayOfWeek]) => {
        const newEvent = {
          id: parseInt(text),
          title: text,
          start: `2023-03-${letterToNumberMap.get(dayOfWeek)}T${convertToMilitaryTime(startTime)}`,
          end: `2023-03-${letterToNumberMap.get(dayOfWeek)}T${convertToMilitaryTime(endTime)}`,
        };
        schedule.push(newEvent);
      });
    });
    events.push(schedule);
  });
  console.log("kek", events)
  function handleGoBack() {
    navigate(-1);
  }
  function handleExportSchedule() {
    const element = document.querySelector(".demo-app-main");
    const scale = 2; // 2x zoom
    html2canvas(element, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "schedule.png";
      link.href = imgData;
      link.click();
    });
  }
  
  
  return (
    <div>
      <h1>Schedules:</h1>
      <button onClick={handleGoBack} 
      style={{
        backgroundColor: "#333333",
      }}>
        Go Back</button>
      <div style={{marginBottom: '10px'}}>
      <select
        value={selectedScheduleIndex}
        onChange={(event) => setSelectedScheduleIndex(parseInt(event.target.value))}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          //backgroundImage: "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath fill=%22%23aaa%22 d=%22M1 2l3 3 3-3H1z%22/%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.7em top 50%",
          backgroundSize: "0.65em auto",
          marginTop: '10px',
          backgroundColor: "#333333",
        }}
      >
        {events.map((schedule, index) => (
          <option key={index} value={index}>{`Schedule ${index + 1}`}</option>
        ))}
      </select>
        <DemoApp key={selectedScheduleIndex} startDate="2023-03-05" events={events[selectedScheduleIndex]}/>
      </div>
      <button onClick={handleExportSchedule} 
        style={{
          backgroundColor: "#333333",
          color: "#ffffff",
          padding: "8px",
          borderRadius: "8px",
          fontSize: "16px",
          marginTop: "10px",
        }}>
          Export Schedule as Image
        </button>

    </div>
  );
}

export default Schedules;
