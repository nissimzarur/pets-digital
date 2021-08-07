const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({});

const UsersModel = mongoose.model("users", usersSchema);
module.exports = UsersModel;
