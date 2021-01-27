import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.css"

import { AppProps } from "next/app"

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
