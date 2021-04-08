import { ReactElement } from "react";
import Link from "next/link";
import React from "react";
import classnames from "classnames";

import styles from "./styles.module.css";

interface TrendsButtonProps {
  text: string;
  link: string;
  icon?: ReactElement;
}

const TrendsButton = ({ text, link, icon }: TrendsButtonProps) => (
  <Link href={link}>
    <div className={classnames(styles.button, "p-3")}>
      {icon}
      <h5 className="mt-3">{text}</h5>
    </div>
  </Link>
);

export default TrendsButton;
