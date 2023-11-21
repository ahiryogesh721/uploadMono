const express = require("express");
const app = express();
const { Server } = require("socket.io");

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

module.exports = io;
