import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import ShiftAddModal from "../shift-add-modal";
import { FcClock, FcMoneyTransfer } from "react-icons/fc";

interface ShiftMainAddModalProps {
  date: Date;
  hourly?: string;
  show: boolean;
  onHide: (boolean) => void;
  reload: (any) => void;
}

const ShiftMainAddModal: React.FunctionComponent<ShiftMainAddModalProps> = (
  props
) => {
  const [showWageModel, setWageModel] = React.useState({
    wageType: "",
    wageMode: false,
  });

  const openHourlyWageModal = () => {
    props.onHide(false);
    setWageModel({ wageType: "hourly", wageMode: true });
  };

  const openNonHourlyWageModal = () => {
    props.onHide(false);
    setWageModel({ wageType: "nonHourly", wageMode: true });
  };

  return !props.show && showWageModel.wageMode ? (
    <ShiftAddModal
      date={props.date}
      show={showWageModel.wageMode}
      hourly={showWageModel.wageType}
      onHide={setWageModel}
      reload={props.reload}
    />
  ) : (
    <Modal
      {...props}
      size="lg"
      contentClassName={styles.modelStyle}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.mainTitle}>
          <h2>Select Wage Type</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className={`${styles.shiftMainModal} my-3 mx-auto`}>
          <Col xs={6}>
            <div className={styles.mainButton} onClick={openHourlyWageModal}>
              <FcClock fontSize="4em" />
              Hourly Wages
            </div>
          </Col>

          <Col xs={6}>
            <div className={styles.mainButton} onClick={openNonHourlyWageModal}>
              <FcMoneyTransfer fontSize="4em" />
              Non-Hourly Wages
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ShiftMainAddModal;
