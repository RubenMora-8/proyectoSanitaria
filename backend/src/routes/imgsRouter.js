const express = require("express");
const imgsRouter = express.Router();
const imgsController = require("../controllers/imgController.js");

imgsRouter.get("/" , imgsController.getAllImgs);

module.exports = imgsRouter;