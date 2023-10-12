const router = require("express").Router();
const moneyController = require("../controllers/moneyControler");

router.post("/", moneyController.moneyPost);
router.get("/", moneyController.moneyGet);
router.post("/records", moneyController.records);

module.exports = router;
