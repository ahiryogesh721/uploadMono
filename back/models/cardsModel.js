const { Schema, model } = require("mongoose");

const cardsSchema = new Schema({
  I: Schema.Types.Mixed,
  val: Schema.Types.Mixed,
  time: Schema.Types.Mixed,
  a10: Schema.Types.Mixed,
  b10: Schema.Types.Mixed,
});

const cardsModel2 = model("cards-tod", cardsSchema);
const cardsModel3 = model("cards-2ct", cardsSchema);
const cardsModel4 = model("cards-bc", cardsSchema);

module.exports = {
  cardsModel2,
  cardsModel3,
  cardsModel4,
};

/* 
g-tod tenpati one day
g-2ct 2 card ten pati
g-bc bollowd cosion
*/
