const express = require("express");
const router = express.Router();
const tecsRouter = require("./tecsRouter.js");

router.use("/tecs" , tecsRouter);

module.exports = router;