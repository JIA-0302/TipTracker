import Head from "next/head";
import WorkCalendar from "components/work-calendar";
import PrivateLayout from "components/layouts/private-layout";
import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "../styles/Summary.module.css";

const Home: React.FunctionComponent = () => {
  return (
    <PrivateLayout>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <title>Calendar | TipTracker</title>
      </Head>
      <h1>Work Calendar</h1>
      <Link href="/summary" passHref>
        <Button variant="success" className={styles.button}>
          Summary
        </Button>
      </Link>
      <WorkCalendar />
    </PrivateLayout>
  );
};

export default Home;
