import React from "react";

import "../App.css";

const Die = (props) => {
  const name = props.isHeld ? "dice-held" : "dice";

  // function toggle(){

  // }

  return (
    <button className={name} onClick={() => props.hold(props.id)}>
      {props.value}
    </button>
  );
};

export default Die;
