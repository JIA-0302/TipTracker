import { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-time-picker/dist/TimePicker.css";
import "../styles/globals.css";
import "styles/preloader.css";
import React from "react";
import Head from "next/head";

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>TipTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
