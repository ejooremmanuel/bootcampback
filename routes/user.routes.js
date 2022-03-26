const { CreateUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/create", CreateUser);

module.exports = router;
