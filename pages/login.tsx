import React from "react";
import Login from "../components/login";
import AuthLayout from "../components/layouts/auth-layout";
import { csrfToken } from "next-auth/client";
import Head from "next/head";

interface LoginPageProps {
  csrfToken: string;
}

const LoginPage = ({ csrfToken }: LoginPageProps): JSX.Element => {
  return (
    <AuthLayout>
      <Head>
        <title>Login | TipTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login csrfToken={csrfToken} />
    </AuthLayout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: { csrfToken: await csrfToken(context) },
  };
}

export default LoginPage;
