const QRCode = require('qrcode');

const generarQRBuffer = async (texto) => {
    try {
        const qrBuffer = await QRCode.toBuffer(texto);
        return qrBuffer;
    } catch (error) {
        console.error("Error al generar QR:", error);
        return null;
    }
};

module.exports = { generarQRBuffer };