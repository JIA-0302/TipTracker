import React from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import styles from "styles/ShiftModal.module.css"
import { format } from "date-fns"
import { HiCreditCard } from "react-icons/hi"
import { FcClock, FcMoneyTransfer, FcCurrencyExchange } from "react-icons/fc"

interface ShiftAddModalProps {
  date: Date
  hourly: string
  show: boolean
  onHide: (object) => void
}

const ShiftAddModal: React.FunctionComponent<ShiftAddModalProps> = (props) => {
  const closeModal = () => {
    props.onHide({ wageType: "", wageMode: false })
  }

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
                <Form.Label className={styles.modalLabel}>
                  Total Base Earnings
                </Form.Label>
                <Form.Control type="text" placeholder="Enter Hourly wage" />
              </Col>
            </Form.Row>
          ) : (
            <div>
              <Form.Row>
                <Col xs={3}>
                  <FcClock size={"75px"} />
                </Col>
                <Col xs={4}>
                  <Form.Label className={styles.modalLabel}>
                    Start Time
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Start Time"
                    style={{ lineHeight: "10px" }}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Label className={styles.modalLabel}>
                    End Time
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter End Time" />
                </Col>
              </Form.Row>
              <Form.Row className="mt-4">
                <Col xs={3}>
                  <FcCurrencyExchange size={"75px"} />
                </Col>
                <Col xs={6} md={5}>
                  <Form.Label className={styles.modalLabel}>
                    Hourly Wages
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter Wages" />
                </Col>
              </Form.Row>
            </div>
          )}

          <Form.Row className="mt-4">
            <Col xs={3}>
              <FcMoneyTransfer size={"75px"} />
            </Col>
            <Col xs={6} md={5}>
              <Form.Label className={styles.modalLabel}>
                Total Cash Tips
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Cash Tips" />
            </Col>
          </Form.Row>

          <Form.Row className="mt-4">
            <Col xs={3}>
              <HiCreditCard size={"75px"} />
            </Col>
            <Col xs={6} md={5}>
              <Form.Label className={styles.modalLabel}>
                Total Credit Card Tips
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Credit Card Tips" />
            </Col>
          </Form.Row>
          <Form.Row></Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="py-3">
        <Button
          variant="success"
          className={styles.shiftAddSubmitButton}
          onClick={closeModal}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShiftAddModal
