const {
  cardsModel2,
  cardsModel3,
  cardsModel4,
  cardsModel5,
} = require("./../models/cardsModel");
const accountSid = "AC1365e0479e0ea18054b3f69f3b441e0f";
const authToken = "775aa20df9d4f84d66f10d5fac6fa77c";
const client = require("twilio")(accountSid, authToken);

const cardsPost = async (req, res) => {
  const { val, game } = req.body;
  const now = new Date().getTime();
  if (game === "g-tod") {
    const lastEntry = await cardsModel3.findOne().sort({ _id: -1 }).exec();
    if (lastEntry === null || undefined || lastEntry.time + 20000 < now) {
      try {
        let result = await cardsModel3.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val,
          time: now,
        });
      } catch (error) {
        console.log(error);
      }
      res.sendStatus(200);
    } else res.sendStatus(200);
  } else if (game === "g-2ct") {
    const lastEntry1 = await cardsModel3.findOne().sort({ _id: -1 }).exec();
    const lastEntrysArray = await cardsModel3.find().sort({ _id: -1 }).limit(5);
    if (lastEntry1 === null || undefined || lastEntry1.time + 1000 < now) {
      try {
        let result = await cardsModel3.create({
          I: lastEntry1 === null ? 1 : lastEntry1.I + 1,
          val,
          time: now,
        });
        let same = 
          lastEntrysArray[0]?.val === lastEntrysArray[1]?.val &&
          lastEntrysArray[1]?.val === lastEntrysArray[2]?.val &&
          lastEntrysArray[2]?.val === lastEntrysArray[3]?.val &&
          lastEntrysArray[3]?.val === lastEntrysArray[4]?.val;
        if (same && lastEntry1.val===result.val) {
        const numbers = ["+919924261500"];
      numbers.forEach((x) => {
        client.messages
          .create({
            body: `${game}:https://cricbet99.win/casino/99999`,
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
        } else {
          console.log("match faild");
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
