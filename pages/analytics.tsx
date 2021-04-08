import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FcCalendar, FcStatistics } from "react-icons/fc";
import { format } from "date-fns";

import TrendsButton from "components/analytics/trends-button";
import PrivateLayout from "../components/layouts/private-layout";

import styles from "../styles/analytics.module.css";
import stylesBackground from "styles/Home.module.css";

const analytics: React.FunctionComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const formattedDate = format(startDate, "yyyy-MM-dd");

  return (
    <PrivateLayout backgroundStyle={stylesBackground.dashboard}>
      <h1>Analytics</h1>
      <Container className="d-flex flex-column align-items-center mt-5">
        <h3>Select a Week</h3>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          className="form-control text-center"
        />

        <hr className={styles.line} />

        <Row className="mt-2">
          <Col xs={12} md={6} className="mt-3">
            <TrendsButton
              text="See Past Trends"
              link={`/past-analytics?date=${formattedDate}`}
              icon={<FcCalendar fontSize="4rem" />}
            />
          </Col>
          <Col xs={12} md={6} className="mt-3">
            <TrendsButton
              text="See Future Trends"
              link={`/future-analytics?date=${formattedDate}`}
              icon={<FcStatistics fontSize="4rem" />}
            />
          </Col>
        </Row>
      </Container>
    </PrivateLayout>
  );
};

export default analytics;
