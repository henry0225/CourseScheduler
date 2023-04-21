import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import WeeklyCalendar from "./calendar.jsx"
function Schedules() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || '';
  console.log("hello : ", data)
  const blocks = [
    "Block 1, 10:00AM W - 11:30AM W",
    "Block 2, 2:00PM F - 4:00PM F",
    "Block 3, 9:30AM T - 10:30AM T",
    // Add more blocks as needed
  ]
  function handleGoBack() {
    navigate(-1);
  }

  return (
  
    <div>
      <h1>Data:</h1>
      <ul>
        {data.map((list, index) => (
          <li key={index}>
            <ul>
              {list.map((item, subIndex) => (
                <li key={subIndex}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleGoBack}>Go Back</button>
      <div>
      <WeeklyCalendar blocks={blocks} />
      </div>
    </div>
  );
  }

export default Schedules