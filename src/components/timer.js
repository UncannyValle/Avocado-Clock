import React from "react";

const Timer = (props) => (
  <div id="timer">
    <div id="time-left">
      {props.children}
    </div>
  </div>
);
export default Timer;
