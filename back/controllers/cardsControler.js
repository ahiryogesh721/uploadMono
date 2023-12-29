const {
  cardsModel2,
  cardsModel3,
  cardsModel4,
  cardsModel5,
} = require("./../models/cardsModel");
const io = require("./../server1");
const accountSid = "AC1365e0479e0ea18054b3f69f3b441e0f";
const authToken = "775aa20df9d4f84d66f10d5fac6fa77c";
const client = require("twilio")(accountSid, authToken);

const cardsPost = async (req, res) => {
  const { val, game } = req.body;
  const now = new Date().getTime();
  if (game === "g-2ct") {
    const lastEntry1 = await cardsModel3.findOne().sort({ _id: -1 }).exec();
    const lastEntrysArray = await cardsModel3.find().sort({ _id: -1 }).limit(9);
    if (lastEntry1 === null || undefined || lastEntry1.time + 40000 < now) {
      try {
        let result = await cardsModel3.create({
          I: lastEntry1 === null ? 1 : lastEntry1.I + 1,
          val,
          time: now,
        });
        if (result) {
          console.log(result);
          io.emit("banger", result);
        }
      } catch (error) {
        console.log(error);
      }
      res.sendStatus(200);
    } else res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

const cardsGet = async (req, res) => {
  try {
    const allCards = await cardsModel3.find().exec();
    res.json(allCards);
  } catch (error) {
    console.log("could not retry data from database");
    res.sendStatus(400);
  }
};

module.exports = { cardsGet, cardsPost };
