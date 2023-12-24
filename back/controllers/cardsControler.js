const {
  cardsModel2,
  cardsModel3,
  cardsModel4,
  cardsModel5,
} = require("./../models/cardsModel");
const accountSid = "AC1365e0479e0ea18054b3f69f3b441e0f";
const authToken = "bab1d28638ea266641459927359c2a49";
const client = require("twilio")(accountSid, authToken);

const cardsPost = async (req, res) => {
  const { val,game } = req.body;
    const now = new Date().getTime()
    if(game==='g-tod'){
      const lastEntry = await cardsModel3.findOne().sort({ _id: -1 }).exec();
    if ((lastEntry === null||undefined) || lastEntry.time + 20000 < now) {
      try {
        let result= await cardsModel3.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val,
          time: now
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      res.sendStatus(200)
    } else res.sendStatus(200);
    }else if(game==='g-tod'){
      const lastEntry = await cardsModel2.findOne().sort({ _id: -1 }).exec();
    if ((lastEntry === null||undefined) || lastEntry.time + 20000 < now) {
      try {
        let result= await cardsModel2.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val,
          time: now
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      res.sendStatus(200)
    } else res.sendStatus(200);
    }else if(game==='g-2ct'){
      const lastEntry = await cardsModel3.findOne().sort({ _id: -1 }).exec();
    if ((lastEntry === null||undefined) || lastEntry.time + 20000 < now) {
      try {
        let result= await cardsModel3.create({
          I: lastEntry === null ? 1 : lastEntry.I + 1,
          val,
          time: now
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      res.sendStatus(200)
    } else res.sendStatus(200);
    }
};

const cardsGet = () => {
  console.log("bob");
};

module.exports = { cardsGet, cardsPost };
