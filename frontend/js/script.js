// LOGIN/RECUPERAR CONTRASEÑA - Intercambio de formularios
// Seleccionamos las dos secciones
const login = document.getElementById('seccion-login');
const recuperar = document.getElementById('seccion-recuperar');
const footerLogin = document.getElementById('footer-login');
const footerRecuperar = document.getElementById('footer-recuperar');

// Seleccionamos los enlaces que disparan el cambio
const btnIrARecuperar = document.getElementById('abrir-recuperar');
const btnIrALogin = document.getElementById('volver-login');

if (btnIrARecuperar && btnIrALogin && login && recuperar) {
    // Evento para ir a Recuperar Contraseña
    btnIrARecuperar.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que el '#' recargue la página
        login.classList.add('tarjeta-acceso__contenido--oculto');
        recuperar.classList.remove('tarjeta-acceso__contenido--oculto');
        footerLogin?.classList.add('tarjeta-acceso__contenido--oculto');
        footerRecuperar?.classList.remove('tarjeta-acceso__contenido--oculto');
    });

    // Evento para volver al Login
    btnIrALogin.addEventListener('click', (e) => {
        e.preventDefault();
        recuperar.classList.add('tarjeta-acceso__contenido--oculto');
        login.classList.remove('tarjeta-acceso__contenido--oculto');
        footerRecuperar?.classList.add('tarjeta-acceso__contenido--oculto');
        footerLogin?.classList.remove('tarjeta-acceso__contenido--oculto');
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

const formularioRegistro = document.querySelector('form.formulario-acceso');
const passwordRegistro = document.querySelector('[data-password-role="principal"]');

const obtenerAyudaPassword = (input) => input?.closest('.formulario-acceso__campo')?.querySelector('.formulario-acceso__ayuda');

const validarRequisitosPassword = (password) => {
    const faltantes = [];

    if (password.length < 8 || password.length > 16) {
        faltantes.push('tener entre 8 y 16 caracteres');
    }

    if (!/[A-ZÁÉÍÓÚÜÑ]/.test(password)) {
        faltantes.push('incluir al menos una mayúscula');
    }

    if (!/[a-záéíóúüñ]/.test(password)) {
        faltantes.push('incluir al menos una minúscula');
    }

    if (!/\d/.test(password)) {
        faltantes.push('incluir al menos un número');
    }

    if (!/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]/.test(password)) {
        faltantes.push('incluir al menos un símbolo especial');
    }

    return faltantes;
};

const formatearMensajeFaltantes = (faltantes) => {
    if (faltantes.length === 1) {
        return `La contraseña debe ${faltantes[0]}.`;
    }

    if (faltantes.length === 2) {
        return `La contraseña debe ${faltantes[0]} y ${faltantes[1]}.`;
    }

    const ultimo = faltantes[faltantes.length - 1];
    const resto = faltantes.slice(0, -1).join(', ');
    return `La contraseña debe ${resto} y ${ultimo}.`;
};

const actualizarEstadoAyuda = (ayuda, mensaje, esValido) => {
    if (!ayuda) {
        return;
    }

    ayuda.textContent = mensaje;
    ayuda.classList.toggle('formulario-acceso__ayuda--oculta', mensaje.length === 0);
    ayuda.classList.toggle('formulario-acceso__ayuda--error', !esValido);
    ayuda.classList.toggle('formulario-acceso__ayuda--ok', esValido);
};

const validarPasswordRegistro = () => {
    if (!passwordRegistro) {
        return true;
    }

    const ayudaPrincipal = obtenerAyudaPassword(passwordRegistro);
    const password = passwordRegistro.value.trim();

    if (password.length === 0) {
        passwordRegistro.setCustomValidity('Introduce una contraseña.');
        actualizarEstadoAyuda(ayudaPrincipal, '', false);
        return false;
    }

    const faltantes = validarRequisitosPassword(password);

    if (faltantes.length === 0) {
        passwordRegistro.setCustomValidity('');
        actualizarEstadoAyuda(ayudaPrincipal, '', true);
        return true;
    }

    const mensaje = formatearMensajeFaltantes(faltantes);
    actualizarEstadoAyuda(ayudaPrincipal, mensaje, false);
    passwordRegistro.setCustomValidity(mensaje);
    return false;
};

if (formularioRegistro && passwordRegistro) {
    validarPasswordRegistro();

    passwordRegistro.addEventListener('input', validarPasswordRegistro);

    formularioRegistro.addEventListener('submit', (event) => {
        if (!validarPasswordRegistro()) {
            event.preventDefault();
            formularioRegistro.reportValidity();
        }
    });
}
