const express = require("express");
const router = express.Router();
const tecsRouter = require("./tecsRouter.js");
const muestrasRouter = require("./muestrasRouter.js");
const cassetesRouter = require("./cassetesRouter.js");
const imgsRouter = require("./imgsRouter.js");

router.use("/tecs" , tecsRouter);
router.use("/muestras" , muestrasRouter);
router.use("/cassetes" , cassetesRouter);
router.use("/imgs" , imgsRouter);

module.exports = router;