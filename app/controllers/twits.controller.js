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

const UpdateTwit = async (req, res) => {
  try {
    const { _id, twitText } = req.body;
    const searchId = await twitModel.findById(_id);

    if (!searchId) {
      return res.send({ error: "id not found" });
    }

    const updateTwit = await twitModel.findByIdAndUpdate(_id, {
      twitText: twitText,
    });

    if (!updateTwit) {
      return res.send({ error: "twit not updated" });
    }

    return res.send({ message: "twit updated" });
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
  const twit = await twitModel.find().populate("_idUser", "nickName");
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
  // inicio y limite para poder paginar los twits
  // amountTwits el numero de twits que uno quiere mostrar por usuario
  const { initialUsers, amountUsers, amountTwits } = req.body;

  // nombre de usuario a mostrar twits
  const { nickName } = req.params;

  // obtiene el usuairo
  const user = await userModel
    .findOne({ nickName })
    .populate("following")
    .populate("twits");

  // se verifica si el usuario existe
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  // se obtiene los usuarios que se estan siguiendo
  const getIdUsers = user.following.map((following) => {
    return following._id;
  });

  // arreglo en donde se guardaran los usuarios que se les extraera los twits
  const userShow = [];
  // arreglo en donde se guardaran los twits que se van a mostrar
  const twitsToShow = new Array();

  // bucle para limitar la salidad de usuarios y tiwts
  // se tomaran por mucho 5 usuarios, o menos
  for (let i = initialUsers; i < amountUsers && i < getIdUsers.length; i++) {
    userShow.push(getIdUsers[i]);
    // se extraera n cantidad de tiwts que el front pida
    twitsToShow.push(
      await twitModel
        .find({ _idUser: getIdUsers[i] })
        .sort([["createdAt", -1]])
        .skip(0)
        .limit(amountTwits)
        .populate("_idUser", ["name", "lastName", "photo"])
    );
  }

  return res.json(twitsToShow);
};

// const new = async (req, res) => {};

module.exports = {
  CreateTwit,
  DeleteTwit,
  GetTwits,
  GetTwit,
  GetTwitFollowing,
  UpdateTwit,
};
