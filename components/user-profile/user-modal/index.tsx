import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { MdAccountBox, MdEmail } from "react-icons/md";
import styles from "./user-modal.module.css";

interface UserProps {
  userId?: number;
  userName: string;
  userEmail: string;
  onButtonSelect: () => void;
}

const UserForm: React.FunctionComponent<UserProps> = ({
  onButtonSelect,
  userName,
  userEmail,
}) => {
  return (
    <div>
      <Form>
        <Form.Row>
          <Col xs={3}>
            <MdAccountBox size={"60px"} />
          </Col>
          <Col xs={4}>
            <Form.Group controlId="name">
              <Form.Label className={styles.modalLabel}>Name</Form.Label>
              <Form.Control type="string" value={userName} required />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={3}>
            <MdEmail size={"60px"} />
          </Col>
          <Col xs={5}>
            <Form.Group controlId="email">
              <Form.Label className={styles.modalLabel}>Email</Form.Label>
              <Form.Control type="string" value={userEmail} required />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <hr />

      <div className="py-2 d-flex justify-content-around">
        {
          <>
            <Button
              variant="success"
              className={styles.button}
              onClick={onButtonSelect}
            >
              Update
            </Button>
          </>
        }
      </div>
    </div>
  );
};

export default UserForm;
