const express = require("express");
const router = express.Router();
const {
  advancedSearch,
  filterNumbers,
  filterNumbersInFancy,
} = require("../controler/filterControler");

router.post("/advancedSearch", advancedSearch);
router.post("/filterNumbers", filterNumbers);
router.get("/filterNumberFancy", filterNumbersInFancy);

module.exports = router;
