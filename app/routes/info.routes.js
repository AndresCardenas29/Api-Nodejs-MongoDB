const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let data = {
    version: "1.0",
    urlHost: "http://apinek.ddns.net:3000/",
    github: "https://github.com/AndresCardenas29",
    wpp: "https://wa.me/573058849814",
    telegram: "https://t.me/nekdress",
    linkedin: "https://www.linkedin.com/in/mandrescardenash/",
  };
  res.render("index", { data });
});

module.exports = router;
