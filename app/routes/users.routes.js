const express = require("express");
const router = express.Router();
const checkOrigin = require("../middleware/origin");
const {
  CreateUser,
  GetUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
  UploadPhoto
} = require("../controllers/user.controller");

router.post("/", CreateUser);

router.get("/:nickName", GetUser);

router.get("/", GetUsers);

router.patch("/:nickName", UpdateUser);

router.delete("/:nickName", DeleteUser);

router.patch("/photo", UploadPhoto);

module.exports = router;
