import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import "./Cart.css";
import PreOrderModal from "../../components/PreOrderModal/PreOrderModal";
import AlertModal from "../../components/AlertModal/AlertModal";
import { v4 as uuidv4 } from "uuid";

function Cart({ order, user }) {
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertErrMsg, setAlertErrMsg] = useState("");

  const showModalHandler = () => {
    if (Object.keys(user).length === 0) {
      setAlertErrMsg("אנא התחבר בכדי להמשיך לביצוע ההזמנה");
      setShowAlertModalHandler();
    } else setShowModal(!showModal);
  };

  const setShowAlertModalHandler = () => {
    setShowAlertModal(!showAlertModal);
  };

  const calcOrderPrice = () => {
    let totalPrice = 0;
    order.forEach((product) => {
      totalPrice += parseInt(product.price);
    });

    return totalPrice;
  };

  const loadProducts = () => {
    let rowNum = 0;
    let rowsContent = [];
    let orderProductsIds = [];
    if (order.length === 0) return <div>אנא הוסף מוצרים לסל הקניות</div>;

    order.forEach((product) => {
      let productsPrice = 0;
      let sameProduct = order.filter((p) => p._id === product._id);

      if (!orderProductsIds.includes(product._id))
        orderProductsIds.push(product._id);
      else return;

      rowNum++;
      sameProduct.forEach(
        (product) => (productsPrice += parseInt(product.price))
      );

      let content = (
        <tr key={uuidv4()}>
          <td>{productsPrice} ₪</td>
          <td>{sameProduct.length}</td>
          <td>{product.title}</td>
          <td>{rowNum}</td>
        </tr>
      );
      rowsContent.push(content);
    });

    let totalPriceRow = (
      <tr className="total-price-row" key={uuidv4()}>
        <td>{calcOrderPrice() + " ₪"}</td>
        <td>סה"כ</td>
        <td></td>
        <td></td>
      </tr>
    );
    rowsContent.push(totalPriceRow);
    return rowsContent;
  };

  const loadPageContent = () => {
    var content = [
      <AlertModal
        showAlertModal={showAlertModal}
        setShowAlertModalHandler={setShowAlertModalHandler}
        errMsg={alertErrMsg}
        key={uuidv4()}
      />,
      <PreOrderModal
        showModal={showModal}
        showModalHandler={showModalHandler}
        orderPrice={calcOrderPrice()}
        key={uuidv4()}
      />,
      <div className="cart-title" key={uuidv4()}>
        סיכום סל הקניות
      </div>,
      <Table striped bordered hover key={uuidv4()}>
        <thead>
          <tr>
            <th>מחיר</th>
            <th>כמות</th>
            <th>שם המוצר</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>{loadProducts()}</tbody>
      </Table>,
      <div className="order-btn-container" key={uuidv4()}>
        <Button
          variant="success"
          className="cart-order-btn"
          onClick={showModalHandler}
        >
          בצע הזמנה
        </Button>
      </div>,
    ];

    if (order.length > 0) return content;
    else
      return (
        <div className="no-products-title">לא קיימים מוצרים בסל הקניות.</div>
      );
  };
  return <div className="cart-table">{loadPageContent()}</div>;
}

const mapStateToProps = (state) => {
  const { orderReducer } = state.OrderReducer;
  const { user } = state.UserReducer;
  const order = orderReducer;

  return { order, user };
};

export default connect(mapStateToProps)(Cart);
