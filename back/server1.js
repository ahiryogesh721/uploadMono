const express = require("express");
const app = express();
const { Server } = require("socket.io");
const accountSid = "AC08db424aefd4cbeff264ce222e6ae50d";
const authToken = "20b92e4ecf161bb75fdc621aa4bc5b69";
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
    /* const numbers = ["+919924261500"];
    numbers.forEach((x) => {
      client.messages
        .create({
          body: `${data}`,
          from: "+14843348733",
          to: x,
        })
        .then((msg) => {
          console.log("sTOPED");
        })
        .catch((err) => {
          console.log(err);
        });
    }); */
  });
});

module.exports = io;
