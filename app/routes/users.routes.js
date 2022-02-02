const express = require("express");
const router = express.Router();
const checkRoleAuth = require("../middleware/roleAuth");
const {
  CreateUser,
  GetUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
  UploadPhoto,
  ChangeRole,
} = require("../controllers/user.controller");

router.post("/", /*checkAuth,*/ checkRoleAuth(["admin"]), CreateUser);

router.get("/:nickName", checkRoleAuth(["admin"]), GetUser);

router.get("/", checkRoleAuth(["admin"]), GetUsers);

router.patch("/:nickName", checkRoleAuth(["admin"]), UpdateUser);

router.delete("/:nickName", checkRoleAuth(["admin"]), DeleteUser);

router.patch("/photo", checkRoleAuth(["admin"]), UploadPhoto);

router.patch("/role/:nickName", checkRoleAuth(["admin"]), ChangeRole);

module.exports = router;
