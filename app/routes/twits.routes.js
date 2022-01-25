const express = require("express");
const router = express.Router();

const url = "/api/twit";

const {
  CreateTwit,
  DeleteTwit,
  GetTwits,
  GetTwit,
  GetTwitFollowing,
} = require("../controllers/twits.controller");

// Crear Twit
router.post('/', CreateTwit);

// Eliminar twit
router.delete('/', DeleteTwit);

//ver todos los twits
router.get('/', GetTwits);

// Ver Twits por usuario
router.get(`/:nickName`, GetTwit);

// Ver Twits de usuarios siguiendo
router.get(`/following/:nickName`, GetTwitFollowing);

// comentarioos
router.post("/api/coments", async (req, res) => {
  res.send("comentario");
});

module.exports = router;
