import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { FcClock, FcCalendar } from "react-icons/fc";
import styles from "styles/ShiftModal.module.css";
import DateSelector from "../date-selector";

interface ScheduleProps {
  scheduleId?: number;
  onButtonSelect: () => void;
}

const WorkScheduleForm: React.FunctionComponent<ScheduleProps> = ({
  onButtonSelect,
}) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("18:00");

  return (
    <div>
      <Form>
        <Form.Row>
          <Col xs={3}>
            <FcCalendar size={"60px"} />
          </Col>
          <Col xs={3}>
            <Form.Group controlId="shift_date">
              <Form.Label className={styles.modalLabel}>Shift Date</Form.Label>
              <DateSelector date={date} setDate={setDate} />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={3}>
            <FcClock size={"60px"} />
          </Col>
          <Col xs={4}>
            <Form.Group controlId="start_time">
              <Form.Label className={styles.modalLabel}>Start Time</Form.Label>
              <TimePicker
                disableClock
                value={startTime}
                onChange={setStartTime}
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="end_time">
              <Form.Label className={styles.modalLabel}>End Time</Form.Label>
              <TimePicker
                disableClock
                value={endTime}
                onChange={setEndTime}
                className="form-control"
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <hr />

      <div className="py-2 d-flex justify-content-around">
        {
          <>
            <Button
              variant="success"
              className={styles.scheduleAddSubmitButton}
              onClick={onButtonSelect}
            >
              Submit
            </Button>
            <Button
              variant="danger"
              className={styles.scheduleEditDeleteButton}
              onClick={onButtonSelect}
            >
              Delete
            </Button>
            <Button
              variant="success"
              className={styles.scheduleEditUpdateButton}
              onClick={onButtonSelect}
            >
              Update
            </Button>
          </>
        }
      </div>
    </div>
  );
};

export default WorkScheduleForm;
