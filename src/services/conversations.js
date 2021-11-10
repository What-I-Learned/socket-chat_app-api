import express from "express";
import ConversationModel from "../models/Conversation.js";
const conversationRouter = express.Router();

// new Conversation
conversationRouter.post("/", async (req, res, next) => {
  try {
    const newConversation = new ConversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (err) {
    next(err);
  }
});

// get conversation of a User
conversationRouter.get("/:userId", async (req, res, next) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
});

export default conversationRouter;
