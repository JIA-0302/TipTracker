import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Button from "react-bootstrap/Button";
import ScreenLoader from "components/screen-loader";
import AuthLayout from "components/layouts/auth-layout";
import Head from "next/head";

import styles from "styles/Home.module.css";

const Home: React.FunctionComponent = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <AuthLayout>
      <Head>
        <title>TipTracker</title>
      </Head>
      <h1 className={styles.title}>Welcome to</h1>
      <h1 className={styles.focusText}>
        Tip<span style={{ color: "black" }}>Tracker</span>
      </h1>
      {!session && (
        <>
          <Link href="/login">
            <Button size="lg" variant="warning" className="mt-4">
              Login
            </Button>
          </Link>
          <br />
          <Link href="/registration">
            <Button size="lg" variant="warning" className="mt-4">
              Register Now
            </Button>
          </Link>
        </>
      )}
      {session && (
        <Link href="/home">
          <Button size="lg" variant="warning" className="mt-4">
            Continue
          </Button>
        </Link>
      )}
    </AuthLayout>
  );
};

export default Home;
