import Head from "next/head";
import WorkCalendar from "components/work-calendar";
import PrivateLayout from "components/layouts/private-layout";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "../styles/Summary.module.css";
import { WorkedShiftProvider } from "src/providers/WorkedShiftContext";
import ModalController from "components/shift-modal";

const Home: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");

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
      <WorkedShiftProvider>
        <WorkCalendar onDateSelect={setSelectedDate} />
        <ModalController
          selectedDate={selectedDate}
          onModalClose={() => setSelectedDate("")}
        />
      </WorkedShiftProvider>
    </PrivateLayout>
  );
};

export default Home;
