import React from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";


function ShiftEditedModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            contentClassName={styles.modelStyle}

        >
            <Modal.Header closeButton>
                <Modal.Title className={styles.shiftTitle}>
                    Calendar Date Place Holder
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.shiftEditBody}>
                <Form>
                   <Form.Row>
                       <Col sm={4}>
                           <img src="/baseEarning.jpg" />
                       </Col>
                       <Col sm={5}>
                           <Form.Label>Total Base Earnings</Form.Label>
                           <Form.Control type="text" placeholder="Enter Earnings" />
                       </Col>
                   </Form.Row>

                    <Form.Row>
                        <Col sm={4}>
                            <img src="/cashTips.jpg" />
                        </Col>
                        <Col sm={5}>
                            <Form.Label>Cash Tip</Form.Label>
                            <Form.Control type="text" placeholder="Enter Cash Tips" />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={4}>
                            <img src="/ccTips.jpg" />
                        </Col>
                        <Col sm={5}>
                            <Form.Label>Credit Card Tips</Form.Label>
                            <Form.Control type="text" placeholder="Enter Credit Card Tip" />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                    </Form.Row>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button className={styles.shiftEditDeleteButton} onClick={props.onHide}>Delete</Button>
                <Button className={styles.shiftEditUpdateButton} onClick={props.onHide}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ShiftEditModal: React.FunctionComponent = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch Edit Shift
            </Button>

            <ShiftEditedModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ShiftEditModal
