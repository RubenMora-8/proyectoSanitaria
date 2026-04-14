// LOGIN/RECUPERAR CONTRASEÑA - Intercambio de formularios
// Seleccionamos las dos secciones
const login = document.getElementById('seccion-login');
const recuperar = document.getElementById('seccion-recuperar');

// Seleccionamos los enlaces que disparan el cambio
const btnIrARecuperar = document.getElementById('abrir-recuperar');
const btnIrALogin = document.getElementById('volver-login');

// Evento para ir a Recuperar Contraseña
btnIrARecuperar.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el '#' recargue la página
    login.classList.add('tarjeta-acceso__contenido--oculto');
    recuperar.classList.remove('tarjeta-acceso__contenido--oculto');
});

// Evento para volver al Login
btnIrALogin.addEventListener('click', (e) => {
    e.preventDefault();
    recuperar.classList.add('tarjeta-acceso__contenido--oculto');
    login.classList.remove('tarjeta-acceso__contenido--oculto');
});