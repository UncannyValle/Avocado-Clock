import React, { useState, useEffect } from "react";
import "./App.css";
import Parameter from "./components/parameter";
import Timer from "./components/timer";
import StartStop from "./components/startStop";
import { Reset } from "./components/reset";
import useSound from "use-sound";
import ding from "./ding_mixdown.mp3";

const App = () => {
  //State
  const [breakie, setBreakie] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [session, setSession] = useState(25);
  const [timer, setTimer] = useState("25:00");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("Get To Work!");
  const [moment, setMoment] = useState("start");

  const timerButton = () => {
    !running ? setRunning(true) : setMessage("Paused!");

    if (moment === "start" && session >= 10) {
      setMinutes(session);
      setMoment("work");
    } 
    if (moment === "start" && session < 10) {
      setMinutes(session);
      setMoment("work");
      setTimer("0" + minutes + ":0" + seconds);
    } 
    if (message === "Paused!" && moment === "work" && running) {
      setMessage("Get To Work!");
    } 
    if (message === "Paused!" && moment === "play" && running) {
      setMessage("Chill for a bit");
    }
  };

  const [alarm] = useSound(ding, { volume: 0.25 });
  useEffect(() => {
    if (running === false) {
      setSeconds(0);
      setMinutes(0);
      setMessage("Get To Work!");
      setTimer("25:00");
    } else if (running && message !== "Paused!" && seconds >= 10) {
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
    } else if (
      running &&
      message !== "Paused!" &&
      seconds >= 0 &&
      seconds < 10
    ) {
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
    } else if (minutes === 0 && seconds === 5 && running) {
      alarm();
    } else if (minutes > 10 && seconds === -1 && running) {
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
      moment === "work" &&
      running
    ) {
      setMinutes(breakie - 1);
      setSeconds(59);
      setMessage("Chill for a bit");
      setMoment("play");
      alert("ding! Take a break!");
    } else if (
      minutes === 0 &&
      seconds === -1 &&
      moment === "play" &&
      running
    ) {
      setMinutes(session - 1);
      setSeconds(59);
      setMoment("work");
      setMessage("Get To Work!");
      alert("Get ready to work...");
    }

    if (minutes === 0 && seconds === 3 && running) {
      alarm();
    }
  }, [minutes, seconds, running, breakie, session, moment, message, alarm]);

  const decreaseBreakie = () => {
    if (breakie > 1) {
      if (!running) {
        setBreakie(breakie - 1);
      }
    }
  };
  const increaseBreakie = () => {
    if (breakie < 60) {
      if (!running) {
        setBreakie(breakie + 1);
      }
    }
  };
  const decreaseSession = () => {
    if (session > 1) {
      if (!running) {
        setSession(session - 1);
      }
    }
  };
  const increaseSession = () => {
    if (session < 60) {
      if (!running) {
        setSession(session + 1);
      }
    }
  };
  const resetNow = () => {
    setRunning(false);
    setMoment("start");
    setBreakie(5);
    setSession(25);
  };

  return (
    <div id="main-wrapper">
      <div className="header">
        <h1 id="title">The Avocado Clock</h1>
        <p>
          A more delicious task clock! Set how long your break should be and how
          long you should work! <br /> Once set you can't go back unless you
          reset. Commit to your time and let's get productive!
        </p>{" "}
      </div>

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
        <div className="timer-wrapper">
          <h1 id="timer-label">{message} </h1>
          <Timer>{timer}</Timer>
          <div className="buttons">
            <StartStop clickHandler={timerButton} />
            <Reset clickHandler={resetNow} />
          </div>
        </div>
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
    </div>
  );
};
export default App;
