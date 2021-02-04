import React from "react";
import {Button, Col, Form, Modal } from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import {format} from "date-fns";
import {AiFillDollarCircle} from "react-icons/ai";
import {IoIosCash} from "react-icons/io";
import {HiCreditCard} from "react-icons/hi";
import {FaMoneyCheckAlt} from "react-icons/fa";
import {TiTime} from "react-icons/ti";


const ShiftAddModal = (props) => {
    const closeModal = () =>{
        props.onHide({wageType: "", wageMode: false});
    }
    return (
        <Modal
            {...props}
            size="lg"
            contentClassName={styles.modelStyle}
            backdrop="static"

        >
            <Modal.Header closeButton onHide={closeModal} >
                <Modal.Title className={styles.shiftTitle}>
                    {props.date ? format(props.date, "P") : ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.shiftEditBody}>
                <Form>
                    {props.hourly === "nonHourly" ?

                        <Form.Row>
                            <Col xs={4}>
                                <AiFillDollarCircle size={"75px"}/>
                            </Col>
                            <Col xs={5}>
                                <Form.Label>Total Base Earnings</Form.Label>
                                <Form.Control type="text" placeholder="Enter Hourly wage"/>
                            </Col>
                        </Form.Row> :
                        <div>
                            <Form.Row>
                                <Col xs={4}>
                                    <TiTime size={"75px"}/>
                                </Col>
                                <Col xs={4}>
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Start Time" style={{lineHeight: "10px"}}/>
                                </Col>
                                <Col xs={4}>
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control type="text" placeholder="Enter End Time"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col xs={4}>
                                    <FaMoneyCheckAlt size={"75px"}/>
                                </Col>
                                <Col xs={5}>
                                    <Form.Label>Hourly Wages</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Wages"/>
                                </Col>
                            </Form.Row>
                        </div>
                    }

                    <Form.Row>
                        <Col xs={4}>
                            <IoIosCash size={"75px"}/>
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Total Cash Tips</Form.Label>
                            <Form.Control type="text" placeholder="Enter Cash Tips"/>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={4}>
                            <HiCreditCard size={"75px"} />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Total Credit Card Tips</Form.Label>
                            <Form.Control type="text" placeholder="Enter Credit Card Tips"/>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                    </Form.Row>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button className={styles.shiftAddSubmitButton} onClick={closeModal}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShiftAddModal
