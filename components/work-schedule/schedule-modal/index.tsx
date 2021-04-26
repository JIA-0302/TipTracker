import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import { format } from "date-fns";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { FcClock, FcCalendar } from "react-icons/fc";
import { isSameDay, isAfter } from "date-fns";

import {
  addWorkSchedule,
  updateWorkSchedule,
  deleteWorkSchedule,
  getWorkSchedule,
} from "src/actions/work-schedule";
import { WorkScheduleContext } from "src/providers/WorkScheduleContext";
import DateSelector from "../date-selector";

import styles from "./schedule-modal.module.css";

interface ScheduleProps {
  scheduleId?: number;
  onButtonSelect: () => void;
}

const WorkScheduleForm: React.FunctionComponent<ScheduleProps> = ({
  onButtonSelect,
}) => {
  const { refreshWorkSchedule } = useContext(WorkScheduleContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [workScheduleDetail, setWorkScheduleDetail] = useState({
    startTime: "",
    endTime: "",
    isExistingData: false,
  });

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const todayDate = new Date();
  const shouldRefreshSchedule =
    isSameDay(todayDate, selectedDate) || isAfter(selectedDate, todayDate);

  useEffect(() => {
    setLoading(true);
    getWorkSchedule(formattedDate)
      .then((data) => {
        const { start_time, end_time, isExistingData } = data;
        setWorkScheduleDetail({
          startTime: start_time,
          endTime: end_time,
          isExistingData,
        });
      })
      .catch((e) => {
        window.alert(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedDate]);

  const onDelete = async () => {
    if (workScheduleDetail.isExistingData) {
      setLoading(true);
      await deleteWorkSchedule(formattedDate)
        .then(() => {
          setWorkScheduleDetail({
            startTime: "",
            endTime: "",
            isExistingData: false,
          });
          onButtonSelect();
        })
        .catch((e) => {
          window.alert(e.message);
        })
        .finally(() => {
          setLoading(false);
          if (shouldRefreshSchedule) {
            refreshWorkSchedule();
          }
        });
    }
  };

  const onSubmit = async () => {
    const startTime = `${formattedDate} ${workScheduleDetail.startTime}:00`;
    const endTime = `${formattedDate} ${workScheduleDetail.endTime}:00`;

    const submitFunction = workScheduleDetail?.isExistingData
      ? updateWorkSchedule
      : addWorkSchedule;

    setLoading(true);
    submitFunction(formattedDate, startTime, endTime)
      .then(() => {
        onButtonSelect();
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        setLoading(false);
        if (shouldRefreshSchedule) {
          refreshWorkSchedule();
        }
      });
  };

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
              <DateSelector date={selectedDate} setDate={setSelectedDate} />
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
                value={workScheduleDetail?.startTime}
                onChange={(startTime) => {
                  setWorkScheduleDetail({
                    ...workScheduleDetail,
                    startTime,
                  });
                }}
                className="form-control"
                disabled={loading}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="end_time">
              <Form.Label className={styles.modalLabel}>End Time</Form.Label>
              <TimePicker
                disableClock
                value={workScheduleDetail?.endTime}
                onChange={(endTime) => {
                  setWorkScheduleDetail({
                    ...workScheduleDetail,
                    endTime,
                  });
                }}
                className="form-control"
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>

      {loading && (
        <div className="d-flex mx-auto mb-3 text-muted justify-content-center">
          <Spinner animation="border" className="mr-3" />
        </div>
      )}

      <hr />

      <div className="py-2 d-flex justify-content-around">
        {
          <>
            <Button
              variant="danger"
              className={styles.scheduleEditDeleteButton}
              onClick={onDelete}
              disabled={loading || !workScheduleDetail?.isExistingData}
            >
              Delete
            </Button>
            <Button
              variant="success"
              className={styles.scheduleEditUpdateButton}
              onClick={onSubmit}
              disabled={loading}
            >
              {workScheduleDetail?.isExistingData ? "Update" : "Save"}
            </Button>
          </>
        }
      </div>
    </div>
  );
};

export default WorkScheduleForm;
