import express from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
const authRouter = express.Router();

//REGISTER
authRouter.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default authRouter;
