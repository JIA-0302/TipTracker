import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { Container } from "react-bootstrap";
import PrivateLayout from "components/layouts/private-layout";
import styles from "styles/User.module.css";
import UserDetails from "components/user-details/";

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
            <h2 className="ml-3">
              <b>{"User Details"}</b>
            </h2>
          </div>
        </Container>
        <div>
          <Container className="mt-3">
            <div>
              <UserDetails
                name={session?.user?.name || "John Doe"}
                email={session?.user?.email || "jdoe@tiptracker.com"}
              />
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
