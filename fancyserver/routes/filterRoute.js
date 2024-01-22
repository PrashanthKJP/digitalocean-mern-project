const express = require("express");
const router = express.Router();
const {
  advancedSearch,
  filterNumbers,
} = require("../controler/filterControler");

router.post("/advancedSearch", advancedSearch);
router.post("/filterNumbers", filterNumbers);

module.exports = router;
