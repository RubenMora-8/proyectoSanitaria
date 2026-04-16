const bodyParser = require("body-parser")
const express = require("express");
const app = express();
require('dotenv').config();


var cors = require('cors');
// const authMiddleware = require("./middleware/authMiddleware");
require("./database/associations.js");

const router = require("./routes/index.js");
const sequelize = require("./database/conection.js");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.use("/api", router);

// Manejo de errores
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto: " + PORT);
    sequelize.sync({force: false})
    .then(() => console.log("tablas sincronizadas"))
    .catch(error => console.log(error));
});