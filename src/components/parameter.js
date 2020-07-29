import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
const Parameter = (props) => (
  <div className="parameter">
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
  </div>
);

export default Parameter;
