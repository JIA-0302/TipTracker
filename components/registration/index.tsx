import {Button, Col, Form, Row} from "react-bootstrap";
import styles from "styles/Registration.module.css";
import {useForm} from "react-hook-form";
import {error} from "next/dist/build/output/log";
import {useState} from "react";

const Registration: React.FunctionComponent = () => {
    const {register, handleSubmit, errors, reset} = useForm();
    const [errorMessage, setMessage] = useState('');


    const registerUser = data => {
        const user = {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            password: data.password
        };
        postData(user);

    };
    const postData = (data) => {
        fetch('api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text)
                        })
                    }

                }
            )
            .then(() => {
                if (errorMessage.length > 0) {
                    setMessage('');
                }
                reset({});
            })
            .catch((error) => {
                const userMessage = JSON.parse(error.message);
                setMessage(userMessage.message);
            });
    };

    return (
        <div className={styles.dFlex}>
            <div className={styles.center}>
                <form className={styles.formBody} onSubmit={handleSubmit(registerUser)}>
                    <Row>
                        <h1 className={styles.title}> Registration </h1>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {errorMessage.length !== 0 ? <p className={styles.errors}>{errorMessage} </p> : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <Col xs={12}>
                                <label>First Name</label>
                                {errors.firstName ? <p className={styles.errors}>{errors.firstName.message}</p> : ''}
                            </Col>
                        </Row>
                        <Col xs={12}>
                            <input name="firstName"
                                   type="text"
                                   ref={
                                       register({
                                           required: 'First Name is required',
                                           pattern: {
                                               value: /^[A-Za-z]+$/i,
                                               message: "First Name must be Alphabetical Characters"
                                           }
                                       })
                                   }/>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <Col xs={12}>
                                <label>Last Name</label>
                                {errors.lastName ? <p className={styles.errors}>{errors.lastName.message}</p> : ''}
                            </Col>
                        </Row>
                        <Col xs={12}>
                            <input name="lastName"
                                   type="text"
                                   ref={
                                       register({
                                           required: 'Last Name is required',
                                           pattern: {
                                               value: /^[A-Za-z]+$/i,
                                               message: "Last Name must be Alphabetical Characters"
                                           }
                                       })
                                   }/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <label>Email Address</label>
                            {errors.email ? <p className={styles.errors}>{errors.email.message}</p> : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <input type="text" name="email"
                                   ref={register({
                                       required: 'Email is required',
                                       pattern: {
                                           value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                           message: 'Enter a valid email'
                                       }
                                   })}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <label>Password</label>
                            {errors.password ? <p className={styles.errors}>{errors.password.message}</p> : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <input type="password" name="password"
                                   ref={register({
                                       required: 'Password is required',
                                       minLength: {value: 8, message: 'Password needs a length of 8 or more'}
                                   })}/>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="dark" className={styles.button} type="submit">Register</Button>
                    </Row>
                </form>
            </div>
        </div>
    );
};

export default Registration;
