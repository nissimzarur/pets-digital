import React, { useState, useEffect } from "react";
import {
  addProductToOrder,
  removeProductFromOrder,
} from "./../../redux/Order/actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Loading from "../../components/Loading/Loading";
import ProductCard from "./../../components/ProductCard/ProductCard";
import "./Products.css";

function Products({ addProductToOrder, removeProductFromOrder }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pageProducts, setPageProducts] = useState([]);

  useEffect(() => {
    let tempProducts = [];

    const fetchProducts = () => {
      return fetch(`${process.env.REACT_APP_IP_ADDRESS}/products`)
        .then((results) => results.json())
        .then((products) => {
          products.data.forEach((product, key) => {
            tempProducts.push(
              <ProductCard
                product={product}
                key={key}
                addProductToOrderHandler={addProductToOrder}
                removeProductFromOrderHandler={removeProductFromOrder}
              />
            );
          });
          setIsLoading(false);
          setPageProducts(
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexFlow: "wrap",
              }}
            >
              {tempProducts}
            </div>
          );
        });
    };
    fetchProducts();
  }, [addProductToOrder, removeProductFromOrder]);

  return (
    <div>
      <div className="titleProducts">מוצרי החנות שלנו</div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        pageProducts
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { order } = state.OrderReducer.orderReducer;

  return { order };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProductToOrder,
      removeProductFromOrder,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Products);
