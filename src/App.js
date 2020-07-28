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
  const [session, setSession] = useState(25);
  const [timer, setTimer] = useState("START");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [moment, setMoment] = useState("Get To Work!");

  const timerButton = () => {
    running ? setRunning(false) : setRunning(true);
    if (timer === "START" && session >= 10) {
      setMinutes(session);
    } else if (timer === "START" && session < 10) {
      setMinutes(session);
      setTimer("0" + minutes + ":0" + seconds);
    }
  };

  useEffect(() => {
    if (minutes > 10 && seconds === -1 && running) {
      setSeconds(59);
      setMinutes(minutes - 1);
      setTimer(minutes + ":00");
    } else if (minutes <= 10 && minutes > 0 && seconds === -1 && running) {
      // let min = minutes - 1;
      setSeconds(59);
      setMinutes(minutes - 1);
      setTimer("0" + minutes + ":00");
      console.log(moment, minutes);
    } else if (
      minutes === 0 &&
      seconds === -1 &&
      moment === "Get To Work!" &&
      running
    ) {
      console.log("ding");
      setMinutes(breakie - 1);
      setSeconds(59);
      setMoment("Chill for a bit");
    } else if (
      minutes === 0 &&
      seconds === -1 &&
      moment === "Chill for a bit" &&
      running
    ) {
      setMinutes(session - 1);
      setSeconds(59);
      setMoment("Get To Work!");
    } else if (running && seconds >= 10) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        setTimer(() => {
          if (minutes >= 10) {
            return minutes + ":" + seconds;
          } else {
            return "0" + minutes + ":" + seconds;
          }
        });
      }, 1000);
    } else if (running && seconds >= 0 && seconds < 10) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        setTimer(() => {
          if (minutes >= 10) {
            return minutes + ":0" + seconds;
          } else {
            return "0" + minutes + ":0" + seconds;
          }
        });
      }, 1000);
    }
  }, [minutes, seconds, running, breakie, session, moment]);

  const decreaseBreakie = () => {
    if (breakie > 1) {
      setBreakie(breakie - 1);
    }
  };
  const increaseBreakie = () => {
    if (breakie < 60) {
      setBreakie(breakie + 1);
    }
  };
  const decreaseSession = () => {
    if (session > 1) {
      setSession(session - 1);
    }
  };
  const increaseSession = () => {
    if (minutes < 60) {
      setSession(session + 1);
    }
  };
  const resetNow = () => {
    setRunning(false);
    setBreakie(5);
    setMinutes(25);
    setSeconds(0);
    setTimer("START");
    setSession(25);
  };

  return (
    <div id="main-wrapper">
      <h1 id="title">Avocado Clock</h1>
      <p>
        A more delicious task clock! Set how long your break should be and how
        long you should work!
      </p>{" "}
      <hr />
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
      <h1 id="timer-label">{moment} </h1>
      <Timer>{timer}</Timer>
      <div id="buttons">
        <StartStop clickHandler={timerButton} />
        <Reset clickHandler={resetNow} />
      </div>
    </div>
  );
};
export default App;
