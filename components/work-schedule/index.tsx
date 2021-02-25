import React from "react";
import styles from "../work-schedule/work-schedule.module.css";
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
import { red } from "@material-ui/core/colors";

export interface WorkScheduleProp {
  workDay: string;
  startTime: string;
  endTime: string;
}

const WorkSchedule: React.FunctionComponent<WorkScheduleProp> = (props) => {
  return (
    <div className={styles.div}>
      <List className={styles.list}>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <AlarmRoundedIcon style={{ color: red[500] }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work Day" secondary={props.workDay} />
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <HourglassEmptyRoundedIcon style={{ color: red[500] }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Start Time" secondary={props.startTime} />
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <HourglassFullRoundedIcon style={{ color: red[500] }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="End Time" secondary={props.endTime} />
        </ListItem>
      </List>
    </div>
  );
};

export default WorkSchedule;
