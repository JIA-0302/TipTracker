import Head from "next/head";
import WorkCalendar from "components/work-calendar";
import PrivateLayout from "components/layouts/private-layout";
import React from "react";

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
      <WorkCalendar />
    </PrivateLayout>
  );
};

export default Home;
