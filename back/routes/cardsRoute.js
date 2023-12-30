const router = require("express").Router();
const cardsControler = require("../controllers/cardsControler");

router.post(
  "/",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Referrer-Policy", "no-referrer");
    res.header("Access-Control-Allow-Private-Network", "true");
    next();
  },
  cardsControler.cardsPost
);

router.get("/", cardsControler.cardsGet);
router.delete("/:id", cardsControler.cardsDelet);

module.exports = router;
