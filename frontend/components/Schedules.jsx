import React, { useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import DemoApp from "./calendar.jsx"
import "./CalendarStyles.css"
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
  letterToNumberMap.set('U', '12');
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

  return (
    <div>
      <h1>Schedules:</h1>
      <button onClick={handleGoBack}>Go Back</button>
      <div>
        <select value={selectedScheduleIndex} onChange={(event) => setSelectedScheduleIndex(parseInt(event.target.value))}>
          {events.map((schedule, index) => (
            <option key={index} value={index}>{`Schedule ${index + 1}`}</option>
          ))}
        </select>
        <DemoApp key={selectedScheduleIndex} startDate="2023-03-05" events={events[selectedScheduleIndex]}/>
      </div>
    </div>
  );
}

export default Schedules;
