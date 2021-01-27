import Head from "next/head"
import PrivateLayout from "components/layouts/private-layout"

const Home: React.FunctionComponent = () => {
  return (
    <PrivateLayout>
      <Head>
        <title>Home | TipTracker</title>
      </Head>

      <h1>Home</h1>
    </PrivateLayout>
  )
}

export default Home
