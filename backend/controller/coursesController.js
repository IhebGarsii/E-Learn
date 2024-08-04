const coursesModel = require("../model/coursesModel");

const getAllCourses = async (req, res) => {
  try {
    const courses = await coursesModel.find().populate("instructorId");
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
const getCourse = async (req, res) => {
  try {
    const { idUser } = req.params;
    const course = await coursesModel.findById(idUser);
    if (!course) {
      return res.status(404).json({ error: "No Courses Found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const rateCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;
    const { rate } = req.body;

    // Find the course by its ID
    const course = await coursesModel.findById(idCourse);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Calculate the new average rating
    const totalRate = course.avgRate.rate * course.avgRate.nbRate; // Total rate accumulated
    const newNbRate = course.avgRate.nbRate + 1;
    const newRate = (totalRate + rate) / newNbRate;

    // Update the course with the new average rating and number of ratings
    course.avgRate.rate = newRate;
    course.avgRate.nbRate = newNbRate;

    // Save the updated course
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const AddCourse = async (req, res) => {
  try {
    // Access the uploaded files
    const thumbnail = req.files["thumbnail"]
      ? req.files["thumbnail"][0].originalname
      : null;
    const video = req.files["video"]
      ? req.files["video"][0].originalname
      : null;
    // Create the course document with the uploaded files
    console.log(thumbnail);
    const course = await coursesModel.create({
      ...req.body,
      thumbnail,
      video, // Add video field if needed
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { idUser, idCourse } = req.params;
  try {
    const coursre = await coursesModel.findById(idCourse);
    const user = await userModel.findById(idUser);
    if (coursre.student.length > 0) {
      return res
        .status(300)
        .json(
          "You Cant Delete This Course becaues student allready enrroled in it"
        );
    }
    if (user.courses.includes(idCourse)) {
      const deletedCoures = await coursesModel.findByIdAndDelete(idCourse);
      return res.status(202).json("Coures Deleted Succsefuly");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateCourse = async (req, res) => {
  const { idUser, idCourse } = req.params;
  try {
    const course = await coursesModel.findById(idCourse);
    if (course.instructorId.toString() !== idUser) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this course." });
    }
    await coursesModel.findByIdAndUpdate(req.body);
    res.status(202).json("Your Course Has Been Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  AddCourse,
  deleteCourse,
  updateCourse,
  rateCourse,
};
