import React from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import {format} from "date-fns";


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
                            <Col sm={4}>
                                <img src="/baseEarning.jpg"/>
                            </Col>
                            <Col sm={5}>
                                <Form.Label>Total Base Earnings</Form.Label>
                                <Form.Control type="text" placeholder="Enter Hourly wage"/>
                            </Col>
                        </Form.Row> :
                        <div>
                            <Form.Row>
                                <Col sm={4}>
                                    <img src="/time.jpg"/>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Start Time" style={{lineHeight: "10px"}}/>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control type="text" placeholder="Enter End Time"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col sm={4}>
                                    <img src="/baseEarning.jpg"/>
                                </Col>
                                <Col sm={5}>
                                    <Form.Label>Hourly Wages</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Earnings"/>
                                </Col>
                            </Form.Row>
                        </div>
                    }

                    <Form.Row>
                        <Col sm={4}>
                            <img src="/cashTips.jpg"/>
                        </Col>
                        <Col sm={5}>
                            <Form.Label>Cash Tips</Form.Label>
                            <Form.Control type="text" placeholder="Enter Cash Tip"/>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={4}>
                            <img src="/ccTips.jpg"/>
                        </Col>
                        <Col sm={5}>
                            <Form.Label>Credit Card Tips</Form.Label>
                            <Form.Control type="text" placeholder="Enter Credit Card Tip"/>
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

// const ShiftAddModal = (props) => {
//     const [modalShow, setModalShow] = React.useState(props.showAddModal);
//     const closeModal = () => {
//         setModalShow(false);
//         props.setMainModal(true);
//     };
//     return (
//
//         <>
//
//             <ShiftAddedModal
//                 show={modalShow}
//                 onHide={closeModal}
//                 hourly={props.hourly}
//             />
//         </>
//     );
// }

export default ShiftAddModal