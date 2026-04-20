// LOGIN/RECUPERAR CONTRASEÑA - Intercambio de formularios
// Seleccionamos las dos secciones
const login = document.getElementById('seccion-login');
const recuperar = document.getElementById('seccion-recuperar');

// Seleccionamos los enlaces que disparan el cambio
const btnIrARecuperar = document.getElementById('abrir-recuperar');
const btnIrALogin = document.getElementById('volver-login');

if (btnIrARecuperar && btnIrALogin && login && recuperar) {
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
}

const botonesTogglePassword = document.querySelectorAll('.formulario-acceso__toggle-password');

botonesTogglePassword.forEach((boton) => {
    boton.addEventListener('click', () => {
        const target = boton.dataset.passwordTarget;
        let inputs = [];

        if (target === 'self') {
            const contenedor = boton.closest('.formulario-acceso__contenedor-password');
            const input = contenedor?.querySelector('input[type="password"], input[type="text"]');

            if (input) {
                inputs = [input];
            }
        } else if (target) {
            inputs = Array.from(document.querySelectorAll(`[data-password-group="${target}"]`));
        }

        if (inputs.length === 0) {
            return;
        }

        const mostrar = inputs[0].type === 'password';

        inputs.forEach((input) => {
            input.type = mostrar ? 'text' : 'password';
        });

        const esGrupo = target && target !== 'self';
        boton.setAttribute(
            'aria-label',
            mostrar
                ? esGrupo ? 'Ocultar contraseñas' : 'Ocultar contraseña'
                : esGrupo ? 'Mostrar contraseñas' : 'Mostrar contraseña'
        );
    });
});
