const express = require("express");
const router = express.Router();
const checkRoleAuth = require("../middleware/roleAuth");
const {
  validateCreate,
  validateComment,
  validatePageTwit,
} = require("../validators/validateComments");

const {
  validateID,
  validateNickName,
} = require("../validators/validateDefault");
const {
  CreateComment,
  DeleteComment,
  EditComment,
  GetCommentNickName,
  GetCommentsTwit,
  GetCommentById,
} = require("../controllers/coments.controller");

router.post("/", validateCreate, checkRoleAuth(["user"]), CreateComment);

router.delete("/", validateID, checkRoleAuth(["user"]), DeleteComment);

router.patch("/", validateComment, checkRoleAuth(["user"]), EditComment);

router.get(
  "/nn/:nickName",
  validateNickName,
  checkRoleAuth(["user"]),
  GetCommentNickName
);

router.get(
  "/getCommentByTwit/:page",
  validatePageTwit,
  checkRoleAuth(["user"]),
  GetCommentsTwit
);

router.get("/getTwitById", validateID, checkRoleAuth(["user"]), GetCommentById);

module.exports = router;
