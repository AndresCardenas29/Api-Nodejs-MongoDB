const express = require("express");
const router = express.Router();
const fs = require("fs");

const pathRouter = `${__dirname}`;

const removeExtencion = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtencion(file);
  const skip = ["index"].includes(fileWithOutExt);
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}.routes`));
    console.log(`===> ${fileWithOutExt}`);
  }
});

router.get("*", (req, res) => {
  res.status(404).send({ error: "Not Found" });
});

module.exports = router;
