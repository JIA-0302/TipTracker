import React from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import ShiftAddModal from "../shift-add-modal";


function ShiftMainAddModal(props) {
    const [showMainAddModel, setMainAddModel] = React.useState(true);
    const [NonhourlyWage, setNonHourlyWage] = React.useState(false);


    const openHourlyWageModel = (hideMainModel) => {
        setMainAddModel(false);
        setNonHourlyWage(false);
        hideMainModel();
    };

    const openNonHourlyWageModel = (hideMainModel) => {
        setMainAddModel(false);
        setNonHourlyWage(true);
        hideMainModel();
    };

    return !(showMainAddModel) ?
        <ShiftAddModal hourly={NonhourlyWage} showAddModal={true} setMainModal={setMainAddModel}/> :

     (
        <Modal
            {...props}
            size="lg"
            contentClassName={styles.modelStyle}
        >
            <Modal.Header closeButton>
                <Modal.Title style={{color:"grey", margin:"auto"}}>
                    Select Your Wage Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className={styles.shiftMainModal}>
                    <Col xs={5}>
                        <Button className={styles.mainButton} onClick={() => openHourlyWageModel(props.onHide)}>
                            Hourly Wages
                        </Button>
                    </Col>

                    <Col xs={5}>
                        <Button  className={styles.mainButton} onClick={() => openNonHourlyWageModel(props.onHide)}>
                            Non-Hourly Wages
                        </Button>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
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
