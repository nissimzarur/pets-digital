import React, { useRef, useState } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  Form,
} from "react-bootstrap";
import Loading from "../../components/Loading/Loading";

import "./OrderDetailsModal.css";

export default function OrderDetailsModal({
  order,
  editMode,
  showModal,
  showModalHandler,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const clientName = useRef(null);
  const phone = useRef(null);
  const shipmentAddress = useRef(null);
  const orderStatus = useRef(null);
  const price = useRef(null);
  const shipmentType = useRef(null);

  console.log(order);
  const updateClickHandler = () => {
    setIsLoading(true);
    let orderUpdate = {
      _id: order._id,
      client_name: clientName.current.value,
      phone: phone.current.value,
      shipment_address: shipmentAddress.current.value,
      status: orderStatus.current.value,
      price: price.current.value,
      shipment_type: shipmentType.current.value,
    };

    fetch("http://192.168.56.1:3002/orders", {
      method: "PUT",
      body: JSON.stringify(orderUpdate),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {});
    return;
  };

  return (
    <>
      <Modal show={showModal} onHide={showModalHandler}>
        <Modal.Header className="modal-title">
          <Modal.Title>{editMode ? "עדכון הזמנה" : "פרטי ההזמנה"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-inputs">
          <FormControl
            className="order-input"
            aria-label="clientName"
            placeholder={order.client_name}
            ref={clientName}
            type="text"
            disabled={!editMode}
          />
          <FormControl
            className="order-input"
            aria-label="phone"
            placeholder={order.phone}
            ref={phone}
            type="text"
            disabled={!editMode}
          />
          <FormControl
            className="order-input"
            aria-label="shipmentAddress"
            placeholder={order.shipment_address}
            ref={shipmentAddress}
            type="text"
            disabled={!editMode}
          />
          <FormControl
            className="order-input"
            aria-label="price"
            placeholder={order.price + " ₪"}
            ref={price}
            type="number"
            disabled={!editMode}
          />
          <Form.Select
            aria-label="Default select example"
            className="modal-input"
            ref={orderStatus}
          >
            <option style={{ direction: "rtl" }}>סטטוס הזמנה</option>
            <option value="1" style={{ direction: "rtl" }}>
              טרם נשלח
            </option>
            <option value="2" style={{ direction: "rtl" }}>
              נשלח
            </option>
            <option value="3" style={{ direction: "rtl" }}>
              מבוטל
            </option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            className="modal-input"
            ref={shipmentType}
          >
            <option style={{ direction: "rtl" }}>סוג משלוח</option>
            <option value="1" style={{ direction: "rtl" }}>
              משלוח רגיל
            </option>
            <option value="2" style={{ direction: "rtl" }}>
              משלוח מהיר
            </option>
            <option value="3" style={{ direction: "rtl" }}>
              משלוח Express
            </option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer className="modal-buttons">
          <Button variant="secondary" onClick={showModalHandler}>
            סגור
          </Button>
          {editMode && (
            <Button variant="success" onClick={updateClickHandler}>
              עדכן
            </Button>
          )}
        </Modal.Footer>
        <div className="loading-container">{isLoading && <Loading />}</div>
      </Modal>
    </>
  );
}
