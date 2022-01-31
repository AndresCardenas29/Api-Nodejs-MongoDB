const express = require("express");
const router = express.Router();
const { getLikeByTwit, setLike, unlike } = require("../controllers/like.controller");

router.get("/", getLikeByTwit);
router.post("/", setLike);
router.delete("/", unlike);

module.exports = router;
