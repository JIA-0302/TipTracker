import Link from "next/link";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import styles from "styles/Registration.module.css";

interface LoginProps {
  csrfToken: string;
}

const Login = ({ csrfToken }: LoginProps): JSX.Element => {
  return (
    <Form
      className={styles.formBody}
      action="/api/auth/callback/credentials"
      method="POST"
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Form.Row>
        <h1 className={styles.title}> Login </h1>
      </Form.Row>
      <Form.Row>
        <Col xs={12}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs={12}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" required />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Button className={styles.button} variant="warning" type="submit">
          Login
        </Button>
      </Form.Row>

      <hr />

      <div className="text-primary text-center">
        <Link href="/registration">Sign up for TipTracker</Link>
      </div>
    </Form>
  );
};

export default Login;
