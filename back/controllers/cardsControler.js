const {
  cardsModel2,
  cardsModel3,
  cardsModel4,
} = require("./../models/cardsModel");
const io = require("./../server1");

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
          console.log(game, result);
          io.emit("banger", result);
        }
      } catch (error) {
        console.log(error);
      }
      res.sendStatus(200);
    } else res.sendStatus(200);
  } else if (game === "g-tod") {
    const lastEntry1 = await cardsModel2.findOne().sort({ _id: -1 }).exec();
    const lastEntrysArray = await cardsModel2.find().sort({ _id: -1 }).limit(9);
    if (lastEntry1 === null || undefined || lastEntry1.time + 40000 < now) {
      try {
        let result = await cardsModel2.create({
          I: lastEntry1 === null ? 1 : lastEntry1.I + 1,
          val,
          time: now,
        });
        if (result) {
          console.log(game, result);
          io.emit("banger", result);
        }
      } catch (error) {
        console.log(error);
      }
      res.sendStatus(200);
    } else res.sendStatus(200);
  } else if (game === "g-bc") {
    const lastEntry1 = await cardsModel4.findOne().sort({ _id: -1 }).exec();
    const lastEntrysArray = await cardsModel4.find().sort({ _id: -1 }).limit(9);
    if (lastEntry1 === null || undefined || lastEntry1.time + 40000 < now) {
      try {
        let result = await cardsModel4.create({
          I: lastEntry1 === null ? 1 : lastEntry1.I + 1,
          val,
          time: now,
        });
        if (result) {
          console.log(game, result);
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
    const allCards = await cardsModel4.find().exec();
    res.json(allCards);
  } catch (error) {
    console.log("could not retry data from database");
    res.sendStatus(400);
  }
};

const cardsDelet = async (req, res) => {
  const id = req.params.id;
  await cardsModel3.deleteOne({ _id: id });
  let allData = await cardsModel3.find().exec();
  res.json(allData);
};

module.exports = { cardsGet, cardsPost, cardsDelet };
