import express from "express";
import MessageModel from "../models/Message.js";
const messageRouter = express.Router();

// add
messageRouter.post("/", async (req, res, next) => {
  try {
    const newMessage = new MessageModel(req.bod);
    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    next(err);
  }
});
// get
messageRouter.get("/:conversationId/", async (req, res, next) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
});
export default messageRouter;
