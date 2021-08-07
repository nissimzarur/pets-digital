import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import "./Cart.css";
import PreOrderModal from "../../components/PreOrderModal/PreOrderModal";

function Cart({ order, user }) {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    if (Object.keys(user).length === 0)
      return alert("אנא התחבר למערכת בכדי להתקדם לביצוע ההזמנה");
    setShowModal(!showModal);
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
        <tr>
          <td>{productsPrice} ₪</td>
          <td>{sameProduct.length}</td>
          <td>{product.title}</td>
          <td>{rowNum}</td>
        </tr>
      );
      rowsContent.push(content);
    });

    let totalPriceRow = (
      <tr className="total-price-row">
        <td>{calcOrderPrice() + " ₪"}</td>
        <td>סה"כ</td>
        <td></td>
        <td></td>
      </tr>
    );
    rowsContent.push(totalPriceRow);
    return rowsContent;
  };
  return (
    <>
      <div className="cart-table">
        {order.length > 0 ? (
          [
            <PreOrderModal
              showModal={showModal}
              showModalHandler={showModalHandler}
              orderPrice={calcOrderPrice()}
            />,
            <div className="cart-title">סיכום סל הקניות</div>,
            <Table striped bordered hover>
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
            <div className="order-btn-container">
              <Button
                variant="success"
                className="order-btn"
                onClick={showModalHandler}
              >
                בצע הזמנה
              </Button>
            </div>,
          ]
        ) : (
          <div className="no-products-title">לא קיימים מוצרים בסל הקניות.</div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { orderReducer } = state.OrderReducer;
  const { user } = state.UserReducer;
  const order = orderReducer;

  return { order, user };
};

export default connect(mapStateToProps)(Cart);
