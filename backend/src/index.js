const bodyParser = require("body-parser")
const express = require("express");
const app = express();
require('dotenv').config();
// require("./database/associations.js");

const router = require("./routes/index.js");
const sequelize = require("./database/conection.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api" , router);

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto: " + PORT);
    sequelize.sync({force: false})
    .then(() => console.log("tablas sincronizadas"))
    .catch(error => console.log(error));
});