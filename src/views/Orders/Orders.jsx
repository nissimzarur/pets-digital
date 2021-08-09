import React, { useEffect, useState } from "react";
import { Button, Table, Image } from "react-bootstrap";
import "./Orders.css";

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
    1: "טרם נשלח",
    2: "נשלח",
    3: "מבוטל",
  };

  const handleRowClick = (order, mode) => {
    setCurrentOrder(order);
    setShowModal(true);
    setMode(mode);
  };

  const deleteOrder = (order) => {
    let orderId = order._id;
    fetch("http://192.168.56.1:3002/orders", {
      method: "DELETE",
      body: JSON.stringify({ _id: orderId }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        if (result.success) fetchOrders();
        else alert("חלה שגיאה בעת נסיון מחיקת ההזמנה");
      })
      .catch((e) => console.log(e));
  };

  const fetchOrders = () => {
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
                        className="order-btn"
                      >
                        <Image src="./assets/images/edit.png" />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteOrder(order);
                        }}
                        className="order-btn"
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
  };

  useEffect(() => {
    fetchOrders();
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
          callback={fetchOrders}
        />,
        loadOrdersContent(),
      ]}
    </>
  );
}
