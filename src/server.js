import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import userRouter from "./services/user.js";
import conversationRouter from "./services/conversations.js";
import messageRouter from "./services/messages.js";
import authRouter from "./services/auth.js";

const server = express();

const { PORT = 3009 } = process.env;

// MIDDLEWARE

server.use(cors());
server.use(express.json());

// SERVICES
server.use("/conversation", conversationRouter);
server.use("/messages", messageRouter);
server.use("/user", userRouter);
server.use("/auth", authRouter);

server.listen(PORT, () => {
  // connect to mongoose Server

  mongoose.connect(process.env.MONGODB, {});

  console.log(`Server is listening on port ${PORT}`);
  console.table(listEndpoints(server));
});

server.on("error", (error) => {
  console.log("Server is stopped ", error);
});
