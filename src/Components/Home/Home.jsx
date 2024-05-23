import React, { useState } from "react";
import Section1 from "../Section1/Section1";
import Section2 from "../Section2/Section2";
import classes from "./Home.module.css";

export default function () {
  const [section, setSection] = useState(true);
  return (
    <div className={classes.wrapper}>
      <div className={classes.buttons}>
        <button onClick={() => !section && setSection(true)}>
          1. Recursive Partitioning
        </button>
        <button onClick={() => section && setSection(false)}>
          2. Alphabate Tile Interaction
        </button>
      </div>
      {section ? <Section1 /> : <Section2 />}
    </div>
  );
}
