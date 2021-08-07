const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  client_name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  shipment_address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  shipment_type: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
