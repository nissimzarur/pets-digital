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

    /** START POINT - ONLY FOR TESTING */
    // let products = {};
    // products.data = [
    // 	{
    // 		_id:"610b7837221ce6bd460ba4d0",
    // 		title:"אמבטיה לכלב",
    // 		description:"הדרך הקלה ביותר לרחוץ את חיית המחמד שלכם.",
    // 		price:115,
    // 		img_url:"https://www.petpro.co.il/wp-content/uploads/2018/12/15STE009_1.jpg"
    // 	},
    // 	{
    // 		_id:"610548f79c13b2dc1c19c2ba",
    // 		title:"צעצוע בד בצורת עצם",
    // 		description:"עצמות הבד שלנו נעשים אחד אחד בעבודת יד עם תפרים משולשים המבטיחים עמידות לאורך זמן.",
    // 		price:30,
    // 		img_url:"https://www.petpro.co.il/wp-content/uploads/2020/12/Toy-Bone_Dog_s-Life_Light-Blue_1.jpg"
    // 	},
    // ];

    // products.data.forEach((product, key) => {
    // 	tempProducts.push(
    // 	  <ProductCard
    // 		product={product}
    // 		key={key}
    // 		addProductToOrderHandler={addProductToOrder}
    // 		removeProductFromOrderHandler={removeProductFromOrder}
    // 	  />
    // 	);
    //   });

    //   setIsLoading(false);
    //   setPageProducts(
    // 	<div
    // 	  style={{
    // 		display: "flex",
    // 		justifyContent: "center",
    // 		flexFlow: "wrap",
    // 	  }}
    // 	>
    // 	  {tempProducts}
    // 	</div>
    //   );
    /** END POINT - ONLY FOR TESTING */

    // fetch(`${process.env.REACT_APP_IP_ADDRESS}/products`)
    fetch("/products")
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
