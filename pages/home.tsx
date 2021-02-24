import Head from "next/head";
import PrivateLayout from "components/layouts/private-layout";
import getSession from "next-auth/client";
import React from "react";
import Link from "next/link";
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

      {session ? (
        <>
          <h1>Home</h1>
          <h2>Welcome back: {session?.user?.name.split(" ")[0] || "Guest"}</h2>
        </>
      ) : (
        <>
          <h1>Hello Guest</h1>
          <Link href="/api/auth/signin">
            <Button size="lg" variant="warning" className="mt-4">
              Login
            </Button>
          </Link>
        </>
      )}
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
