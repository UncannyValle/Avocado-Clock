import React from "react";

 const StartStop = (props) => (
  <button className="start-stop" id="start_stop" onClick={props.clickHandler}>
    START/STOP
  </button>
);

export default StartStop;