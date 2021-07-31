var mongoose = require("mongoose");

const uri =
  "mongodb+srv://userTest:user123@cluster0.dv0xy.mongodb.net/pets-digital?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongoDB!"))
  .catch(() => console.log("field to connect to mongoDB."));

module.exports = mongoose;
