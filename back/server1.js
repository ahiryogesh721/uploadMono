const express = require("express");
const app = express();
const { Server } = require("socket.io");
const accountSid = "AC1365e0479e0ea18054b3f69f3b441e0f";
const authToken = "5412c9f13c254c91a01e8e15eb256fc0";
const client = require("twilio")(accountSid, authToken);

const PORT = 3100;

const appL = app.listen(PORT, () => {
  console.log(`socket server is runing on PORT:${PORT}`);
});

const io = new Server(appL, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.post("/send", (req, res, next) => {
  console.log(req.body);
  io.emit("banger", req.body);
  res.sendStatus(200);
});

module.exports = io;
