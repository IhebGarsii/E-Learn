const express = require("express");
const coursesRouter = express.Router();
const {
  getAllCourses,
  getCourse,
  AddCourse,
  deleteCourse,
  updateCourse,
  rateCourse,
} = require("../controller/coursesController");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory to store uploaded files
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
const uploadFields = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 5 },
]);
coursesRouter.get("/getAllCourses", getAllCourses);
coursesRouter.get("/getCourse/:idCourse", getCourse);
coursesRouter.post("/AddCourse", uploadFields, AddCourse);
coursesRouter.delete("/deleteCourse/:idUser/:idCourse", deleteCourse);
coursesRouter.put("/updateCourse/:idUser/:idCourse", updateCourse);
coursesRouter.put("/rate/:idCourse", rateCourse);

module.exports = coursesRouter;
