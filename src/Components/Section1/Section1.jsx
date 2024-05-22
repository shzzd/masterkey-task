import React, { useState } from "react";
import classes from "./Section1.module.css";

export default function Section1() {
  const [splitCount, setSplitCount] = useState(1);
  const [split, setSplit] = useState(0);
  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(14);

  const [partition, setPartition] = useState([
    {
      id: 1,
      backgroundColor: randomColor(),
      innerChild: [],
    },
  ]);

  const add = (id, direction) => {
    // setSplitCount(splitCount + 1);
    // setSplit(0);

    setPartition((prev) => {
      const newContent = [...prev];
      const partition = newContent.find((e) => e.id === id);
      const newId = Date.now();
      partition &&
        partition.innerChild.push({
          id: newId,
          backgroundColor: randomColor(),
          direction: direction,
          innerChild: [],
        });
      return newContent;
    });
  };

  const remove = (id) => {
    // setSplitCount(splitCount - 1);

    setPartition((prev) => {
      const filterContent = (content) => {
        return content
          .filter((partition) => partition.id !== id)
          .map((partition) => ({
            ...partition,
            innerChild: filterContent(partition.innerChild),
          }));
      };
      return filterContent(prev);
    });
  };

  console.log(partition);

  const getPartition = (partition) => {
    return partition.map((content, index) => (
      <>
        <div
          key={index}
          style={{ backgroundColor: randomColor() }}
          className={classes.container}
        >
          <button onClick={() => add(content.id, "verticle")}>V</button>
          <button onClick={() => add(content.id, "horizontal")}>H</button>
          <button onClick={() => remove(content.id)}>-</button>
        </div>
        {content.innerChild.length !== 0 && (
          <div
            className={`${classes.innerChild} ${
              content.innerChild[index].direction === "horizontal"
                ? classes.horizontal
                : classes.verticle
            }`}
          >
            {getPartition(content.innerChild)}
          </div>
        )}
      </>
    ));
  };

  return <div className={classes.wrapper}>{getPartition(partition)}</div>;
}
