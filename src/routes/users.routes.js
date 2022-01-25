const express = require("express");
const router = express.Router();
const { User, Following } = require("../models");
const { createJWTToken } = require("../util/auth");

const url = "/api/users";

// Crear usuario
router.post(url, async (req, res) => {
  const { name, lastName, nickName, email, password } = req.body;

  if (name && lastName && nickName && email && password) {
    const user = new User({
      name,
      lastName,
      nickName,
      email,
      password,
    });

    await user.save();

    const token = createJWTToken({
      _id: user._id,
      nickName: user.nickName,
      email: user.email,
    });

    const result = {
      status: "saved",
      token: token,
    };

    res.json(result);
  } else {
    res.send("Wrong Request");
  }
});

// Listar todos los usuarios
router.get(url, async (req, res) => {
  const user = await User.find().populate("following").populate("followers");
  res.json(user);
});

// Mostrar un usuario por el nickName
router.get(`${url}/:nickName`, async (req, res) => {
  const { nickName } = req.params;

  const user = await User.findOne({
    nickName,
  });

  if (!user) {
    res.status(400);
    return res.json({
      message: "nickName not found",
    });
  }

  res.send(user);
});

// Eliminar un usuario por el nickName
router.delete(`${url}/:nickName`, async (req, res) => {
  const { nickName } = req.params;

  const user = await User.findOneAndDelete({
    nickName: nickName,
  });

  if (!user) {
    res.status(400);
    return res.json({
      message: "nickName not found",
    });
  }

  res.json({
    message: "User Delete",
    userDelete: user.nickName,
    email: user.email,
  });
});

// Modificar un usuario por el nickName
router.put(`${url}/:nickName`, async (req, res) => {
  const { nickName } = req.params;

  const { name, lastName, userName, email, password } = req.body;

  const user = await User.findOneAndUpdate(
    {
      nickName: nickName,
    },
    {
      name,
      lastName,
      userName,
      nickName,
      email,
      password,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    res.status(400);
    return res.json({
      message: "data not updated",
    });
  }

  return res.json({
    message: `user ${userName} is updated`,
  });
});

// Agregar id del seguidor
router.post("/api/follow", async (req, res) => {
  // obtener datos del body
  const { following, nickName } = req.body;
  // verificar el tamaño del id sea 24
  if (following.length > 24 || following.length < 24) {
    return res.json({ message: "ID invalid" });
  }
  // buscar si el usuario a seguir existe
  const findFollow = await User.findOne({ _id: following });

  // buscar usuario quien va a seguir para verificar seguidor
  const userFind = await User.findOne({ nickName: nickName }).populate(
    "following",
    "nickName"
  );
  // verifica si ese usuario tiene ese seguidor
  const idFollowing = userFind.following.find((e) => e._id == following);
  // si no lo tiene, manda error
  if (idFollowing) {
    return res.status(400).json({ message: "following found" });
  }

  // Add following
  // se busca el usuario y se agrega el id a quien va a seguir
  const userFollowing = await User.findOneAndUpdate(
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
  // se busca el usuario y se agrega el id del seguidor
  const userFollower = await User.findOneAndUpdate(
    {
      _id: following, // se busca el id del seguidor
    },
    {
      $push: {
        followers: userFollowing._id, // se agrega la id de quien lo sigue
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
});

// quitar id del unfollowing
router.post("/api/unfollow", async (req, res) => {
  // obtener datos del body
  const { following, nickName } = req.body;

  // buscar usuario quien va a dejar de seguir para verificar seguidor
  const userFind = await User.findOne({ nickName: nickName }).populate(
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
  const userFollowing = await User.findOneAndUpdate(
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
  const userFollower = await User.findOneAndUpdate(
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
});

// Muestra los seguidores
router.get("/api/followers/:nickName", async (req, res) => {
  const { nickName } = req.params;

  const user = await User.findOne({
    nickName: nickName,
  }).populate("followers");

  if (!user) {
    res.status(400);
    return res.json({
      message: "user not found",
    });
  }

  return res.json(user.followers);
});

// Muestra a quienes se esta siguiendo
router.get("/api/following/:nickName", async (req, res) => {
  const { nickName } = req.params;

  const user = await User.findOne({
    nickName: nickName,
  }).populate("following");

  if (!user) {
    res.status(400);
    return res.json({
      message: "user not found",
    });
  }

  return res.json(user.following);
});

module.exports = router;
