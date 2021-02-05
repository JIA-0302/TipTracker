import React, { useState } from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import styles from "styles/ShiftModal.module.css"
import { format } from "date-fns"
import { AiFillDollarCircle } from "react-icons/ai"
import { IoIosCash } from "react-icons/io"
import { HiCreditCard } from "react-icons/hi"
import { ShiftData } from "components/work-calendar"

interface ShiftEditModalProps {
  date: Date
  onHide: (boolean) => void
  show: boolean
  data: ShiftData
  updateData: (data: ShiftData) => void
}

const ShiftEditModal: React.FunctionComponent<ShiftEditModalProps> = (
  props
) => {
  const [userData, updateUserData] = useState({
    earnings: 110.5,
    cashTips: 230,
    ccTips: 55,
    active: true,
  })
  const closeModal = () => {
    props.onHide(false)
  }

  const updateData = () => {
    props.onHide(false)
    const newData = { ...userData }
    props.updateData(newData)
  }

  const deleteData = () => {
    props.onHide(false)
    const deleteData = { ...userData, active: false }
    props.updateData(deleteData)
  }

  const earnings = ({ target: { value } }) => {
    updateUserData({ ...userData, earnings: value })
  }
  const cashTips = ({ target: { value } }) => {
    updateUserData({ ...userData, cashTips: value })
  }
  const ccTips = ({ target: { value } }) => {
    updateUserData({ ...userData, ccTips: value })
  }

  return (
    <Modal
      {...props}
      size="lg"
      contentClassName={styles.modelStyle}
      backdrop="static"
    >
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className={styles.shiftTitle}>
          {props.date ? format(props.date, "P") : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.shiftEditBody}>
        <Form>
          <Form.Row>
            <Col xs={4}>
              <AiFillDollarCircle size={"75px"} />
            </Col>
            <Col xs={5}>
              <Form.Group controlId={"baseEarning"}>
                <Form.Label className={styles.modalLabel}>
                  Total Base Earnings
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={`${props.data.earnings}`}
                  placeholder="Enter Earnings"
                  onChange={earnings}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col xs={4}>
              <IoIosCash size={"75px"} />
            </Col>
            <Col xs={5}>
              <Form.Group controlId={"cashTips"}>
                <Form.Label className={styles.modalLabel}>
                  Total Cash Tips
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={`${props.data.cashTips}`}
                  placeholder="Enter Cash Tips"
                  onChange={cashTips}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col xs={4}>
              <HiCreditCard size={"75px"} />
            </Col>
            <Col xs={5}>
              <Form.Group controlId={"ccTip"}>
                <Form.Label className={styles.modalLabel}>
                  Total Credit Card Tips
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={`${props.data.ccTips}`}
                  placeholder="Enter Credit Card Tips"
                  onChange={ccTips}
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.shiftEditDeleteButton} onClick={deleteData}>
          Delete
        </Button>
        <Button className={styles.shiftEditUpdateButton} onClick={updateData}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShiftEditModal
