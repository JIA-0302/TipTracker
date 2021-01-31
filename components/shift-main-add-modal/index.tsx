import React from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import ShiftAddModal from "../shift-add-modal";


function ShiftMainAddModal(props) {
    const [showMainAddModel, setMainAddModel] = React.useState(true);
    const [hourlyWage, setHourlyWage] = React.useState(false);


    const openHourlyWageModel = (hideMainModel) => {
        setMainAddModel(false);
        setHourlyWage(true);
        hideMainModel();
    };

    const openNonHourlyWageModel = (hideMainModel) => {
        setMainAddModel(false);
        setHourlyWage(false);
        hideMainModel();
    };

    return !(showMainAddModel) ?
        <ShiftAddModal hourly={hourlyWage} showAddModal={true} setMainModal={setMainAddModel}/> :

     (
        <Modal
            {...props}
            size="lg"
            dialogClassName={styles.modelContent}

        >
            <Modal.Header closeButton>
                <Modal.Title className={styles.shiftTitle}>
                    Select Wage Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.shiftEditBody}>
                <Row>
                    <Col xs={5}>
                        <Button onClick={() => openHourlyWageModel(props.onHide)}>
                            Hourly Wages
                        </Button>
                    </Col>

                    <Col xs={5}>
                        <Button onClick={() => openNonHourlyWageModel(props.onHide)}>
                            Non-Hourly Wages
                        </Button>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ShiftMainModal: React.FunctionComponent = () => {
    const [modalShow, setModalShow] = React.useState(false);


    return (

        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch Main Model
            </Button>
            <ShiftMainAddModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ShiftMainModal
