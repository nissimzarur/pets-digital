const express = require("express");
var cors = require("cors");
const mongoose = require("./connection");

//Import Routes
var Products = require("./Routes/Products");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`start listen to port:${PORT}`);
});

// Use Routes
app.use("/products", Products);

//Default 404 page not found
app.get("/", function (req, res) {
  res.send(404);
});
