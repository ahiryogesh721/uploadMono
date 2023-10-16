const { moneyModel, recordsModel } = require("../models/moneyModel");
const io = require("../server1");
const accountSid = "ACd6c3da2efc055e353964611712010649";
const authToken = "f91cdcfe75a670861454b2eb993b4bee";
const client = require("twilio")(accountSid, authToken);

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
    const result = await moneyModel.create({
      I: lastEntry === null ? 1 : lastEntry.I + 1,
      X,
      players,
      playersBets,
      playersGets,
      inout: parseInt(inout),
      buger:
        lastEntry === null
          ? parseInt(inout)
          : parseInt(lastEntry?.buger) + parseInt(inout),
    });
    if (result) {
      io.emit("banger", result);
    }
  }
  res.sendStatus(200);
};

const moneyGet = async (req, res) => {
  const allData = await moneyModel.find().exec();
  res.json(allData);
};

const records = async (req, res) => {
  const { iPOint, number } = req.body;
  const lastEntry = await recordsModel.findOne().sort({ _id: -1 }).exec();
  if (iPOint > lastEntry?.iPOint + 10 || lastEntry === null) {
    const result = await recordsModel.create({
      number,
      iPOint,
    });
    console.log("new record entry:", result);
    if (result) {
      const numbers = ["+919924261500", "+919313389830"];
      numbers.forEach((x) => {
        client.calls
          .create({
            url: "https://handler.twilio.com/twiml/EH272f0f7bfe617ee912d51fefaa460dd9",
            from: "+12565738939",
            to: x,
          })
          .then((msg) => {
            console.log("caling");
          })
          .catch((err) => {
            console.log(err);
          });
        client.messages
          .create({
            body: `${result.number}`,
            from: "+12565738939",
            to: x,
          })
          .then((msg) => {
            console.log("caling");
          })
          .catch((err) => {
            console.log(err);
          });
      });
      return res.sendStatus(200);
    } else return res.sendStatus(400);
  } else if (lastEntry.iPOint === iPOint) return res.sendStatus(400);
  else return res.sendStatus(400);
};

module.exports = { moneyPost, moneyGet, records };
