import React, { useState, useEffect } from "react";
import "./App.css";
import Parameter from "./components/parameter";
import Timer from "./components/timer";
import StartStop from "./components/startStop";
import { Reset } from "./components/reset";

const App = () => {
  //State
  const [breakie, setBreakie] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [session, setSession] = useState(minutes);
  const [timer, setTimer] = useState(25 + ":00");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const timerButton = () => {
    running ? setRunning(false) : setRunning(true);
  };

  useEffect(() => {
    if (minutes > 10 && seconds === -1 && running) {
      setSeconds(9);
      setMinutes(minutes - 1);
      setTimer(minutes + ":00");
    } else if (minutes <= 10 && seconds === -1 && running) {
      setSeconds(9);
      setMinutes("0" + (minutes - 1));
    } else if (running && seconds > 10) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        setTimer(minutes + ":" + seconds);
      }, 1000);
    } else if (running && seconds >= 0 && seconds <= 10) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        setTimer( minutes + ":0" + seconds);
      }, 1000);
    }
  }, [minutes, seconds, running]);
  //buttons increase and decrease on click
  const decreaseBreakie = () => {
    if (breakie > 1) {
      setBreakie(breakie - 1);
    }
  };
  const increaseBreakie = () => {
    if (breakie > 1) {
      setBreakie(breakie + 1);
    }
  };
  const decreaseSession = () => {
    if (session > 1) {
      let curr = session - 1;
      setSession(curr);
      setMinutes(curr);
    }
  };
  const increaseSession = () => {
    if (minutes > 1) {
      let curr = session + 1;
      setMinutes(curr);
      setSession(curr);
    }
  };
  const resetNow = () => {
    setRunning(false);
    setBreakie(5);
    setMinutes(25);
    setSeconds(0);
    setTimer(25 + ":00");
    setSession(25);
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
          clickLeft={decreaseSession}
          clickRight={increaseSession}
        >
          {session}
        </Parameter>
      </div>
      <Timer>{timer}</Timer>
      <div id="buttons">
        <StartStop clickHandler={timerButton} />
        <Reset clickHandler={resetNow} />
      </div>
    </div>
  );
};
export default App;
