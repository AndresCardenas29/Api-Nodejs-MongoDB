const express = require("express");
const router = express.Router();

const {
  CreateTwit,
  DeleteTwit,
  GetTwits,
  GetTwit,
  GetTwitFollowing,
  UpdateTwit,
} = require("../controllers/twits.controller");

// Crear Twit
router.post("/", CreateTwit);

// Editar Twit
router.patch("/", UpdateTwit);

// Eliminar twit
router.delete("/", DeleteTwit);

// er todos los twits
router.get("/", GetTwits);

// Ver Twits por usuario
router.get(`/:nickName`, GetTwit);

// Ver Twits de usuarios siguiendo
router.get(`/following/:nickName`, GetTwitFollowing);

// comentarioos
router.post("/api/coments", async (req, res) => {
  res.send("comentario");
});

module.exports = router;
