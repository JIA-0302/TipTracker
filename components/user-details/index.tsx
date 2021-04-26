import React from "react";
import styles from "../user-details/user-details.module.css";
import Image from "next/image";
import WorkScheduleModalController from "components/work-schedule/";
import UserProfileModalController from "components/user-profile/";

export interface UserDetailsProp {
  name: string;
  email: string;
  image: string;
}

const UserDetails = ({ name, email, image }: UserDetailsProp): JSX.Element => {
  return (
    <div className={styles.div}>
      <div className={styles.avatarContainer}>
        <Image
          src={image}
          alt="Picture of the user"
          width={135}
          height={135}
          className={styles.avatar}
        />
      </div>

      <h3 className="mt-3">{name}</h3>
      <p>{email}</p>

      <UserProfileModalController />
      <WorkScheduleModalController />
    </div>
  );
};

export default UserDetails;
