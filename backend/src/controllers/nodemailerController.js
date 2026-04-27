const { transporter } = require("./../services/nodemailerService");

const createPass = () => {
    const newPass = "PassPrueba";
    return newPass;
}

const sendMailPass = async (req, res) => {

    if (!req.body.userMail) {
        return res.status(400).json({
            error: "No se ha obtenido email"
        });
    }

    const userMail = req.body.userMail;
    const newPass = createPass();

    try {
        const info = await transporter.sendMail({
            from: '<dawsanitaria@gmail.com>',
            to: userMail,
            subject: "Recuperación de contraseña",
            html: "<h2>Has solicitado un cambio de contraseña para tu cuenta, tu nueva contraseña es: </h2><p>" + newPass + "</p>",
        });

        return res.status(403).json({
            error: "Mensaje enviado: " + info.messageId
        });

    } catch (err) {
        res.status(500).json({
            error: "Error en el envío del mensaje:" + err
        });
    }
}

module.exports = { sendMailPass }