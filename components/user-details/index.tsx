import React from "react";
import styles from "../user-details/user-details.module.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core/";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";

export interface UserDetailsProp {
  name: string;
  email: string;
}

const UserDetails: React.FunctionComponent<UserDetailsProp> = (props) => {
  return (
    <div className={styles.div}>
      <h3 className={styles.h3}>User Details</h3>

      <List className={styles.list}>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon className={styles.icon} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Name" secondary={props.name} />
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon className={styles.icon} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={props.email} />
        </ListItem>
      </List>
    </div>
  );
};

export default UserDetails;
