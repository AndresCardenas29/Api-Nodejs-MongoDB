const { httpError } = require("../helpers/handleError");
const userModel = require("../models/users.model");

const follow = async (req, res) => {
  try {
    // obtener datos del body
    const { following, nickName } = req.body;
    // verificar el tamaño del id sea 24
    if (following.length > 24 || following.length < 24) {
      return res.json({ message: "ID invalid" });
    }
    // buscar si el usuario a seguir existe
    const findFollow = await userModel.findOne({ _id: following });

    // buscar usuario quien va a seguir para verificar seguidor
    const userFind = await userModel
      .findOne({ nickName: nickName })
      .populate("following", "nickName");
    // verifica si ese usuario tiene ese seguidor
    const idFollowing = userFind.following.find((e) => e._id == following);
    // si no lo tiene, manda error
    if (idFollowing) {
      return res.status(400).json({ message: "following found" });
    }

    // Add following
    // se busca el usuario y se agrega el id a quien va a seguir
    const userFollowing = await userModel.findOneAndUpdate(
      {
        nickName: nickName, // nickName del usuario a quien se agrega la id a seguir
      },
      {
        $push: {
          following: following, // se garega la id
        },
      },
      {
        new: true,
      }
    );

    // Add Follower
    // look for the user and add the follower id
    const userFollower = await userModel.findOneAndUpdate(
      {
        _id: following, // se busca el id del seguidor
      },
      {
        $push: {
          followers: userFollowing._id, // add the id of the follower
        },
      },
      {
        new: true,
      }
    );

    // se verifica que se haya agregado el following
    if (!userFollowing) {
      return res.status(400).json({
        message: "following not updated",
      });
    }

    // se verifica que se haya agregado el follower
    if (!userFollower) {
      return res.status(400).json({
        message: "followers not updated",
      });
    }

    return res.json({ message: "Seguidor agregado" });
  } catch (err) {
    httpError(res, err);
  }
};

const unfollow = async (req, res) => {
  try {
    // obtener datos del body
    const { following, nickName } = req.body;

    // buscar usuario quien va a dejar de seguir para verificar seguidor
    const userFind = await userModel.findOne({ nickName: nickName }).populate(
      "following",
      "nickName"
    );

    // verifica si ese usuario tiene ese seguidor
    const idFollowing = userFind.following.find((e) => e._id == following);

    // si no lo tiene, manda error
    if (!idFollowing) {
      return res.status(400).json({ message: "following not found" });
    }

    // Remove following
    const userFollowing = await userModel.findOneAndUpdate(
      {
        nickName: nickName,
      },
      {
        $pull: {
          following: following,
        },
      },
      {
        new: true,
      }
    );

    // Remove Follower
    const userFollower = await userModel.findOneAndUpdate(
      {
        _id: following,
      },
      {
        $pull: {
          followers: userFollowing._id,
        },
      },
      {
        new: true,
      }
    );

    if (!userFollowing) {
      return res.status(400).json({
        message: "following not updated",
      });
    }

    if (!userFollower) {
      return res.status(400).json({
        message: "followers not updated",
      });
    }

    return res.json(userFollowing);
  } catch (err) {
    httpError(res, err);
  }
};

const followers = async (req, res) => {
  try {
    const { nickName } = req.params;

    const user = await userModel.findOne({
      nickName: nickName,
    }).populate("followers");

    if (!user) {
      res.status(400);
      return res.json({
        message: "user not found",
      });
    }

    return res.json(user.followers);
  } catch (err) {
    httpError(res, err);
  }
};

const following = async (req, res) => {
  try {
    const { nickName } = req.params;

    const user = await userModel.findOne({
      nickName: nickName,
    }).populate("following");

    if (!user) {
      res.status(400);
      return res.json({
        message: "user not found",
      });
    }

    return res.json(user.following);
  } catch (err) {
    httpError(res, err);
  }
};

module.exports = { follow, unfollow, followers, following };
