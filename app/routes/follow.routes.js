const express = require("express");
const router = express.Router();
const {
  validateID,
  validateNickName,
} = require("../validators/validateDefault");
const {
  follow,
  unfollow,
  followers,
  following,
} = require("../controllers/follow.controller");

router.post("/follow", follow);

router.post("/unfollow", unfollow);

router.get("/followers/:nickName", followers);

router.get("/following/:nickName", following);

module.exports = router;
