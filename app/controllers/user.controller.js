const { httpError } = require("../helpers/handleError");
const userModel = require("../models/users.model");

const CreateUser = async (req, res) => {
  try {
    const { name, lastName, nickName, email, password } = req.body;

    if (!name || !lastName || !nickName || !email || !password) {
      return res
        .status(400)
        .send({ error: "Todos los campos deben estar llenos" });
    }

    const userExist = await userModel.findOne({ nickName: nickName });

    if (userExist) {
      return res.status(422).send({ error: "User already exists" });
    }

    // const passwordHash = await encrypt(req.password);
    // req.password = passwordHash;

    const createUser = await userModel.create({
      name,
      lastName,
      nickName,
      email,
      password,
    });

    res.send({ data: "User is created successfully" });
  } catch (error) {
    httpError(res, error);
  }
};

const GetUser = async (req, res) => {
  try {
    const { nickName } = req.params;

    const user = await userModel.findOne({
      nickName,
    });

    if (!user) {
      res.status(400);
      return res.json({
        message: "nickName not found",
      });
    }

    res.send(user);
  } catch (err) {
    httpError(res, error);
  }
};

const GetUsers = async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.send({ data: getUsers });
  } catch (error) {
    httpError(res, error);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { nickName } = req.params;

    const { name, lastName, userName, email, password } = req.body;

    const user = await userModel.findOneAndUpdate(
      {
        nickName: nickName,
      },
      {
        name,
        lastName,
        userName,
        nickName:req.body.nickName,
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
      message: `user ${user.nickName} is updated`,
    });
  } catch (err) {
    httpError(res, error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { nickName } = req.params;

    const user = await userModel.findOneAndDelete({
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
  } catch (err) {
    httpError(res, error);
  }
};

module.exports = { CreateUser, GetUser, GetUsers, UpdateUser, DeleteUser };
