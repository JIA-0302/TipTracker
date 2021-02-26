import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { WorkedShiftContext } from "src/providers/WorkedShiftContext";

import styles from "styles/ShiftModal.module.css";
import HourlyWageForm from "./hourly-wage-form";
import ShiftMainForm from "./main-form";
import NonHourlyWageForm from "./non-hourly-wage-form";

interface ModalControllerProps {
  selectedDate: string;
  onModalClose: () => void;
}

export type FormType = "HOURLY" | "NON_HOURLY" | "";

const ModalController = ({
  selectedDate,
  onModalClose,
}: ModalControllerProps): JSX.Element => {
  const { workedShifts } = useContext(WorkedShiftContext);
  const [formType, setFormType] = useState<FormType>("");

  useEffect(() => {
    // If no selected date or not worked for the date, set default form.
    if (selectedDate?.trim().length == 0 || !(selectedDate in workedShifts)) {
      setFormType("");
    } else {
      if (workedShifts[selectedDate]?.wageType === "HOURLY") {
        setFormType("HOURLY");
      } else {
        setFormType("NON_HOURLY");
      }
    }
  }, [selectedDate]);

  let formToShow;
  let modalTitle;
  switch (formType) {
    case "HOURLY":
      formToShow = (
        <HourlyWageForm
          onButtonSelect={() => {
            setFormType("");
            onModalClose();
          }}
          shiftDate={selectedDate}
          shiftId={workedShifts[selectedDate]?.id}
        />
      );
      modalTitle = selectedDate;
      break;
    case "NON_HOURLY":
      formToShow = (
        <NonHourlyWageForm
          onButtonSelect={() => {
            setFormType("");
            onModalClose();
          }}
          shiftDate={selectedDate}
          shiftId={workedShifts[selectedDate]?.id}
        />
      );
      modalTitle = selectedDate;
      break;
    default:
      formToShow = <ShiftMainForm onFormSelect={setFormType} />;
      modalTitle = "Select Wage Type";
  }

  return (
    <Modal
      show={selectedDate?.trim().length > 0}
      size="lg"
      contentClassName={styles.modelStyle}
      backdrop="static"
      centered
      onHide={onModalClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.mainTitle}>
          <h2>{modalTitle}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{formToShow}</Modal.Body>
    </Modal>
  );
};

export default ModalController;
