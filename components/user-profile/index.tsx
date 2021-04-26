import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UserForm from "./user-modal/";

import styles from "styles/UserProfile.module.css";

const UserProfileModalController = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="my-2">
      <Button variant="warning" onClick={handleShow} className={styles.button}>
        Edit Profile
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
            <h2>User Profile</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm onButtonSelect={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfileModalController;
