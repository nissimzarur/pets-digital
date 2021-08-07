const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderProductsSchema = new Schema({
  order_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderProductsModel = mongoose.model(
  "order_products",
  orderProductsSchema
);
module.exports = OrderProductsModel;
