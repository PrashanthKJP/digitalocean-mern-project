const express = require("express");
const router = express.Router();
const User = require("../modals/userModal");
const {
  registerUser,
  loginUser,
  getallusers,
} = require("../controler/userControler");

router.post("/register", registerUser);

router.post("/users/login", loginUser);

router.get("/getallusers", getallusers);

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});
module.exports = router;
