import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      password: signinUser.password,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invaild Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid user data" });
  }
});
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Piyush",
      email: "piyushrathore07@gamil.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    console.log("reouterError-->", error);
    res.send({ msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    const updatedUser = await user.save();
    if (updatedUser) {
      return res.status(200).send({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
    }
  }
  return res.status(500).send({ message: " Error in Updating User." });
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
