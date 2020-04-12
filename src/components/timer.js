import React from "react";

const Timer = (props) => (
  <div id="timer">
    <h1 id="timer-label">{props.vers}</h1>
    <div id="time-left">
      {props.children}
    </div>
  </div>
);
export default Timer;
