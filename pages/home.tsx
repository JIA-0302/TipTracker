import React from "react";
import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/client";
import { Button, Container } from "react-bootstrap";
import PrivateLayout from "components/layouts/private-layout";
import styles from "styles/Home.module.css";
import WorkSchedule from "components/work-schedule/";

interface HomeProps {
  session: {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
  };
}

export function Home(props: HomeProps): JSX.Element {
  const { session } = props;

  return (
    <PrivateLayout backgroundStyle={styles.dashboard}>
      <Head>
        <title>Home | TipTracker</title>
      </Head>

      <div>
        <Container className="mt-3">
          <div className="d-flex align-items-center">
            <div className={styles.avatarContainer}>
              <Image
                src={session.user.image || "/images/avatar.png"}
                alt="Picture of the user"
                width={128}
                height={128}
                className={styles.avatar}
              />
            </div>

            <h2 className="ml-3">
              Welcome back <b>{session?.user?.name.split(" ")[0]}</b>
            </h2>
          </div>

          <Button variant="warning" href="/api/auth/signout" className="mt-5">
            Sign out
          </Button>

          <WorkSchedule
            workDay="02/26/2021"
            startTime="11:30:00"
            endTime="5:00:00"
          />
        </Container>
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

export default Home;
