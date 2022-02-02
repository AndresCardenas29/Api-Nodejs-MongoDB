const { httpError } = require("../helpers/handleError");
const commentsModel = require("../models/comments.models");
const userModel = require("../models/users.model");
const twitsModels = require("../models/twits.models");

const CreateComment = async (req, res) => {
  try {
    const { idUser, idTwit, comments } = req.body;

    if (!(await userModel.findOne({ _id: idUser }))) {
      return res.send({ error: "User not found" });
    }

    if (!(await twitsModels.findOne({ _id: idTwit }))) {
      return res.send({ error: "Twit not found" });
    }

    const addComment = await commentsModel.create({
      _idUser: idUser,
      _idTwit: idTwit,
      comments: comments,
    });

    if (!addComment) {
      return res.send(`Comentario no agregado`);
    }

    const addToUser = await userModel.findOneAndUpdate(
      { _id: idUser },
      {
        $push: {
          comments: addComment._id,
        },
      }
    );

    if (!addToUser) {
      return res.send(`User not found`);
    }

    const addToTwit = await twitsModels.findOneAndUpdate(
      { _id: idTwit },
      {
        $push: {
          comments: addComment._id,
        },
      }
    );

    if (!addToTwit) {
      return res.send(`Twit not found`);
    }

    return res.send(addComment);
  } catch (err) {
    httpError(res, err);
  }
};

const DeleteComment = async (req, res) => {
  try {
    const { _idTwit } = req.body;

    const getComment = await commentsModel.findOneAndRemove({ _id: _idTwit });

    if (!getComment) {
      return res.send({ error: `Comment not found` });
    }

    const remToUser = await userModel.findOneAndUpdate(
      {
        _id: getComment._idUser,
      },
      {
        $pull: {
          comment: getComment._id,
        },
      }
    );

    if (!remToUser) {
      return res.send({ error: `User not found but Comment delete` });
    }

    const remToTwit = await twitsModels.findOneAndUpdate(
      {
        _id: getComment._idTwit,
      },
      {
        $pull: {
          comment: getComment._id,
        },
      }
    );

    if (!remToTwit) {
      return res.send({ error: `Twit not found but User delete` });
    }

    return res.send(getComment);
  } catch (err) {
    httpError(res, err);
  }
};

const EditComment = async (req, res) => {
  
  try {
    const { idComment, comments } = req.body;

  console.log(`#############################\n${idComment}`);

  const getComent = await commentsModel.findByIdAndUpdate(
    { _id: idComment },
    {
      comments,
    }
  );

  if (!getComent) {
    return res.status(404).send({error: 'Not Updated'});
  }

  return res.send({status: true});
  } catch (err) {
    httpError(res, err);
  }

};

const GetCommentNickName = async (req, res) => {
  try {
    const { nickName } = req.params;

    const getUsers = await userModel.findOne({ nickName }).populate("comments");

    if (!getUsers) {
      return res.status(404).send({ status: `User not found` });
    }

    const comments = getUsers.comments;

    // const getComments = await commentsModel.find({})
    res.send(comments);
  } catch (err) {
    httpError(res, err);
  }
};

const GetCommentById = async (req, res) => {
  try {
    const { idComment } = req.body;

    const getComment = await commentsModel.findOne({ _id: idComment });

    if (!getComment) {
      return res.status(404).send({ status: "Comment not found" });
    }

    res.send(getComment);
  } catch (err) {
    httpError(res, err);
  }
};

const GetCommentsTwit = async (req, res) => {
  try {
    const { page } = req.params;
    const { idTwit } = req.body;

    const limite = page*5;

    const getTwit = await twitsModels
      .find({ _id: idTwit })
      .populate("comments")
      .skip(limite-5)
      .limit(limite);

    if (!getTwit) {
      return res.status(404).send({ status: "Comment not found" });
    }

    res.send(getTwit[0].comments);
  } catch (err) {
    httpError(res, err);
  }
};

module.exports = {
  CreateComment,
  DeleteComment,
  EditComment,
  GetCommentNickName,
  GetCommentsTwit,
  GetCommentById,
};
