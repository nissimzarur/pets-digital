import React, { useEffect, useState } from "react";
import { Button, Table, Image } from "react-bootstrap";
import "./Orders";

import OrderDetailsModal from "./../../components/OrderDetailsModal/OrderDetailsModal";

export default function Orders() {
  const [ordersContent, setOrderContent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [mode, setMode] = useState(false);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };
  const orderStatus = {
    0: "טרם נשלח",
    1: "נשלח",
    2: "מבוטל",
  };

  const shipmentType = {
    1: "משלוח רגיל",
    2: "משלוח מהיר",
    3: "משלוח Express",
  };

  const handleRowClick = (order, mode) => {
    console.log({ mode: mode });
    setCurrentOrder(order);
    setShowModal(true);
    setMode(mode);
  };

  useEffect(() => {
    fetch("http://192.168.56.1:3002/orders", { method: "GET" })
      .then((results) => results.json())
      .then((ordersResp) => {
        if (ordersResp.success) {
          if (ordersResp.orders.length > 0) {
            let content = [];
            let rowNum = 0;
            ordersResp.orders.forEach((order) => {
              rowNum++;
              content.push(
                <tr>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleRowClick(order, true);
                        }}
                      >
                        <Image src="./assets/images/edit.png" />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleRowClick(order, true);
                        }}
                      >
                        <Image src="./assets/images/delete.png" />
                      </Button>
                    </div>
                  </td>
                  <td>{orderStatus[order.status]}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(order, false)}
                  >
                    {order._id.substr(order._id.length - 8)}
                  </td>
                  <td>{rowNum}</td>
                </tr>
              );
            });
            setOrderContent(content);
          } else return setOrderContent([]);
        } else return alert(ordersResp.errMsg);
      })
      .catch((e) => console.log(e));
  }, []);

  const loadOrdersContent = () => {
    if (!ordersContent) return <div>אין הזמנות להצגה</div>;

    let table = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>סטטוס</th>
            {/* <th>מחיר</th> */}
            <th>מספר הזמנה</th>
            {/* <th>שם הלקוח</th> */}
            <th>#</th>
          </tr>
        </thead>
        <tbody>{ordersContent}</tbody>
      </Table>
    );
    return table;
  };
  return (
    <>
      {[
        <OrderDetailsModal
          showModal={showModal}
          showModalHandler={showModalHandler}
          order={currentOrder}
          editMode={mode}
        />,
        loadOrdersContent(),
      ]}
    </>
  );
}
