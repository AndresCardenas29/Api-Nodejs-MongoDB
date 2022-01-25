const { httpError } = require("../helpers/handleError");
const isImageURL = require("image-url-validator").default;
const twitModel = require("../models/twits.models");
const userModel = require("../models/users.model");

const CreateTwit = async (req, res) => {
  try {
    // se obtienen los datos
    const { _idUser, twitText, photo, gift, ubication } = req.body;

    // se verifica si la imagen es valida
    if (photo) {
      if (!(await isImageURL(photo))) {
        return res.send({
          message: "invalid image",
        });
      }
    }

    // se verifica si el gif es valido
    if (gift) {
      if (!(await isImageURL(gift))) {
        return res.send({
          message: "invalid gif",
        });
      }
    }

    // se verifica que hay un usuario y un twit
    // de lo contrario no agregara nada
    if (_idUser && twitText) {
      const twit = await new twitModel({
        _idUser: _idUser,
        twitText: twitText,
        photo: photo,
        gift: gift,
        ubication: ubication,
      }).save();

      if (!twit) {
        return res.send({ message: "Twit not uploaded!" });
      }

      await userModel.findOneAndUpdate(
        {
          _id: _idUser,
        },
        {
          $push: {
            twits: twit._id,
          },
        },
        {
          new: true,
        }
      );

      return res.send({
        message: true,
      });
    }

    res.send({
      message: "error",
    });
  } catch (err) {
    httpError(res, err);
  }
};

const DeleteTwit = async (req, res) => {
  const { idTwit } = req.body;

  const delTwit = await twitModel.findOneAndDelete({
    _id: idTwit,
  });

  if (!delTwit) {
    return res.status(400).json({
      Message: "Twit not found",
    });
  }

  const delTwitUser = await userModel.findOneAndUpdate(
    {
      _id: delTwit._idUser,
    },
    {
      $pull: {
        twits: idTwit,
      },
    }
  );

  if (!delTwitUser) {
    return res.status(400).json({
      Message: "Twit del from user",
    });
  }

  res.json({
    message: "Twit Delete",
    "id twit": delTwit._id,
  });
};

const GetTwits = async (req, res) => {
  const twit = await twitModel.find().populate("_idUser","nickName");
  if (!twit) {
    return res.send({
      message: "No hay twits",
    });
  }
  return res.send(twit);
};

const GetTwit = async (req, res) => {
  const { nickName } = req.params;

  const twit = await twitModel.find({
    nickName,
  });

  if (!twit || twit == []) {
    return res.status(400).send({
      message: "not found Twit",
    });
  }
  return res.send(twit);
};

const GetTwitFollowing = async (req, res) => {
  const { nickName } = req.params;
  const users = await userModel.find({ nickName });
  res.send(users);
};

// const CreateTwit = async (req, res) => {};

module.exports = {
  CreateTwit,
  DeleteTwit,
  GetTwits,
  GetTwit,
  GetTwitFollowing,
};
