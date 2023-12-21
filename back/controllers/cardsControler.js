const {
  cardsModel1,
  cardsModel2,
  cardsModel3,
  cardsModel4,
  cardsModel5,
} = require("./../models/cardsModel");

const cardsPost = async (req, res) => {
  const { val, game } = req.body;
  if (game === "g-7") {
    const now = new Date();
    const lastEntry = await cardsModel1.findOne().sort({ _id: -1 }).exec();
    if (lastEntry === null || lastEntry.time + 10000 < now) {
      try {
        const result = await cardsModel1.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val: val,
          time: now.getTime(),
        });
        console.log("g-7", result);
        res.sendStatus(200);
      } catch (error) {
        console.log("couldnt save");
      }
    } else res.sendStatus(200);
  } else if (game === "g-tod") {
    const now = new Date();
    const lastEntry = await cardsModel2.findOne().sort({ _id: -1 }).exec();
    if (lastEntry === null || lastEntry.time + 10000 < now) {
      try {
        const result = await cardsModel2.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val: val,
          time: now.getTime(),
        });
        console.log("g-tod", result);
        res.sendStatus(200);
      } catch (error) {
        console.log("couldnt save");
      }
    } else res.sendStatus(200);
  } else if (game === "g-2ct") {
    const now = new Date();
    const lastEntry = await cardsModel3.findOne().sort({ _id: -1 }).exec();
    if (lastEntry === null || lastEntry.time + 10000 < now) {
      try {
        const result = await cardsModel3.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val: val,
          time: now.getTime(),
        });
        console.log("g-2ct", result);
        res.sendStatus(200);
      } catch (error) {
        console.log("couldnt save");
      }
    } else res.sendStatus(200);
  } else if (game === "g-2cto") {
    const now = new Date();
    const lastEntry = await cardsModel4.findOne().sort({ _id: -1 }).exec();
    if (lastEntry === null || lastEntry.time + 10000 < now) {
      try {
        const result = await cardsModel4.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val: val,
          time: now.getTime(),
        });
        console.log("g-2cto", result);
        res.sendStatus(200);
      } catch (error) {
        console.log("couldnt save");
      }
    } else res.sendStatus(200);
  } else if (game === "g-mtp") {
    const now = new Date();
    const lastEntry = await cardsModel5.findOne().sort({ _id: -1 }).exec();
    if (lastEntry === null || lastEntry.time + 10000 < now) {
      try {
        const result = await cardsModel5.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val: val,
          time: now.getTime(),
        });
        console.log("g-mtp", result);
        res.sendStatus(200);
      } catch (error) {
        console.log("couldnt save");
      }
    } else res.sendStatus(200);
  } else res.sendStatus(200);
};

const cardsGet = () => {
  console.log("bob");
};

module.exports = { cardsGet, cardsPost };
