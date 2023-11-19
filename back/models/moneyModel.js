const { Schema, model } = require("mongoose");

const moneySchema = new Schema({
  I: Schema.Types.Mixed,
  X: Schema.Types.Mixed,
  players: Schema.Types.Mixed,
  playersBets: Schema.Types.Mixed,
  playersGets: Schema.Types.Mixed,
  inout: Schema.Types.Mixed,
  buger: Schema.Types.Mixed,
  time: Schema.Types.Mixed,
  ST: Schema.Types.Mixed,
});

const recordsSchema = new Schema({
  number: Schema.Types.Mixed,
  iPOint: Schema.Types.Mixed,
  time: Schema.Types.Mixed,
});

const moneyModel = model("money", moneySchema);

const recordsModel = model("records", recordsSchema);

module.exports = { moneyModel, recordsModel };
