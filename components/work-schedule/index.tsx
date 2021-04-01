import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "styles/Schedule.module.css";
import Schedule from "./schedule-modal";

const ModalController = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formToShow = <Schedule onButtonSelect={handleClose} />;
  const modalTitle = "Work Schedule";

  return (
    <>
      <Button variant="warning" onClick={handleShow} className={styles.button}>
        Edit Work Schedule
      </Button>
      <Modal
        size="lg"
        contentClassName={styles.modelStyle}
        backdrop="static"
        centered
        onHide={handleClose}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.mainTitle}>
            <h2>{modalTitle}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{formToShow}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalController;
