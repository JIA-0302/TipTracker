import { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
