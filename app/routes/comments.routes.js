const express = require("express");
const router = express.Router();
const {
  validateNickName,
  validateID,
  validateCreate,
} = require("../validators/validateUser");
const { 
  CreateComment,
  DeleteComment,
  EditComment,
  GetCommentNickName,
  GetCommentsTwit,
  GetCommentById
} = require("../controllers/coments.controller");

router.post("/", CreateComment);

router.delete("/", DeleteComment);

router.patch("/", EditComment);

router.get("/nn/:nickName", GetCommentNickName);

router.get("/getTwitByTwit", GetCommentsTwit);

router.get("/getTwitById", GetCommentById);

module.exports = router;
