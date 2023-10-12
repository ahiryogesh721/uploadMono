const mongoose = require("mongoose");

const conectMongo = async () => {
  await mongoose.connect(
    "mongodb+srv://ahiryogesh:ahiryogesh721@tocxic.fhprltu.mongodb.net/"
  );
  console.log("database is conencted");
};

module.exports = conectMongo;
