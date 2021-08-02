import React from "react";
import { connect } from "react-redux";

import { Card, Button } from "react-bootstrap";

import "./ProductCard.css";

function ProductCard({
  product,
  addProductToOrderHandler,
  removeProductFromOrderHandler,
  order,
}) {
  let title = product.title;
  let description = product.description;
  let diableRemoveBtn = true;
  let numberOfProducts = 0;

  if (order.length > 0) {
    const productInOrder = order.filter((p) => p._id == product._id);
    diableRemoveBtn = productInOrder.length > 0 ? false : true;

    numberOfProducts = productInOrder.length;
  }

  return (
    <Card className="product-card-container">
      <Card.Img variant="top" src={product.img_url} />
      <Card.Body>
        <Card.Text className="title">{title}</Card.Text>
        <Card.Text className="description">{description}</Card.Text>
      </Card.Body>
      <div className="add-delete-btns">
        <Button
          variant="danger"
          className="remove-btn"
          onClick={() => removeProductFromOrderHandler(product)}
          disabled={diableRemoveBtn}
        >
          הסר
        </Button>
        <Button
          variant="success"
          className="add-btn"
          onClick={() => addProductToOrderHandler(product)}
        >
          הוסף לעגלה
        </Button>
      </div>
      <div className="number-of-products">{numberOfProducts}</div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  const { orderReducer } = state.OrderReducer;
  const order = orderReducer;

  return { order };
};

export default connect(mapStateToProps)(ProductCard);
