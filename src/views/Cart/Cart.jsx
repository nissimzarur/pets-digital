import React from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import "./Cart.css";

function Cart({ order }) {
  const calcOrderPrice = () => {
    let totalPrice = 0;

    order.forEach((product) => {
      totalPrice += parseInt(product.price);
    });

    return totalPrice;
  };

  const loadProducts = () => {
    let rowsContent = [];
    if (order.length == 0) return <div>אנא הוסף מוצרים לסל הקניות</div>;
    order.forEach((product, index) => {
      let rowNum = ++index;
      let content = (
        <tr>
          <td>{product.price} ₪</td>
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
      </tr>
    );
    rowsContent.push(totalPriceRow);
    return rowsContent;
  };
  return (
    <div className="cart-table">
      {order.length > 0 ? (
        [
          <div className="cart-title">סיכום סל הקניות</div>,
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>מחיר</th>
                <th>שם המוצר</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>{loadProducts()}</tbody>
          </Table>,
          <div className="order-btn-container">
            <Button variant="success" className="order-btn">
              בצע הזמנה
            </Button>
          </div>,
        ]
      ) : (
        <div className="no-products-title">לא קיימים מוצרים בסל הקניות.</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { orderReducer } = state.OrderReducer;
  const order = orderReducer;

  return { order };
};

export default connect(mapStateToProps)(Cart);
