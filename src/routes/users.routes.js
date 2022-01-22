const express = require('express');
const router = express.Router();
const {
  User,
  Following
} = require('../models');
const {
  createJWTToken
} = require('../util/auth')



const url = '/api/users'

// Crear usuario
router.post(url, async (req, res) => {
  const {
    name,
    lastName,
    nickName,
    email,
    password
  } = req.body;

  if (name && lastName && nickName && email && password) {

    const user = new User({
      name,
      lastName,
      nickName,
      email,
      password
    });

    await user.save();

    const token = createJWTToken({
      _id: user._id,
      nickName: user.nickName,
      email: user.email
    });

    const result = {
      status: 'saved',
      token: token
    };

    res.json(result)
  } else {
    res.send("Wrong Request")
  }


});

// Listar todos los usuarios
router.get(url, async (req, res) => {
  const user = await User.find();
  res.json(user);
});

// Mostrar un usuario por el nickName
router.get(`${url}/:nickName`, async (req, res) => {
  const {
    nickName
  } = req.params;

  const user = await User.findOne({
    nickName
  });

  if (!user) {
    res.status(400)
    return res.json({
      message: "nickName not found"
    })
  }

  res.send(user);
});

// Eliminar un usuario por el nickName
router.delete(`${url}/:nickName`, async (req, res) => {
  const {
    nickName
  } = req.params;

  const user = await User.findOneAndDelete({
    "nickName": nickName
  });

  if (!user) {
    res.status(400)
    return res.json({
      message: "nickName not found"
    })
  }

  res.json({
    "message": "User Delete",
    "userDelete": user.nickName,
    "email": user.email
  });
});

// Modificar un usuario por el nickName
router.put(`${url}/:nickName`, async (req, res) => {
  const {
    nickName
  } = req.params;

  const {
    name,
    lastName,
    userName,
    email,
    password
  } = req.body;

  const user = await User.findOneAndUpdate({
    nickName: nickName
  }, {
    name,
    lastName,
    userName,
    nickName,
    email,
    password
  }, {
    new: true,
    runValidators: true
  });

  if (!user) {
    res.status(400)
    return res.json({
      "message": "data not updated"
    });
  }

  return res.json({
    "message": `user ${userName} is updated`
  });

});

router.post('/api/following', async (req, res) => {

  const {
    following
  } = req.body;

  const user = await User.findOneAndUpdate({
      nickName: 'peca'
    },
    {$push: {following: following}}, {
      new: true
    });

  if (!user) {
    res.status(400);
    return res.json({
      "message": "data not updated"
    });
  }

  return res.json(user);
});

router.post('/api/followers', async (req, res) => {

  const {
    followers
  } = req.body;

  const user = await User.findOneAndUpdate({
      nickName: 'peca'
    },
    {$push: {followers: followers}}, {
      new: true
    });

  if (!user) {
    res.status(400);
    return res.json({
      "message": "data not updated"
    });
  }

  return res.json(user);
});

router.get('/api/followers/:nickName', async (req, res) => {

  const { nickName } = req.params;

  const user = await User.findOne({nickName:nickName});

  if (!user) {
    res.status(400);
    return res.json({
      "message": "user not found"
    });
  }

  return res.json(user.following.length);
});

router.get('/api/following/:nickName', async (req, res) => {

  const { nickName } = req.params;

  const user = await User.findOne({nickName:nickName});

  if (!user) {
    res.status(400);
    return res.json({
      "message": "user not found"
    });
  }

  return res.json(user.following.length);
});



module.exports = router;