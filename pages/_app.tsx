import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.css"

import { AppProps } from "next/app"
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
