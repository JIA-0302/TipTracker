import React from "react";
import styles from "../user-details/user-details.module.css";
import Image from "next/image";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core/";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import EventIcon from "@material-ui/icons/Event";
import ModalController from "components/work-schedule/";
import UserProfile from "components/user-profile/";

export interface UserDetailsProp {
  name: string;
  email: string;
  image: string;
}

const UserDetails: React.FunctionComponent<UserDetailsProp> = (props) => {
  return (
    <div className={styles.div}>
      <List>
        <div className={styles.avatarContainer}>
          <Image
            src={props.image}
            alt="Picture of the user"
            width={135}
            height={135}
            className={styles.avatar}
          />
        </div>
        <div className={styles.avatarContainer}>
          <UserProfile></UserProfile>
        </div>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon className={styles.icon} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.name} />
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon className={styles.icon} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.email} />
        </ListItem>
        <ListItem className={styles.listItem}>
          <ListItemAvatar>
            <Avatar>
              <EventIcon className={styles.icon} />
            </Avatar>
          </ListItemAvatar>
          <ModalController></ModalController>
        </ListItem>
      </List>
    </div>
  );
};

export default UserDetails;
