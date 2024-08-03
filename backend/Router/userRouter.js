const express = require("express");
const {
  registerInstroctor,
  registerStudent,
  login,
  getAllInstroctor,
  getAllStutent,
  getInstroctor,
  getStutent,
  deleteAcount,
  deleteAcountByAdmin,
} = require("../controller/userController");
const userRouer = express.Router();

userRouer.post("/registerInstroctor", registerInstroctor);
userRouer.post("/login", login);
userRouer.get("/getStutent", getStutent);
userRouer.get("/getAllInstroctor", getAllInstroctor);
userRouer.get("/getAllStutent", getAllStutent);
userRouer.get("/getInstroctor", getInstroctor);
userRouer.delete("/deleteAcount/:idUser", deleteAcount);
userRouer.delete("/deleteAcountByAdmin/:idUser/:idBlock", deleteAcountByAdmin);

module.exports = userRouer;
