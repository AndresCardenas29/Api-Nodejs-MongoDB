const jwt = require("jsonwebtoken");

const tokenSign = async (req, res) => {
  return jwt.sign(
    {
      _id: req._id,
      nickName: req.nickName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
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
