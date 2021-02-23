import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSession } from "next-auth/client";
import styles from "../styles/Home.module.css";

const Home: React.FunctionComponent = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <h1>...LOADING...</h1>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>TipTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row>
        <Col xs={12} md={5}>
          <Image
            src="/images/tip-tracker-logo.png"
            alt="Logo of TipTracker Application"
            width={400}
            height={400}
          />
        </Col>
        <Col xs={12} md={7}>
          <main className={styles.main}>
            <h1 className={styles.title}>Welcome to</h1>
            <h1 className={styles.focusText}>
              Tip<span style={{ color: "black" }}>Tracker</span>
            </h1>
            {!session && (
              <Link href="/api/auth/signin">
                <Button size="lg" variant="warning" className="mt-4">
                  Login
                </Button>
              </Link>
            )}
            {session && (
              <Link href="/home">
                <Button size="lg" variant="warning" className="mt-4">
                  Continue
                </Button>
              </Link>
            )}
          </main>
        </Col>
      </Row>

      {/* <footer className={styles.footer}>
        
      </footer> */}
    </div>
  );
};

export default Home;
