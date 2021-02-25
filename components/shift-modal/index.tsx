import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { WorkedShiftContext } from "src/providers/WorkedShiftContext";

import styles from "styles/ShiftModal.module.css";
import ShiftMainForm from "./main-form";

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
      formToShow = <h1>HOURLY FORM</h1>;
      modalTitle = selectedDate;
      break;
    case "NON_HOURLY":
      formToShow = <h1>NON-HOURLY FORM</h1>;
      modalTitle = selectedDate;
      break;
    default:
      formToShow = <ShiftMainForm onFormSelect={setFormType} />;
      modalTitle = "Select Wage Type";
  }

  return (
    <Modal
      show={selectedDate && selectedDate.length > 0}
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
