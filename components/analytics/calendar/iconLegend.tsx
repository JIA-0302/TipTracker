import React from "react";
import { KEY_ICONS } from "../utils";

import styles from "./styles.module.css";

const IconLegend = () => {
  const icons = KEY_ICONS;

  return (
    <div className={styles.legendContainer}>
      <h2>Legend</h2>
      <div className={styles.legend}>
        {Object.keys(icons).map((item) => {
          return (
            <div key={item}>
              <div className={styles.legendIcon}>{KEY_ICONS[item].icon}</div>
              {KEY_ICONS[item].name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconLegend;
