import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import Schedule from "./schedule-modal";
import styles from "styles/Schedule.module.css";

const WorkScheduleModalController = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="mt-2">
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
            <h2>Work Schedule</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Schedule onButtonSelect={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WorkScheduleModalController;
