import { combineReducers } from "redux";

const INITIAL_STATE = [];

const OrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_ORDER":
      const newState = [...state, action.product];
      return newState;

    case "REMOVE_PRODUCT_FROM_ORDER":
      let sameProducts = [...state].filter((p) => p._id == action.product._id);
      if (sameProducts.length >= 1) sameProducts.splice(0, 1);

      let filteredProducts = [...state].filter(
        (p) => p._id != action.product._id
      );

      const newStateAfterFilter = [...sameProducts, ...filteredProducts];

      return newStateAfterFilter;

    default:
      return state;
  }
};

export default combineReducers({
  orderReducer: OrderReducer,
});
