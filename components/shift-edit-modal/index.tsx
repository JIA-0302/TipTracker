import React, { useState } from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import {format} from "date-fns";


const ShiftEditModal = (props) => {
    const[userData, updateUserData] = useState({ "earnings": 110.50, "cashTips": 230, "ccTips" : 55, "active":true});
    const closeModal = () => {
        props.onHide(false);
    };

    const updateData = () => {
        props.onHide(false);
        props.update(userData);

    };

    const deleteData = () => {
        props.onHide(false);
        props.update({...userData, "active":false});


    };

    const earnings = ({target:{value}}) => {
    updateUserData({...userData, "earnings":value});
    };
    const cashTips = ({target:{value}}) => {
        updateUserData({...userData, "cashTips":value});
    };
    const ccTips = ({target:{value}}) => {
        updateUserData({...userData, "ccTips":value});
    };

    return (
        <Modal
            {...props}
            size="lg"
            contentClassName={styles.modelStyle}
            backdrop="static"

        >
            <Modal.Header closeButton onHide={closeModal}>
                <Modal.Title className={styles.shiftTitle}>
                    {props.date ? format(props.date, "P") : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.shiftEditBody}>
                <Form>
                   <Form.Row>
                       <Col sm={4}>
                           <img src="/baseEarning.jpg" />
                       </Col>
                       <Col sm={5}>
                           <Form.Group controlId={"baseEarning"}>
                           <Form.Label>Total Base Earnings</Form.Label>
                           <Form.Control type="text" defaultValue={`${props.data.earnings}`}placeholder="Enter Earnings" onChange={earnings}></Form.Control>
                           </Form.Group>

                       </Col>
                   </Form.Row>

                    <Form.Row>
                        <Col sm={4}>
                            <img src="/cashTips.jpg" />
                        </Col>
                        <Col sm={5}>
                            <Form.Group controlId={"cashTips"}>
                            <Form.Label>Cash Tip</Form.Label>
                            <Form.Control type="text"  defaultValue={`${props.data.cashTips}`} placeholder="Enter Cash Tips"  onChange={cashTips}/>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={4}>
                            <img src="/ccTips.jpg" />
                        </Col>
                        <Col sm={5}>
                            <Form.Group controlId={"ccTip"}>
                            <Form.Label>Credit Card Tips</Form.Label>
                            <Form.Control type="text" defaultValue={`${props.data.ccTips}`} placeholder="Enter Credit Card Tip" onChange={ccTips} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={styles.shiftEditDeleteButton} onClick={deleteData}>Delete</Button>
                <Button className={styles.shiftEditUpdateButton} onClick={updateData}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

// const ShiftEditModal: React.FunctionComponent = () => {
//     const [modalShow, setModalShow] = React.useState(false);
//
//     return (
//         <>
//             <Button variant="primary" onClick={() => setModalShow(true)}>
//                 Launch Edit Shift
//             </Button>
//
//             <ShiftEditedModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

export default ShiftEditModal
