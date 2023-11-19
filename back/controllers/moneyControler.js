const { moneyModel, recordsModel } = require("../models/moneyModel");
const io = require("../server1");
const accountSid = "ACce54b91085644f3ae5dc954cf1f73ffd";
const authToken = "1263da13311ddc29d625f9a2cae10aeb";
const client = require("twilio")(accountSid, authToken);

const moneyPost = async (req, res) => {
  const allentry = await moneyModel.find().exec();
  const lastEntry = await moneyModel.findOne().sort({ _id: -1 }).exec();
  const { players, playersBets, playersGets, X } = req.body;
  if (
    players !== lastEntry?.players &&
    playersBets !== lastEntry?.playersBets &&
    playersGets !== lastEntry?.playersGets &&
    X !== lastEntry?.X
  ) {
    let inout = parseFloat(playersGets - playersBets).toFixed(2);

    let SET;
    const loop = () => {
      let ar30 = allentry.slice(allentry.length - 30, allentry.length);
      ar30 = ar30.map((x) => (x = { ...x, X: +x.X.split("x")[0] }));
      const val2 = ar30.reduceRight(
        (c, cc) => {
          c.i++;
          if (2.85 < cc.X) {
            if (9 <= cc.X) c.val = c.val + 0.8;
            else if (6 <= cc.X) c.val = c.val + 0.6;
            else if (2.85 < cc.X) c.val = c.val + 0.3;
          }
          return { ...c, val: Number(c.val.toFixed(2)) };
        },
        { val: 0, i: 0 }
      );
      SET = val2.val;

      console.log(ar30, val2.val);
    };

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}:${seconds}`;
    const result = await moneyModel.create({
      I: lastEntry === null ? 1 : lastEntry.I + 1,
      X,
      players,
      playersBets,
      playersGets,
      inout: parseInt(inout),
      time: timestamp,
      //ST: SET,
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

const moneyDellet = async (req, res) => {
  const id = req.params.id;
  await moneyModel.deleteOne({ _id: id });
  let allData = await moneyModel.find().exec();
  res.json(allData);
};

const moneyGet = async (req, res) => {
  let allData = await moneyModel.find().exec();
  if (allData.length >= 500) {
    allData = allData.slice(allData.length - 500, allData.length);
  }
  res.json(allData);
};

const recordsGet = async (req, res) => {
  let allData = await recordsModel.find().exec();
  res.json(allData);
};

const records = async (req, res) => {
  const { iPOint, number, time } = req.body;
  const lastEntry = await recordsModel.findOne().sort({ _id: -1 }).exec();
  if (iPOint > lastEntry?.iPOint + 50 || lastEntry === null) {
    const result = await recordsModel.create({
      number,
      iPOint,
      time,
    });
    console.log("new record entry:", result);
    if (result) {
      const numbers = ["+919924261500", "+919313389830"];
      numbers.forEach((x) => {
        client.messages
          .create({
            body: `♠`,
            from: "+13344630937",
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

module.exports = { moneyPost, moneyGet, records, recordsGet, moneyDellet };
