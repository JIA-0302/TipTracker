import React, {useEffect, useState} from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import styles from "styles/ShiftModal.module.css";
import {format} from "date-fns";
import { HiCreditCard } from "react-icons/hi";
import { FcMoneyTransfer, FcCurrencyExchange } from "react-icons/fc";

interface ShiftEditModalProps {
  date: Date;
  onHide: (boolean) => void;
  show: boolean;
  data: any;
  reload: (any) => void;
}

const ShiftEditModal: React.FunctionComponent<ShiftEditModalProps> = (
  props
) => {

  const [updatedShiftData, setUpdatedShiftData] = useState({});
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch((props.data.hourly ? 'api/shift-details/hourly/' : 'api/shift-details/non-hourly/')  + props.data.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return response.text().then(text => {
                  throw new Error(text)
                })
              }
            }
        )
        .then(data => {
          setUpdatedShiftData(data.shiftDetail);
          setUserData(data);
        })
        .catch((error) => {
          console.error(error.message);
        });

  }, [setUserData]);

  const editShiftData = (event) => {
    const {id, value} = event.target;
    setUpdatedShiftData({...updatedShiftData, [id]: value});
  };
  const updateEditedShiftData = () => {
    let data;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let shift_date = userData.shiftDetail ? userData.shiftDetail.shift_date : '';
    shift_date = format(new Date(shift_date), 'yyyy-MM-dd');

    if (props.data.hourly)  {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let shift_date = userData.shiftDetail ? userData.shiftDetail.shift_date : '';
      shift_date = format(new Date(shift_date), 'yyyy-MM-dd');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let shift_start = userData.shiftDetail ? userData.shiftDetail.start_time : '';
      shift_start = format(new Date(shift_start), 'yyyy-MM-dd HH:mm:SS');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let shift_end = userData.shiftDetail ? userData.shiftDetail.end_time : '';
      shift_end = format(new Date(shift_end), 'yyyy-MM-dd HH:mm:SS');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const hourly_wage = userData.shiftDetail ? userData.shiftDetail.hourly_wage : '';
      data = {...updatedShiftData, shift_date:shift_date, start_time: shift_start, end_time: shift_end, hourly_wage: hourly_wage};
    } else {
      data = {...updatedShiftData, shift_date:shift_date};
    }



    fetch((props.data.hourly ? 'api/shift-details/hourly/' : 'api/shift-details/non-hourly/') + props.data.id , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
        .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return response.text().then(text => {
                  throw new Error(text)
                })
              }
            }
        )
        .then(() => {
          closeModal();
          props.reload(new Date().getTime());
        })
        .catch((error) => {
          console.error(error.message);
        });
  };
  const deleteShiftData = () => {
    fetch((props.data.hourly ? 'api/shift-details/hourly/' : 'api/shift-details/non-hourly/') + props.data.id , {
      method: 'DELETE'
    })
        .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return response.text().then(text => {
                  throw new Error(text)
                })
              }
            }
        )
        .then(() => {
          closeModal();
         props.reload(new Date().getTime());
        })
        .catch((error) => {
          console.error(error.message);
        });
  };
  const closeModal = () => {
    props.onHide(false);
  };
   const calcBaseEarning = () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     // @ts-ignore
     const timeDifference = Math.abs (new Date (userData.shiftDetail.start_time).getTime() - new Date (userData.shiftDetail.end_time).getTime());
     const hours = timeDifference / 1000 / 3600;
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     // @ts-ignore
     const earnings = userData.shiftDetail.hourly_wage * hours;
     return earnings;
  };

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
          <Form.Row>
            <Col xs={3}>
              <FcCurrencyExchange size={"75px"} />
            </Col>
            <Col xs={6}>
              <Form.Group controlId={"total_base_earning"}>
                <Form.Label className={styles.modalLabel}>
                  Total Base Earnings
                </Form.Label>

                <Form.Control
                  type="text"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                 defaultValue={`${userData.shiftDetail ? props.data.hourly == 0 ?  userData.shiftDetail.total_base_earning :  calcBaseEarning() : ''}`}
                  placeholder="Enter Earnings"
                  onChange={editShiftData}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col xs={3}>
              <FcMoneyTransfer size={"75px"} />
            </Col>
            <Col xs={6}>
              <Form.Group controlId={"cash_tips"}>
                <Form.Label className={styles.modalLabel}>
                  Total Cash Tips
                </Form.Label>
                <Form.Control
                  type="text"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                  defaultValue={`${userData.shiftDetail ? userData.shiftDetail.cash_tips : ''}`}
                  placeholder="Enter Cash Tips"
                  onChange={editShiftData}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col xs={3}>
              <HiCreditCard size={"75px"} />
            </Col>
            <Col xs={6}>
              <Form.Group controlId={"credit_card_tips"}>
                <Form.Label className={styles.modalLabel}>
                  Total Credit Card Tips
                </Form.Label>
                <Form.Control
                  type="text"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                  defaultValue={`${userData.shiftDetail ? userData.shiftDetail.credit_card_tips : ''}`}
                  placeholder="Enter Credit Card Tips"
                  onChange={editShiftData}
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="py-3">
        <Button
          variant="danger"
          className={styles.shiftEditDeleteButton}
          onClick={deleteShiftData}
        >
          Delete
        </Button>
        <Button
          variant="success"
          className={styles.shiftEditUpdateButton}
          onClick={updateEditedShiftData}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShiftEditModal;
