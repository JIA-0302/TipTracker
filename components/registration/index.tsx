import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import styles from "styles/Registration.module.css";

const Registration: React.FunctionComponent = () => {
  const [registerFields, setRegisterFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const firstName = ({ target: { value } }) => {
    setRegisterFields({ ...registerFields, firstName: value });
  };
  const lastName = ({ target: { value } }) => {
    setRegisterFields({ ...registerFields, lastName: value });
  };
  const email = ({ target: { value } }) => {
    setRegisterFields({ ...registerFields, email: value });
  };

  const password = ({ target: { value } }) => {
    setRegisterFields({ ...registerFields, password: value });
  };

  const registerUser = () => {
    // const user = {
    //     name: registerFields.firstName + " " + registerFields.lastName,
    //     email: registerFields.email,
    //     password: registerFields.password
    // }
    setRegisterFields({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className={styles.dFlex}>
      <div className={styles.center}>
        <Form className={styles.formBody}>
          <Form.Row>
            <Form.Label className={styles.title}> Registration </Form.Label>
          </Form.Row>
          <Form.Row>
            <Col xs={12}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" onChange={firstName}></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={lastName}></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={email}></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={12}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" onChange={password}></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Button
              className={styles.button}
              variant="dark"
              type="submit"
              onClick={registerUser}
            >
              Register
            </Button>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
