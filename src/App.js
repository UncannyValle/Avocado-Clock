import React, { useState } from "react";
import "./App.css";
import Parameter from "./components/parameter";
import Timer from "./components/timer";

const App = () => {
  //State
  const [breakie, setBreakie] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [seconds,setSeconds] = useState("00");
  const [version, setVersion] = useState('Time Left to Work')

  return (
    <div id="main-wrapper">
      <h1 id="title">Avocado Clock</h1>
      <p>
        A more delicious task clock! wet how long your break should be and how
        long you should work!
      </p>{" "}
      <hr />
      <h2> Be more productive!</h2>
      <div id="times">
        <Parameter
          title="How long is your break?"
          label="break-label"
          decrement="break-decrement"
          increment="break-increment"
          length="break-length"
        >
          {breakie}
        </Parameter>
        <Parameter
          title="How long are you working for?"
          label="session-label"
          decrement="session-decrement"
          increment="session-increment"
          length="session-length"
        >
          {minutes}
        </Parameter>
      </div>
      <Timer vers={version}>
        {minutes}:{seconds}
      </Timer>
    </div>
  );
};
export default App;
