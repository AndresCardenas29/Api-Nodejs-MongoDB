const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      nickName: user.nickName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

const decodeSign = async (token) => {
  return jwt.decode(token, null);
};

module.exports = { tokenSign, verifyToken, decodeSign };
