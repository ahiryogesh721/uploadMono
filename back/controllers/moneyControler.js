const {
  moneyModel,
  recordsModel5,
  recordsModel20,
} = require("../models/moneyModel");
//const io = require("../server1");
const accountSid = "AC1365e0479e0ea18054b3f69f3b441e0f";
const authToken = "5412c9f13c254c91a01e8e15eb256fc0";
const client = require("twilio")(accountSid, authToken);

const sendToSock = async (data) => {
  try {
    fetch("https://sock-11f1.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Private-Network": "true",
      },
      body: JSON.stringify(data),
    });
    console.log("api call succ");
  } catch (error) {
    console.log("couldnt make and api for sock");
  }
};

const moneyPost = async (req, res) => {
  const lastEntry = await moneyModel.findOne().sort({ _id: -1 }).exec();
  const { players, playersBets, playersGets, X } = req.body;
  if (
    players !== lastEntry?.players &&
    playersBets !== lastEntry?.playersBets &&
    playersGets !== lastEntry?.playersGets &&
    X !== lastEntry?.X
  ) {
    let inout = parseFloat(playersGets - playersBets).toFixed(2);
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}:${seconds}`;
    try {
      const result = await moneyModel.create({
        I: lastEntry === null ? 1 : lastEntry.I + 1,
        X,
        players,
        playersBets,
        playersGets,
        inout: parseInt(inout),
        time: timestamp,
        buger:
          lastEntry === null
            ? parseInt(inout)
            : parseInt(lastEntry?.buger) + parseInt(inout),
      });
      if (result) {
        console.log(result);
        sendToSock(result);
      }
      res.sendStatus(200);
    } catch (error) {
      console.log("couldnt save");
    }
  } else res.sendStatus(200);
};

const moneyDellet = async (req, res) => {
  const id = req.params.id;
  await moneyModel.deleteOne({ _id: id });
  let allData = await moneyModel.find().exec();
  res.json(allData);
};

const moneyGet = async (req, res) => {
  let allData = await moneyModel.find().sort({ _id: -1 }).limit(2000).exec();
  res.json(allData.reverse());
};

const recordsGet = async (req, res) => {
  try {
    let allData = await recordsModel5.find().exec();
    res.json(allData);
  } catch (error) {}
};

const records = async (req, res) => {
  const { iPOint, number, time } = req.body;
  const lastEntry5 = await recordsModel5.findOne().sort({ _id: -1 }).exec();
  const lastEntry20 = await recordsModel20.findOne().sort({ _id: -1 }).exec();
  if (
    (lastEntry5 === null || iPOint >= lastEntry5.iPOint + 10) &&
    number === 5
  ) {
    const result = await recordsModel5.create({
      number,
      iPOint,
      time,
    });
    console.log("new record entry:", result);
    if (result) {
      const numbers = ["+919924261500"];
      numbers.forEach((x) => {
        client.messages
          .create({
            body: `${number}`,
            from: "+12059273808",
            to: x,
          })
          .then((msg) => {
            console.log("sending msg");
          })
          .catch((err) => {
            console.log(err);
          });
      });
      return res.sendStatus(200);
    } else return res.sendStatus(400);
  } else if (
    (lastEntry20 === null || iPOint >= lastEntry20.iPOint + 10) &&
    number === 20
  ) {
    const result = await recordsModel20.create({
      number,
      iPOint,
      time,
    });
    console.log("new record entry:", result);
    if (result) {
      const numbers = ["+919924261500"];
      numbers.forEach((x) => {
        client.messages
          .create({
            body: `${number}`,
            from: "+12059273808",
            to: x,
          })
          .then((msg) => {
            console.log("sending msg");
          })
          .catch((err) => {
            console.log(err);
          });
      });
      return res.sendStatus(200);
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

module.exports = {
  moneyPost,
  moneyGet,
  records,
  recordsGet,
  moneyDellet,
};
