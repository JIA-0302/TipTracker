import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import { FcClock, FcMoneyTransfer } from "react-icons/fc";
import { FormType } from "..";

interface ShiftMainFormProps {
  onFormSelect: (x: FormType) => void;
}

const ShiftMainForm: React.FunctionComponent<ShiftMainFormProps> = ({
  onFormSelect,
}) => {
  return (
    <Row className={`${styles.shiftMainModal} my-3 mx-auto`}>
      <Col xs={6}>
        <div
          className={styles.mainButton}
          onClick={() => onFormSelect("HOURLY")}
        >
          <FcClock fontSize="4em" />
          Hourly Wages
        </div>
      </Col>

      <Col xs={6}>
        <div
          className={styles.mainButton}
          onClick={() => onFormSelect("NON_HOURLY")}
        >
          <FcMoneyTransfer fontSize="4em" />
          Non-Hourly Wages
        </div>
      </Col>
    </Row>
  );
};

export default ShiftMainForm;
