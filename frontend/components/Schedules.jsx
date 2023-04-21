import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
function Schedules() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || '';
  console.log("hello : ", data)

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div>
      <h1>Data: {data}</h1>
        
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
  }

export default Schedules