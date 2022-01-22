const express = require('express');
const router = express.Router();
const {
  Twit,
} = require('../models');

const url = '/api/twit';

// Crear Twit
router.post(url, async (req,res) => {

  const {
    _idUser,
    twitText,
    photo,
    gift,
    ubication
  } = req.body;

  if(_idUser, twitText) {
    const twit = new Twit({
      _idUser,
      twitText
    });
    const rpta = await twit.save();

    return res.send(rpta)

  }

  res.send(msg);
});

module.exports = router;