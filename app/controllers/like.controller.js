const { httpError } = require("../helpers/handleError");
const twitsModel = require("../models/twits.models");
const usersModel = require("../models/users.model");

const setLike = async (req, res) => {
  try {
    const { idUser, idTwit } = req.body;

    if (!(await usersModel.findOne({ _id: idUser }))) {
      return res.send({ status: false, message: "User not found" });
    }

    const getTwits = await twitsModel.find({ _id: idTwit });

    const verifyLike = getTwits[0].likes.find(e => e == idUser);

    if (verifyLike) {
      return res.send({status: false, message: "ya se ha dado like"});
    }

    const setLike = await twitsModel.findByIdAndUpdate(
      { _id: idTwit },
      {
        $push: {
          likes: idUser,
        },
      }
    );

    if (!setLike) {
      return res.send({ status: false, message: "Like not update" });
    }

    return res.send(setLike);
  } catch (err) {
    httpError(res, err);
  }
};

const unlike = async (req, res) => {
  try {
    const { idUser, idTwit } = req.body;

    if (!(await usersModel.findOne({ _id: idUser }))) {
      return res.send({ status: false, message: "User not found" });
    }

    const getTwits = await twitsModel.find({ _id: idTwit });

    const verifyLike = getTwits[0].likes.find(e => e == idUser);

    if (!verifyLike) {
      return res.send({status: false, message: "no se ha dado like"});
    }

    const removeLike = await twitsModel.findByIdAndUpdate(
      { _id: idTwit },
      {
        $pull: {
          likes: idUser,
        },
      }
    );

    if (!removeLike) {
      return res.send({ status: false, message: "Remove like not update" });
    }

    return res.send(removeLike);
  } catch (err) {
    httpError(res, err);
  }
};

const getLikeByTwit = async (req, res) => {
  try {
    const { idTwit } = req.body;

    const getTwit = await twitsModel
      .find({ _id: idTwit })
      .populate("likes", ["name", "lastName", "photo"]);
    if (!getTwit) {
      return res.send({ status: "Twit not found" });
    }

    return res.send(getTwit);
  } catch (err) {
    httpError(res, err);
  }
};

module.exports = { getLikeByTwit, setLike, unlike };
