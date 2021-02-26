import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { HiCreditCard } from "react-icons/hi";
import { FcMoneyTransfer, FcCurrencyExchange } from "react-icons/fc";
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

const NonHourlyWageForm: React.FunctionComponent<ShiftAddModalProps> = ({
  shiftDate,
  shiftId,
  onButtonSelect,
}) => {
  const { removeShiftData, addShiftData } = useContext(WorkedShiftContext);
  const [shiftDetail, setShiftDetail] = useState({
    wageType: "NON_HOURLY",
    shift_date: "",
    total_base_earning: "",
    credit_card_tips: "",
    cash_tips: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shiftId) {
      setLoading(true);
      getShiftData("non-hourly", shiftId)
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
    return {
      ...shiftDetail,
      wageType: "NON_HOURLY",
      shift_date: shiftDate,
    };
  };

  const createShiftDetails = async () => {
    const newShiftDetails = getParsedShiftDetails();
    try {
      setLoading(true);
      const shiftDetail = await createShiftData(newShiftDetails);
      addShiftData({
        [shiftDate]: { id: shiftDetail.shift_id, wageType: "NON_HOURLY" },
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
      await updateShiftData("non-hourly", shiftId, newShiftDetails);
      onButtonSelect();
    } catch (e) {
      window.alert(e.message);
    } finally {
      setLoading(true);
    }
  };

  const deleteData = async () => {
    try {
      setLoading(true);
      await deleteShiftData("non-hourly", shiftId);
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
            <FcCurrencyExchange size={"75px"} />
          </Col>
          <Col xs={6} md={5}>
            <Form.Group controlId="total_base_earning">
              <Form.Label className={styles.modalLabel}>
                Total Base Earnings
              </Form.Label>
              <Form.Control
                onChange={updateShiftDetails}
                type="number"
                placeholder="Enter Hourly wage"
                value={shiftDetail?.total_base_earning}
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

export default NonHourlyWageForm;
