import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated, config } from "react-spring";

const Parameter = (props) => {
  const show = useSpring({
    opacity: 1,
    // config: config.molasses,
    from: {
      opacity: 0,
    },
  });
  return (
    <animated.div className="parameter" style={show}>
      <h2 id={props.label}> {props.title}</h2>
      <div className="picker">
        <div id={props.decrement} onClick={props.clickLeft}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </div>
        <div id={props.length}>{props.children}</div>
        <div id={props.increment} onClick={props.clickRight}>
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
      </div>
    </animated.div>
  );
};

export default Parameter;
