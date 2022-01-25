const isImageURL = require('image-url-validator').default;
const {
  Router
} = require('express');
const express = require('express');
const router = express.Router();
const {
  Twit,
} = require('../models');
const User = require('../models/User');

const url = '/api/twit';

// Crear Twit
router.post(url, async (req, res) => {

  // se obtienen los datos
  const {
    _idUser,
    twitText,
    photo,
    gift,
    ubication
  } = req.body;

  // se verifica si la imagen es valida 
  if (photo) {
    if (!await isImageURL(photo)) {
      return res.send({
        'message': 'invalid image'
      });
    }
  }

  // se verifica si el gif es valido
  if (gift) {
    if (!await isImageURL(gift)) {
      return res.send({
        'message': 'invalid gif'
      });
    }
  }

  // se verifica que hay un usuario y un twit
  // de lo contrario no agregara nada
  if (_idUser && twitText) {

    const twit = await Twit({
      _idUser: _idUser,
      twitText: twitText,
      photo: photo,
      gift: gift,
      ubication: ubication
    });

    await User.findOneAndUpdate({
      _id: _idUser
    }, {
      $push: {
        twits: twit._id
      }
    }, {
      new: true
    });

    return res.send({
      "message": true
    });

  }

  res.send({
    "message": "error"
  });
});

// Eliminar twit
router.delete(url, async (req, res) => {

  const {
    idTwit
  } = req.body;

  const delTwit = await Twit.findOneAndDelete({
    _id: idTwit
  });

  if (!delTwit) {
    return res.status(400).json({
      "Message": "Twit not found"
    });
  }

  const delTwitUser = await User.findOneAndUpdate({
    _id:delTwit._idUser
  }, {
    $pull: {
      twits:idTwit
    }
  });

  if(!delTwitUser) {
    return res.status(400).json({
      "Message": "Twit del from user"
    });
  }

  res.json({
    "message": "Twit Delete",
    "id twit": delTwit._id
  });

});

//ver todos los twits
router.get(url, async (req, res) => {
  const twit = await Twit.find().populate("_idUser");
  if (!twit) {
    return res.send({
      "message": "No hay twits"
    });
  }
  return res.send(twit);
});

// Ver Twits por usuario
router.get(`${url}/:nickName`, async (req, res) => {

  const {
    nickName
  } = req.params;

  const twit = await Twit.find({
    nickName
  }).populate('_idUser', 'nickName');

  if (!twit) {
    return res.status(400).send({
      'message': 'not found Twit'
    })
  }


  return res.send(twit);

});

module.exports = router;