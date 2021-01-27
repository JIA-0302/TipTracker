import Head from "next/head"
import styles from "../styles/Home.module.css"
import WorkCalendar from "components/work-calendar"

const Home: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Calendar</title>
      </Head>

      <WorkCalendar />
    </div>
  )
}

export default Home
