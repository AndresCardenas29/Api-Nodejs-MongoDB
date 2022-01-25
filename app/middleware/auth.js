const { verifyToken } = require("../helpers/generateToken");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    if (token) {
      next();
    } else {
      res.status(409).send({ error: "Not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(409).send({ error: "Not authorized" });
  }
};

module.exports = checkAuth;
