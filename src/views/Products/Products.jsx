import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import ProductCard from "./../../components/ProductCard/ProductCard";
import "./Products.css";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageProducts, setPageProducts] = useState([]);

  const loadProducts = () => {
    return pageProducts;
  };

  useEffect(() => {
    let tempProducts = [];
    fetch("http://192.168.1.211:3002/products")
      .then((results) => results.json())
      .then((products) => {
        products.data.forEach((product) => {
          tempProducts.push(<ProductCard product={product} />);
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
  }, []);

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
