const express = require("express");
const multer = require("multer");
const path = require("path");
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
  getUserById,
} = require("../controller/userController");
const userRouer = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/users/"); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      // Extract the original file extension
      const ext = path.extname(file.originalname);

      // Use the original file name, ensuring it’s unique (you may use a timestamp to avoid conflicts)
      const filename = file.originalname;

      cb(null, filename);
    },
  }),
});

userRouer.post("/register", upload.single("image"), registerInstroctor);
userRouer.post("/login", login);
userRouer.get("/getStutent", getStutent);
userRouer.get("/getUserById/:idUser", getUserById);
userRouer.get("/getAllInstroctor", getAllInstroctor);
userRouer.get("/getAllStutent", getAllStutent);
userRouer.get("/getInstroctor", getInstroctor);
userRouer.delete("/deleteAcount/:idUser", deleteAcount);
userRouer.delete("/deleteAcountByAdmin/:idUser/:idBlock", deleteAcountByAdmin);

module.exports = userRouer;
