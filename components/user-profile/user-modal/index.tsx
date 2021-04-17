import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { MdAccountBox, MdEmail } from "react-icons/md";
import styles from "./user-modal.module.css";
import { updateUserData, getUserData } from "src/actions/user-details";

interface UserProps {
  onButtonSelect: () => void;
}

const UserForm: React.FunctionComponent<UserProps> = ({ onButtonSelect }) => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserData()
      .then((data) => {
        setUserDetail({
          name: data["name"],
          email: data["email"],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getParsedUserDetails = () => {
    return {
      ...userDetail,
    };
  };

  const updateUserDetails = (event) => {
    const { name, value } = event.target;
    setUserDetail({ ...userDetail, [name]: value });
  };

  const updateEditedUserData = async () => {
    const newUserDetails = getParsedUserDetails();
    try {
      setLoading(true);
      await updateUserData(newUserDetails);
      window.location.href = "/api/auth/signout";
      onButtonSelect();
    } catch (e) {
      window.alert(e.message);
    } finally {
      setLoading(true);
    }
  };

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
              <Form.Control
                onChange={updateUserDetails}
                type="text"
                name="name"
                value={userDetail?.name}
                disabled={loading}
              />
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
              <Form.Control
                onChange={updateUserDetails}
                type="text"
                name="email"
                value={userDetail?.email}
                disabled={loading}
              />
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
              onClick={updateEditedUserData}
              disabled={loading}
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
