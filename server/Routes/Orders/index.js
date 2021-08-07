var express = require("express");
const { ObjectId } = require("mongodb");
const OrderModel = require("../../Models/Order");
const OrderProductsModel = require("../../Models/OrderProducts");

var Orders = express.Router();

Orders.post("/", function (req, res) {
  let order = req.body;

  let orderProp = {
    client_name: order.clientName,
    price: order.price,
    shipment_address: order.shipmentAddress,
    phone: order.phone,
    comments: order.comments,
    shipment_type: order.shipmentType,
    status: 0,
  };
  const orderModal = new OrderModel();
  const orderProductsModel = new OrderProductsModel();

  orderModal.collection.insertOne(orderProp, (err, orderRes) => {
    if (err) return res.send({ success: false, errMsg: "שגיאה בקליטת ההזמנה" });

    console.log(orderRes);
    let orderId = orderRes.insertedId;
    let products = [];

    order.products.forEach((product) => {
      let tempProduct = {};

      tempProduct.order_id = orderId;
      tempProduct.product_id = product._id;
      tempProduct.price = product.price;

      products.push(tempProduct);
    });

    orderProductsModel.collection.insertMany(products, (err, docs) => {
      if (err)
        return res.send({
          success: false,
          errMsg: "שגיאה בקליטת המוצרים להזמנה",
        });
    });

    res.send({ success: true });
  });
});

Orders.get("/", function (req, res) {
  OrderModel.find({})
    .then((orders) => {
      if (!orders) return res.json({ success: true, orders: [] });
      return res.json({ success: true, orders: orders });
    })
    .catch((e) =>
      res.send({ success: false, errMsg: "חלה שגיאה בעת משיכת ההזמנות" })
    );
});

Orders.put("/", function (req, res) {
  let orderObj = req.body;

  let updateProps = {};

  for (const key in orderObj) {
    const prop = orderObj[key];

    if (prop && key !== "_id") {
      updateProps[key] = prop;
    }
  }
  console.log(updateProps);
  const orderModal = new OrderModel();

  orderModal.collection
    .updateOne({ _id: ObjectId(orderObj._id) }, { $set: updateProps })
    .then((result) => {
      if (result.modifiedCount > 0) return res.json({ success: true });
      else return res.json({ success: false, errMsg: "לא בוצע עדכון להזמנה" });
    })
    .catch((e) => console.log(e));

  return res.send({});
});

module.exports = Orders;