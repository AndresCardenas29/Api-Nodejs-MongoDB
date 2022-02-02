const express = require("express");
const router = express.Router();
const checkRoleAuth = require("../middleware/roleAuth");

const {
  validateID,
  validateNickName,
} = require("../validators/validateDefault");

const {
  validateCreateTwit,
  validateUpdateTwit,
  validateGetTwitFollowing,
} = require("../validators/validateTwit");

const {
  CreateTwit,
  DeleteTwit,
  GetTwits,
  GetTwit,
  GetTwitFollowing,
  UpdateTwit,
} = require("../controllers/twits.controller");

// Crear Twit
router.post("/", validateCreateTwit, checkRoleAuth(["user"]), CreateTwit);

// Editar Twit
router.patch("/", validateUpdateTwit, checkRoleAuth(["user"]), UpdateTwit);

// Eliminar twit
router.delete("/", validateID, checkRoleAuth(["user"]), DeleteTwit);

// ver todos los twits
router.get("/", checkRoleAuth(["admin"]), GetTwits);

// Ver Twits por usuario
router.get(`/:nickName`, validateNickName, checkRoleAuth(["user"]), GetTwit);

// Ver Twits de usuarios siguiendo
router.get(
  `/following/:nickName`,
  validateGetTwitFollowing,
  checkRoleAuth(["user"]),
  GetTwitFollowing
);

// comentarioos
router.post("/api/coments", async (req, res) => {
  res.send("comentario");
});

module.exports = router;
