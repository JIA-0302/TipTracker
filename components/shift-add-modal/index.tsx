import React, {useState} from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import {format, formatISO} from "date-fns";
import { HiCreditCard } from "react-icons/hi";
import { FcClock, FcMoneyTransfer, FcCurrencyExchange } from "react-icons/fc";

interface ShiftAddModalProps {
  date: Date;
  hourly: string;
  show: boolean;
  onHide: (object) => void;
  reload:(any) => void;
}

const ShiftAddModal: React.FunctionComponent<ShiftAddModalProps> = (props) => {
  const [shiftDetails, setShiftDetails] = useState(props.hourly === 'nonHourly' ? {wageType: '',
    shift_date: '', total_base_earning: '', credit_card_tips: '', cash_tips: ''}
    : {wageType: '', shift_date: '', start_time: '', end_time: '', hourly_wage: '', credit_card_tips: '', cash_tips: ''});

  const closeModal = () => {
    props.onHide({ wageType: "", wageMode: false });
  };

 const updateShiftDetails = (event) => {
   const {id, value} = event.target;
   setShiftDetails({...shiftDetails, [id]: value});

 };

 const createShiftDetails = () => {
   const shiftDate = formatISO(props.date, { representation: 'date' });
   const type = props.hourly === 'nonHourly' ? 'NON_HOURLY' : 'HOURLY';
   const currentShiftDetails = {...shiftDetails, wageType: type, shift_date:shiftDate};
   postShiftData(currentShiftDetails);
  };

  const postShiftData = (data) => {
    fetch('api/shift-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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
          closeModal();
          props.reload(new Date().getTime());
        })
        .catch((error) => {
          console.error(error.message);
        });
  };

  return (
    <Modal
      {...props}
      size="lg"
      contentClassName={styles.modelStyle}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className={styles.shiftTitle}>
          <h2>{props.date ? format(props.date, "P") : ""}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.shiftEditBody}>
        <Form>
          {props.hourly === "nonHourly" ? (
            <Form.Row>
              <Col xs={3}>
                <FcCurrencyExchange size={"75px"} />
              </Col>
              <Col xs={6} md={5}>
                <Form.Group controlId="total_base_earning">
                <Form.Label className={styles.modalLabel}>
                  Total Base Earnings
                </Form.Label>
                <Form.Control onChange={updateShiftDetails} type="text" placeholder="Enter Hourly wage" />
                </Form.Group>
              </Col>
            </Form.Row>
          ) : (
            <div>
              <Form.Row>
                <Col xs={3}>
                  <FcClock size={"75px"} />
                </Col>
                <Col xs={4}>
                  <Form.Group controlId="start_time">
                  <Form.Label className={styles.modalLabel}>
                    Start Time
                  </Form.Label>
                  <Form.Control
                    onChange={updateShiftDetails}
                    type="text"
                    placeholder="Enter Start Time"
                    style={{ lineHeight: "10px" }}
                  />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId="end_time">
                  <Form.Label className={styles.modalLabel}>
                    End Time
                  </Form.Label>
                  <Form.Control onChange={updateShiftDetails} type="text" placeholder="Enter End Time" />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row className="mt-4">
                <Col xs={3}>
                  <FcCurrencyExchange size={"75px"} />
                </Col>
                <Col xs={6} md={5}>
                  <Form.Group controlId="hourly_wage">
                  <Form.Label className={styles.modalLabel}>
                    Hourly Wages
                  </Form.Label>
                  <Form.Control onChange={updateShiftDetails} type="text" placeholder="Enter Wages" />
                  </Form.Group>
                </Col>
              </Form.Row>
            </div>
          )}

          <Form.Row className="mt-4">
            <Col xs={3}>
              <FcMoneyTransfer size={"75px"} />
            </Col>
            <Col xs={6} md={5}>
              <Form.Group controlId="cash_tips">
              <Form.Label className={styles.modalLabel}>
                Total Cash Tips
              </Form.Label>
              <Form.Control onChange={updateShiftDetails} type="text" placeholder="Enter Cash Tips" />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row className="mt-4">
            <Col xs={3}>
              <HiCreditCard size={"75px"} />
            </Col>
            <Col xs={6} md={5}>
              <Form.Group controlId="credit_card_tips">
              <Form.Label className={styles.modalLabel}>
                Total Credit Card Tips
              </Form.Label>
              <Form.Control onChange={updateShiftDetails} type="text" placeholder="Enter Credit Card Tips" />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="py-3">
        <Button
          variant="success"
          className={styles.shiftAddSubmitButton}
          onClick={createShiftDetails}
          type="submit"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShiftAddModal;
