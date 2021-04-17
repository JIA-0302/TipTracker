import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { Button, Container, Row, Col } from "react-bootstrap";
import PrivateLayout from "components/layouts/private-layout";
import styles from "styles/Home.module.css";
import WorkSchedule from "components/work-schedule/schedule-display";
import UserDetails from "components/user-details/";

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
        <Container fluid="sm">
          <Row>
            <Col>
              <div className="ml-4">
                <h2>
                  Welcome back{" "}
                  <b>{session?.user?.name.split(" ")[0] || "John"}</b>
                </h2>
                <Button variant="warning" href="/api/auth/signout">
                  Sign out
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="ml-4">
                <UserDetails
                  name={session?.user?.name || "John Doe"}
                  email={session?.user?.email || "jdoe@tiptracker.com"}
                  image={session?.user?.image || "/images/user-image.jpg"}
                />
              </div>
            </Col>
            <Col xs={7}>
              <div className="ml-4">
                <WorkSchedule
                  workDay="04/26/2021"
                  startTime="11:30"
                  endTime="21:00"
                />
              </div>
            </Col>
          </Row>
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
