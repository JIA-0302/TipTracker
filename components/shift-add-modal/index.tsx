import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { format, formatISO } from "date-fns";
import { HiCreditCard } from "react-icons/hi";
import { FcClock, FcMoneyTransfer, FcCurrencyExchange } from "react-icons/fc";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { createShiftData } from "src/actions/shift-details";

import styles from "styles/ShiftModal.module.css";
interface ShiftAddModalProps {
  date: Date;
  hourly: string;
  show: boolean;
  onHide: (object) => void;
  reload: (any) => void;
}

const ShiftAddModal: React.FunctionComponent<ShiftAddModalProps> = (props) => {
  const [shiftDetails, setShiftDetails] = useState(
    props.hourly === "nonHourly"
      ? {
          wageType: "",
          shift_date: "",
          total_base_earning: "",
          credit_card_tips: "",
          cash_tips: "",
        }
      : {
          wageType: "",
          shift_date: "",
          start_time: "",
          end_time: "",
          hourly_wage: "",
          credit_card_tips: "",
          cash_tips: "",
        }
  );
  const [startTime, onStartTimeChange] = useState();
  const [endTime, onEndTimeChange] = useState();

  const closeModal = () => {
    props.onHide({ wageType: "", wageMode: false });
  };

  const updateShiftDetails = (event) => {
    const { id, value } = event.target;
    setShiftDetails({ ...shiftDetails, [id]: value });
  };

  const createShiftDetails = async () => {
    const shiftDate = formatISO(props.date, { representation: "date" });
    const type = props.hourly === "nonHourly" ? "NON_HOURLY" : "HOURLY";
    const newShiftDetails = {
      ...shiftDetails,
      wageType: type,
      shift_date: shiftDate,
      start_time: `${shiftDate} ${startTime}:00`,
      end_time: `${shiftDate} ${endTime}:00`,
    };

    try {
      await createShiftData(newShiftDetails);
      closeModal();
      props.reload(new Date().getTime());
    } catch (e) {
      window.alert(e.message);
    }
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
                  <Form.Control
                    onChange={updateShiftDetails}
                    type="text"
                    placeholder="Enter Hourly wage"
                  />
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
                    <TimePicker
                      onChange={onStartTimeChange}
                      value={startTime}
                      disableClock
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId="end_time">
                    <Form.Label className={styles.modalLabel}>
                      End Time
                    </Form.Label>
                    <TimePicker
                      onChange={onEndTimeChange}
                      value={endTime}
                      disableClock
                      className="form-control"
                    />
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
                    <Form.Control
                      onChange={updateShiftDetails}
                      type="text"
                      placeholder="Enter Wages"
                    />
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
                <Form.Control
                  onChange={updateShiftDetails}
                  type="text"
                  placeholder="Enter Cash Tips"
                />
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
                <Form.Control
                  onChange={updateShiftDetails}
                  type="text"
                  placeholder="Enter Credit Card Tips"
                />
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
