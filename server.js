const express = require("express");
const app = express();
const conectMongo = require("./config/mongo");

const credentials = require("./middleware/corsMiddle");
const cors = require("cors");
const corsConfig = require("./config/cors");
const json = require("body-parser").json();
const mongoess = require("mongoose");

const rootRoute = require("./routes/rootRoute");
const postRoute = require("./routes/postRoute");

const PORT = 3500;

conectMongo();
conectMongo().catch((err) => console.log(err));

app.use(credentials);
app.use(cors(corsConfig));

app.use(json);
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRoute);
app.use("/post", postRoute);

mongoess.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`backend server is runing on PORT:${PORT}`);
  });
});
