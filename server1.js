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

io.on("connection", (socket) => {
  socket.on("msg", (data) => {
    const numbers = ["+919924261500"];
    numbers.forEach((x) => {
      client.messages
        .create({
          body: `${data}`,
          from: "+12059273808",
          to: x,
        })
        .then((msg) => {
          console.log("sTOPED");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

module.exports = io;
