const express = require('express');
const router = express.Router();
const {
  User
} = require('../models');
const {
  createJWTToken
} = require('../util/auth')

const port = process.env.PORT;
const host = process.env.HOST;



router.get('/', (req, res) => {
  let arr = [{
    'Author': "Andres Cardenas",
    'Name Api': "Api Test",
    'Version': "1.0.0",
    'URL API': `http://${host}:${port}/api/users`
  }]
  res.json(arr);
})

router.post(`/auth`, async (req,res) => {
  const { nickName,password } = req.body;

  const user = await User.findOne({nickName});

  if(!user) {
    res.send(`User not found`);
  }else if(password != user.password) {
    res.send(`Invalid Credentials`);
  }else{
    const token = createJWTToken({
      _id: user._id,
      nickName: user.nickName,
      email: user.email
    });
    res.send(token);
  }

});

module.exports = router;