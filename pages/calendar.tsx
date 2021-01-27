import Head from "next/head"
import WorkCalendar from "components/work-calendar"
import PrivateLayout from "components/layouts/private-layout"

const Home: React.FunctionComponent = () => {
  return (
    <PrivateLayout>
      <Head>
        <title>Calendar | TipTracker</title>
      </Head>

      <WorkCalendar selectedDate={new Date().toLocaleString()} />
    </PrivateLayout>
  )
}

export default Home
