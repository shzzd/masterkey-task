import React, { useState } from "react";
import classes from "./Section1.module.css";

export default function Section1() {
  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(15);

  const [partitions, setPartition] = useState([
    { id: 1, color: randomColor(), children: [] },
  ]);

  const add = (id, direction) => {
    setPartition((prev) => {
      const newPartitions = JSON.parse(JSON.stringify(prev));
      const childPartition = findPartition(newPartitions, id);
      if (childPartition) {
        childPartition.children = [
          { id: Date.now(), color: childPartition.color, children: [] },
          { id: Date.now() + 1, color: randomColor(), children: [] },
        ];
        childPartition.direction = direction;
      }
      return newPartitions;
    });
  };

  const findPartition = (partitions, id) => {
    for (let partition of partitions) {
      if (partition.id === id) return partition;
      const childPartition = findPartition(partition.children, id);
      if (childPartition) return childPartition;
    }
    return null;
  };

  const remove = (id) => {
    setPartition((prev) => {
      const newPartitions = JSON.parse(JSON.stringify(prev));
      const parentPartition = findParentPartition(newPartitions, id);
      if (parentPartition) {
        parentPartition.children = parentPartition.children.filter(
          (child) => child.id !== id
        );
      }
      return newPartitions;
    });
  };

  const findParentPartition = (partitions, id, parent = null) => {
    for (let partition of partitions) {
      if (partition.id === id) return parent;
      const parentPartition = findParentPartition(
        partition.children,
        id,
        partition
      );
      if (parentPartition) return parentPartition;
    }
    return null;
  };

  console.log(partitions);

  const callPartition = (partitions) => {
    return partitions.map((content) => (
      <div
        key={content.id}
        className={classes.partition}
        style={{ backgroundColor: content.color }}
      >
        <div className={classes.buttons}>
          <button onClick={() => add(content.id, "vertical")}>V</button>
          <button onClick={() => add(content.id, "horizontal")}>H</button>
          <button onClick={() => remove(content.id)}>-</button>
        </div>
        {content.children.length > 0 && (
          <div
            className={`${classes.innerChild} ${
              content.direction === "horizontal"
                ? classes.horizontal
                : classes.vertical
            }`}
          >
            {callPartition(content.children)}
          </div>
        )}
      </div>
    ));
  };
  return <div className={classes.wrapper}>{callPartition(partitions)}</div>;
}
