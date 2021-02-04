import React from "react"
import { Button, Col, Modal, Row } from "react-bootstrap"
import styles from "styles/ShiftModal.module.css"
import ShiftAddModal from "../shift-add-modal"

interface ShiftMainAddModalProps {
  date: Date
  hourly?: string
  show: boolean
  onHide: (boolean) => void
}

const ShiftMainAddModal: React.FunctionComponent<ShiftMainAddModalProps> = (
  props
) => {
  const [showWageModel, setWageModel] = React.useState({
    wageType: "",
    wageMode: false,
  })

  const openHourlyWageModal = () => {
    props.onHide(false)
    setWageModel({ wageType: "hourly", wageMode: true })
  }

  const openNonHourlyWageModal = () => {
    props.onHide(false)
    setWageModel({ wageType: "nonHourly", wageMode: true })
  }

  return !props.show && showWageModel.wageMode ? (
    <ShiftAddModal
      date={props.date}
      show={showWageModel.wageMode}
      hourly={showWageModel.wageType}
      onHide={setWageModel}
    />
  ) : (
    <Modal
      {...props}
      size="lg"
      contentClassName={styles.modelStyle}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.mainTitle}>
          Select Your Wage Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className={styles.shiftMainModal}>
          <Col xs={5}>
            <Button className={styles.mainButton} onClick={openHourlyWageModal}>
              Hourly Wages
            </Button>
          </Col>

          <Col xs={5}>
            <Button
              className={styles.mainButton}
              onClick={openNonHourlyWageModal}
            >
              Non-Hourly Wages
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  )
}

// const ShiftMainModal: React.FunctionComponent = () => {
//     const [modalShow, setModalShow] = React.useState(false);
//
//
//     return (
//
//         <>
//             <Button variant="primary" onClick={() => setModalShow(true)}>
//                 Launch Main Model
//             </Button>
//             <ShiftMainAddModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

export default ShiftMainAddModal
