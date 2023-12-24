const { Schema, model } = require("mongoose");

const cardsSchema = new Schema({
  I: Schema.Types.Mixed,
  val: Schema.Types.Mixed,
  time: Schema.Types.Mixed,
});

const cardsModel2 = model("cards-tod", cardsSchema);
const cardsModel3 = model("cards-2ct", cardsSchema);
const cardsModel4 = model("cards-2cto", cardsSchema);
const cardsModel5 = model("cards-mtp", cardsSchema);

module.exports = {
  cardsModel2,
  cardsModel3,
  cardsModel4,
  cardsModel5,
};

/* 
g-tod tenpati one day
g-2ct 2 card ten pati
g-2cto 2 card ten pati one
g-mtp muflis tenpati
*/
