var express = require("express");
const productsModel = require("../../Models/Products");

var Products = express.Router();

Products.get("/", function (req, res) {
  productsModel.find({}, (err, docs) => {
    if (err)
      return res.json({
        success: false,
        msg: "ייבוא מוצרים נכשל!",
      });

    return res.json({
      success: true,
      msg: "ייבוא מוצרים הצליח",
      data: docs,
    });
  });
});

module.exports = Products;
