import React, { useContext, useEffect, useState } from "react";
import { FcExpired, FcBriefcase } from "react-icons/fc";
import { format, parse } from "date-fns";
import { Spinner } from "react-bootstrap";

import { getUpcomingWorkSchedule } from "src/actions/work-schedule";

import styles from "./schedule-display.module.css";
import { WorkScheduleContext } from "src/providers/WorkScheduleContext";

const WorkSchedule = (): JSX.Element => {
  const { hasNewSchedule, foundWorkSchedule } = useContext(WorkScheduleContext);
  const [loading, setLoading] = useState(false);
  const [workSchedule, setWorkSchedule] = useState(null);

  useEffect(() => {
    const formattedDate = format(new Date(), "yyyy-MM-dd");

    if (hasNewSchedule) {
      setLoading(true);

      getUpcomingWorkSchedule(formattedDate)
        .then((data) => {
          setWorkSchedule(data);
        })
        .catch((e) => {
          window.alert(e.message);
          setWorkSchedule(null);
        })
        .finally(() => {
          setLoading(false);
          foundWorkSchedule();
        });
    }
  }, [hasNewSchedule]);

  let content;
  if (loading) {
    content = (
      <Spinner animation="border" role="status" className="align-self-center">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else if (workSchedule) {
    const { shiftDate, startTime, endTime } = workSchedule;
    const parsedShiftDate = parse(shiftDate, "yyyy-MM-dd", new Date());
    const formattedShiftDate = format(parsedShiftDate, "EEEE, MMMM d");

    content = (
      <div className="text-center d-flex flex-column justify-content-around align-items-center">
        <h3>You have an upcoming work shift </h3>
        <FcBriefcase fontSize="5rem" />
        <div>
          <h5>{formattedShiftDate}</h5>
          <h2>
            {startTime} - {endTime}
          </h2>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center">You do not have any upcoming work shift</h3>
        <FcExpired fontSize="5rem" className="mt-3" />
      </div>
    );
  }

  return <div className={styles.div}>{content}</div>;
};

export default WorkSchedule;
