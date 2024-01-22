const User = require("../modals/userModal");

const registerUser = async (req, res) => {
  const { name, number, password } = req.body;
  const alredyRegisterd = await User.findOne({ number });
  const newUser = new User({ name, number, password });
  try {
    if (!name || !number || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Pless fill all fileds" });
    }
    if (alredyRegisterd) {
      res
        .status(400)
        .json({ success: false, message: "User Number alredy registerd" });
    } else {
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  const { number, password } = req.body;
  try {
    const user = await User.findOne({ number, password });

    if (!number || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Pless correct all fileds" });
    }

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "something went wrong",
      success: false,
    });
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
};

module.exports = { registerUser, loginUser, getallusers };
