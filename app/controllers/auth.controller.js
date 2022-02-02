const { httpError } = require("../helpers/handleError");
const { encrypt, compare } = require("../helpers/handleBcrypt");
const { tokenSign } = require("../helpers/generateToken");
const userModel = require("../models/users.model");
const { matchedData } = require("express-validator");

const loginCtrl = async (req, res) => {
  try {
    const { nickName, password } = req.body;
    const user = await userModel.findOne({ nickName: nickName });
    if (!user) {
      res.status(404).send({ error: "User not found" });
    }

    const checkPassword = await compare(password, user.password);

    // JWT
    const tokenSession = await tokenSign(user);

    if (checkPassword) {
      res.send({
        data: {
          nickName: user.nickName,
          email: user.email,
        },
        tokenSession,
      });
      return;
    }

    if (!checkPassword) {
      res.status(409).send({ error: "Invalid password" });
    }
  } catch (error) {
    httpError(res, error);
  }
};

const registerCtrl = async (req, res) => {
  try {
    const { name, lastName, nickName, email, password } = req.body;
    const userExist = await userModel.findOne({ nickName });

    if (userExist) {
      return res.status(422).send({ error: "NickName already exists" });
    }

    const emailExist = await userModel.findOne({ email });

    if (emailExist) {
      return res.status(422).send({ error: "Email already exists" });
    }

    const passwordHash = await encrypt(req.password);
    
    const registerUser = await userModel.create({
      name,
      lastName,
      nickName,
      email,
      password: passwordHash
    });

    return res.send(registerUser);
  } catch (err) {
    return httpError(res, err);
  }
};

module.exports = { loginCtrl, registerCtrl };
