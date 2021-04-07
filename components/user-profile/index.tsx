import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "styles/UserProfile.module.css";
import EditIcon from "@material-ui/icons/Edit";
import UserForm from "./user-modal/";

interface UserProps {
  userId: number;
  userName: string;
  userEmail: string;
}

const ModalController = (props: UserProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formToShow = (
    <UserForm
      userId={props.userId}
      userName={props.userName}
      userEmail={props.userEmail}
      onButtonSelect={handleClose}
    ></UserForm>
  );
  const modalTitle = "User Profile";

  return (
    <>
      <Button variant="link" onClick={handleShow} className={styles.button}>
        <EditIcon className={styles.icon} />
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
            <h2>{modalTitle}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{formToShow}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalController;
