const router = require("express").Router();
const moneyController = require("../controllers/moneyControler");

router.post("/", moneyController.moneyPost);
router.get("/", moneyController.moneyGet);
router.post("/records", moneyController.records);
router.get("/records", moneyController.recordsGet);

module.exports = router;
