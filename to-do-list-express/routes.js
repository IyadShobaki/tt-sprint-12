const router = require("express");

const { postForm, getMainPage } = require("./helpers");

router.get("/", getMainPage);
router.post("/submit", postForm);

module.exports = router;
