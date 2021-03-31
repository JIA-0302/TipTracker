import React from "react";
import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/client";
import { Container } from "react-bootstrap";
import PrivateLayout from "components/layouts/private-layout";
import styles from "styles/User.module.css";
import UserDetails from "components/user-details/";
import ModalController from "components/work-schedule/";

interface UserProps {
  session: {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
  };
}

export function User(props: UserProps): JSX.Element {
  const { session } = props;

  return (
    <PrivateLayout backgroundStyle={styles.dashboard}>
      <Head>
        <title>User | TipTracker</title>
      </Head>

      <div>
        <Container className="mt-3">
          <div className="d-flex align-items-center">
            <div className={styles.avatarContainer}>
              <Image
                src={session?.user?.image || "/images/avatar.png"}
                alt="Picture of the user"
                width={128}
                height={128}
                className={styles.avatar}
              />
            </div>

            <h2 className="ml-3">
              <b>{session?.user?.name.split(" ")[0] || "John"}</b>
            </h2>
          </div>
        </Container>
        <div>
          <Container className="mt-3">
            <div>
              <div>
                <UserDetails
                  name={session?.user?.name || "John Doe"}
                  email={session?.user?.email || "jdoe@tiptracker.com"}
                />
              </div>

              <div>
                <h3 className={styles.h3}>Work Schedule</h3>
                <div className={styles.buttonDiv}>
                  {" "}
                  <ModalController></ModalController>{" "}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </PrivateLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default User;
