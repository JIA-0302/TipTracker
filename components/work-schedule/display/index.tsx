import React from "react";
import styles from "./display.module.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core/";
import AlarmRoundedIcon from "@material-ui/icons/AlarmRounded";
import HourglassEmptyRoundedIcon from "@material-ui/icons/HourglassEmptyRounded";
import HourglassFullRoundedIcon from "@material-ui/icons/HourglassFullRounded";

export interface WorkScheduleProp {
  workDay: string;
  startTime: string;
  endTime: string;
}

const WorkSchedule: React.FunctionComponent<WorkScheduleProp> = (props) => {
  return (
    <>
      <div className={styles.div}>
        <List>
          <div className={styles.divH3}>
            <h3 className={styles.h3}>Upcoming Shift</h3>
          </div>
          <ListItem className={styles.listItem}>
            <ListItemAvatar>
              <Avatar>
                <AlarmRoundedIcon className={styles.icon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work Day" secondary={props.workDay} />
          </ListItem>
          <ListItem className={styles.listItem}>
            <ListItemAvatar>
              <Avatar>
                <HourglassEmptyRoundedIcon className={styles.icon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Start Time" secondary={props.startTime} />
          </ListItem>
          <ListItem className={styles.listItem}>
            <ListItemAvatar>
              <Avatar>
                <HourglassFullRoundedIcon className={styles.icon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="End Time" secondary={props.endTime} />
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default WorkSchedule;
