import Head from "next/head";
import PrivateLayout from "components/layouts/private-layout";
import { getSession } from "next-auth/client";
import React from "react";
import { Button } from "react-bootstrap";

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
    <PrivateLayout>
      <Head>
        <title>Home | TipTracker</title>
      </Head>

      <h1>Home</h1>
      <h2>Welcome back: {session?.user?.name.split(" ")[0]}</h2>

      <Button variant="warning" href="/api/auth/signout">
        Sign out
      </Button>
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
