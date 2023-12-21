const router = require("express").Router();
const cardsControler = require("../controllers/cardsControler");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Referrer-Policy", "no-referrer");
  res.header("Access-Control-Allow-Private-Network", "true");
  next();
});

router.post("/", cardsControler.cardsPost);
router.get("/", cardsControler.cardsGet);

module.exports = router;
