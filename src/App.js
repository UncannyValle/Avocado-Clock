import React, { useState } from "react";
import "./App.css";
import Parameter from "./components/parameter";
import Timer from "./components/timer";
import StartStop from "./components/startStop";
import { Reset } from "./components/reset";

const App = () => {
  //State
  const [breakie, setBreakie] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState("00");
  const [version, setVersion] = useState("Time Left for Work");

  //buttons increase and decrease on click
  const decreaseBreakie = () => {
    if (breakie > 0) {
      setBreakie(breakie - 1);
    }
  };
  const increaseBreakie = () => {
    if (breakie > 0) {
      setBreakie(breakie + 1);
    }
  };
  const decreaseMinutes = () => {
    if (minutes > 0) {
      setMinutes(minutes - 1);
    }
  };
  const increaseMinutes = () => {
    if (minutes > 0) {
      setMinutes(minutes + 1);
    }
  };
  const resetNow = () => {
    setBreakie(5);
    setMinutes(25);
  };

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
          clickLeft={decreaseBreakie}
          clickRight={increaseBreakie}
        >
          {breakie}
        </Parameter>
        <Parameter
          title="How long are you working for?"
          label="session-label"
          decrement="session-decrement"
          increment="session-increment"
          length="session-length"
          clickLeft={decreaseMinutes}
          clickRight={increaseMinutes}
        >
          {minutes}
        </Parameter>
      </div>
      <Timer vers={version}>
        {minutes}:{seconds}
      </Timer>
      <div id="buttons">
        <StartStop />
        <Reset clickHandler={resetNow} />
      </div>
    </div>
  );
};
export default App;
