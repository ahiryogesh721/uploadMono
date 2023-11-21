const app = require("express")();
const router = require("express").Router();
const moneyController = require("../controllers/moneyControler");

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
  moneyController.moneyPost
);
router.get("/", moneyController.moneyGet);
router.delete("/:id", moneyController.moneyDellet);
router.post("/records", moneyController.records);
router.get("/records", moneyController.recordsGet);

module.exports = router;
