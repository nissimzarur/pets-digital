const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({});

const productsModel = mongoose.model("products", productsSchema);
module.exports = productsModel;
