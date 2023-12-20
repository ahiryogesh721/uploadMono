const { moneyModel, recordsModel } = require("../models/moneyModel");
const io = require("../server1");
const accountSid = "AC08db424aefd4cbeff264ce222e6ae50d";
const authToken = "20b92e4ecf161bb75fdc621aa4bc5b69";
const client = require("twilio")(accountSid, authToken);

const moneyPost = async (req, res) => {
  console.log(req.body);
  /* const lastEntry = await moneyModel.findOne().sort({ _id: -1 }).exec();
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
        io.emit("banger", result);
      }
      res.sendStatus(200);
    } catch (error) {
      console.log("couldnt save");
    }
  } else res.sendStatus(200); */
};

const moneyDellet = async (req, res) => {
  const id = req.params.id;
  await moneyModel.deleteOne({ _id: id });
  let allData = await moneyModel.find().exec();
  res.json(allData);
};

const moneyGet = async (req, res) => {
  let allData = await moneyModel.find().exec();
  res.json(allData);
};

const recordsGet = async (req, res) => {
  try {
    let allData = await recordsModel.find().exec();
    res.json(allData);
    /* if (allData.length >= 500) {
      allData = allData.slice(allData.length - 500, allData.length);
    } */
  } catch (error) {
    resizeBy.json({ disconected: "all" });
  }
};

const records = async (req, res) => {
  console.log(req.body);
  const { iPOint, number, time } = req.body;
  const lastEntry = await recordsModel.findOne().sort({ _id: -1 }).exec();
  if (
    lastEntry === null ||
    iPOint >= lastEntry.iPOint + 15 ||
    typeof number === Number
  ) {
    const result = await recordsModel.create({
      number,
      iPOint,
      time,
    });
    console.log("new record entry:", result);
    if (result) {
      /* const numbers = ["+919924261500"];
      numbers.forEach((x) => {
        client.messages
          .create({
            body: `${number}`,
            from: "+14843348733",
            to: x,
          })
          .then((msg) => {
            console.log("sending msg");
          })
          .catch((err) => {
            console.log(err);
          });
      }); */
      return res.sendStatus(200);
    } else return res.sendStatus(400);
  } else return res.sendStatus(400);
};

module.exports = { moneyPost, moneyGet, records, recordsGet, moneyDellet };
