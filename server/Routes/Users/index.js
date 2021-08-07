var express = require("express");
const UsersModel = require("../../Models/Users");

var Users = express.Router();

Users.post("/", function (req, res) {
  let user = req.body;
  let userProp = {
    username: user.username,
    password: user.password,
  };

  UsersModel.find(userProp, (err, usersResp) => {
    if (err)
      return res.send({ success: false, errMag: "שגיאה בנסיון אימות משתמש" });

    if (usersResp.length) return res.json({ success: true, isAdmin: true });
    res.json({ success: true, isAdmin: false });
  });
});

Users.post("/login", function (req, res) {
  let user = req.body;
  let userProp = {
    username: user.username,
    password: user.password,
  };
  if (!userProp.username || !userProp.password)
    return res.json({ success: false, errMsg: "אימות משתמש נכשל" });

  UsersModel.find(userProp, (err, usersResp) => {
    if (err) return res.send({ success: false, errMsg: "אימות משתמש נכשל" });

    if (usersResp.length)
      return res.json({ success: true, user: usersResp[0] });

    res.json({ success: false, errMsg: "אימות משתמש נכשל" });
  });
});

module.exports = Users;
