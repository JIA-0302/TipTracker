import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import styles from "styles/Registration.module.css";

const Login: React.FunctionComponent = () => {
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const email = ({ target: { value } }) => {
    setLoginFields({ ...loginFields, email: value });
  };

  const password = ({ target: { value } }) => {
    setLoginFields({ ...loginFields, password: value });
  };

  const loginUser = () => {
    // const user = {
    //     name: loginFields.firstName + " " + loginFields.lastName,
    //     email: loginFields.email,
    //     password: loginFields.password
    // }
    setLoginFields({
      email: "",
      password: "",
    });
  };
  return (
    <div className={styles.dFlex}>
      <div className={styles.center}>
        <Form className={styles.formBody}>
          <Form.Row>
            <Form.Label className={styles.title}> Login </Form.Label>
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
              onClick={loginUser}
            >
              Login
            </Button>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
