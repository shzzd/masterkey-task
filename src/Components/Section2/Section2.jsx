import React, { useState } from "react";
import classes from "./Section2.module.css";

export default function Section2() {
  const [outputString, setOutputString] = useState("");

  const tileClick = (letter) => {
    const newLetters = outputString + letter;
    const replaceLetters = newLetters.replace(/(.)\1{2,}/g, "_");
    setOutputString(replaceLetters);
  };

  const callTiles = () => {
    const tiles = [];
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      tiles.push(
        <div
          key={letter}
          className={classes.tile}
          onClick={() => tileClick(letter)}
        >
          {letter}
        </div>
      );
    }
    return tiles;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.tiles}> {callTiles()}</div>
      <div className={classes.output}>Output String: {outputString}</div>
    </div>
  );
}
