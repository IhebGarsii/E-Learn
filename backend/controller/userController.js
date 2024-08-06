const { sign } = require("jsonwebtoken");
const userModel = require("../model/userModel");
const { genSalt } = require("bcrypt");

const createToken = (id) => {
  return sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const registerInstroctor = async (req, res) => {
  try {
    /*  if (req.body.google) {
      const user = await userModel.find({ email: req.email });
      if (user) {
        token = createToken(user._id);
        return res.status(200).json({ user, token });
      } else {
        const salt = await bycript.genSalt(10);
        const hash = await bycript.hash(user.password, salt);
        const newUser = userModel.create({ ...req.body, password: hash });
      }
    } */

    const user = await userModel.find({ email: req.email });
    if (user) {
      return res.status(300).json("email is used");
    }
    const salt = await bycript.genSalt(10);
    const hash = await bycript.hash(user.password, salt);
    const newUser = userModel.create({ ...req.body, password: hash });
    if (newUser) {
      return res.status(201).json(newUser);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    if (req.body.google) {
      const { email } = req.body;
      const user = await userModel.find({ email });
      console.log(user);

      if (user.length === 0) {
        return res.status(404).json("User Not Found please regester");
      }

      token = createToken(user._id);
      return res.status(200).json({ user, token });
    } else {
      const { email, password } = req.body;
      const user = await userModel.find({ email });

      if (!user) {
        return res.status(404).json("Email or Password Incorrect");
      }
      const match = await bycript.compare(user, password);
      if (!match) {
        return res.status(404).json("Email or Password Incorrect");
      }
      token = createToken(user._id);
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const registerStudent = async (req, res) => {};

const getAllStutent = async (req, res) => {
  try {
    const studends = await userModel.find({ role: "STUDENT" });
    if (!student) {
      return res.status(404).json("No Student Were Found");
    }
    return res.status(200).json(studends);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json("No user Were Found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getAllInstroctor = async (req, res) => {
  try {
    const instractor = await userModel.find({ role: "INSTRACTOR" });
    if (!instractor) {
      return res.status(404).json("No Instractor Were Found");
    }
    return res.status(200).json(instractor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getStutent = async (req, res) => {
  try {
    const { idUser } = req.params;
    const student = await userModel.findById(idUser);
    if (!student) {
      return res.status(404).json("No student B This ID Were Found");
    }
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getInstroctor = async (req, res) => {
  try {
    const { idUser } = req.params;
    const instractor = await userModel.findById(idUser);
    if (!instractor) {
      return res.status(404).json("No Instractor B This ID Were Found");
    }
    return res.status(200).json(instractor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteAcount = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userModel.findByIdAndDelete(idUser);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
const deleteAcountByAdmin = async (req, res) => {
  try {
    const { idBlock, idUser } = req.params;
    const admin = await userModel.findById(idUser);
    if (admin.role !== "admin") {
      return res.status(404).json("You're Not an ADMIN ");
    }
    const user = await userModel.findByIdAndDelete(idBlock);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
module.exports = {
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
};
