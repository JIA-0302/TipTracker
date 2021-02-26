import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { HiCreditCard } from "react-icons/hi";
import { FcClock, FcMoneyTransfer, FcCurrencyExchange } from "react-icons/fc";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { WorkedShiftContext } from "src/providers/WorkedShiftContext";
import {
  createShiftData,
  deleteShiftData,
  getShiftData,
  updateShiftData,
} from "src/actions/shift-details";

import styles from "styles/ShiftModal.module.css";

interface ShiftAddModalProps {
  shiftDate: string;
  shiftId?: number;
  onButtonSelect: () => void;
}

const HourlyWageForm: React.FunctionComponent<ShiftAddModalProps> = ({
  shiftDate,
  shiftId,
  onButtonSelect,
}) => {
  const { removeShiftData, addShiftData } = useContext(WorkedShiftContext);
  const [shiftDetail, setShiftDetail] = useState({
    wageType: "HOURLY",
    shift_date: "",
    start_time: "",
    end_time: "",
    hourly_wage: "",
    credit_card_tips: "",
    cash_tips: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shiftId) {
      setLoading(true);
      getShiftData("hourly", shiftId)
        .then((data) => {
          setShiftDetail({
            ...data,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [shiftDate, shiftId]);

  const updateShiftDetails = (event) => {
    const { id, value } = event.target;
    setShiftDetail({ ...shiftDetail, [id]: value });
  };

  const getParsedShiftDetails = () => {
    const { start_time, end_time } = shiftDetail;
    return {
      ...shiftDetail,
      wageType: "HOURLY",
      shift_date: shiftDate,
      start_time: `${shiftDate} ${start_time}:00`,
      end_time: `${shiftDate} ${end_time}:00`,
    };
  };

  const createShiftDetails = async () => {
    const newShiftDetails = getParsedShiftDetails();
    try {
      setLoading(true);
      const shiftDetail = await createShiftData(newShiftDetails);
      addShiftData({
        [shiftDate]: { id: shiftDetail.shift_id, wageType: "HOURLY" },
      });
      onButtonSelect();
    } catch (e) {
      window.alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateEditedShiftData = async () => {
    const newShiftDetails = getParsedShiftDetails();
    try {
      setLoading(true);
      await updateShiftData("hourly", shiftId, newShiftDetails);
      onButtonSelect();
    } catch (e) {
      window.alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    try {
      setLoading(true);
      await deleteShiftData("hourly", shiftId);
      removeShiftData(shiftDate);
      onButtonSelect();
    } catch (e) {
      window.alert(e.message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div>
      <Form>
        <Form.Row>
          <Col xs={3}>
            <FcClock size={"75px"} />
          </Col>
          <Col xs={4}>
            <Form.Group controlId="start_time">
              <Form.Label className={styles.modalLabel}>Start Time</Form.Label>
              <TimePicker
                onChange={(time) =>
                  setShiftDetail({ ...shiftDetail, start_time: time })
                }
                value={shiftDetail?.start_time}
                disableClock
                className="form-control"
                disabled={loading}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="end_time">
              <Form.Label className={styles.modalLabel}>End Time</Form.Label>
              <TimePicker
                onChange={(time) =>
                  setShiftDetail({ ...shiftDetail, end_time: time })
                }
                value={shiftDetail?.end_time}
                disableClock
                className="form-control"
                disabled={loading}
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
                type="number"
                placeholder="Enter Wages"
                value={shiftDetail?.hourly_wage}
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Form.Row>

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
                type="number"
                placeholder="Enter Cash Tips"
                value={shiftDetail?.cash_tips}
                disabled={loading}
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
                type="number"
                placeholder="Enter Credit Card Tips"
                value={shiftDetail?.credit_card_tips}
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <hr />

      <div className="py-2 d-flex justify-content-around">
        {!shiftId ? (
          <Button
            variant="success"
            className={styles.shiftAddSubmitButton}
            onClick={createShiftDetails}
            disabled={loading}
          >
            Submit
          </Button>
        ) : (
          <>
            <Button
              variant="danger"
              className={styles.shiftEditDeleteButton}
              onClick={deleteData}
              disabled={loading}
            >
              Delete
            </Button>
            <Button
              variant="success"
              className={styles.shiftEditUpdateButton}
              onClick={updateEditedShiftData}
              disabled={loading}
            >
              Update
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HourlyWageForm;
