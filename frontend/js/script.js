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

const formularioRegistro = document.getElementById('formularioRegistro');
const passwordRegistro = document.querySelector('[data-password-role="principal"]');
const passwordConfirmacion = document.querySelector('[data-password-role="confirmacion"]');

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
    ayuda.classList.toggle('formulario-acceso__ayuda--error', !esValido);
    ayuda.classList.toggle('formulario-acceso__ayuda--ok', esValido);
};

const validarPasswordsRegistro = () => {
    if (!passwordRegistro || !passwordConfirmacion) {
        return true;
    }

    const ayudaPrincipal = obtenerAyudaPassword(passwordRegistro);
    const ayudaConfirmacion = obtenerAyudaPassword(passwordConfirmacion);
    const password = passwordRegistro.value.trim();
    const confirmacion = passwordConfirmacion.value.trim();

    let passwordValida = false;
    let confirmacionValida = false;

    if (password.length === 0) {
        actualizarEstadoAyuda(
            ayudaPrincipal,
            'La contraseña debe tener entre 8 y 16 caracteres, mayúsculas, minúsculas, números y símbolos.',
            false
        );
        passwordRegistro.setCustomValidity('Introduce una contraseña.');
    } else {
        const faltantes = validarRequisitosPassword(password);

        if (faltantes.length === 0) {
            actualizarEstadoAyuda(ayudaPrincipal, 'La contraseña cumple todos los requisitos.', true);
            passwordRegistro.setCustomValidity('');
            passwordValida = true;
        } else {
            const mensaje = formatearMensajeFaltantes(faltantes);
            actualizarEstadoAyuda(ayudaPrincipal, mensaje, false);
            passwordRegistro.setCustomValidity(mensaje);
        }
    }

    if (confirmacion.length === 0) {
        actualizarEstadoAyuda(
            ayudaConfirmacion,
            'Repite la contraseña.',
            false
        );
        passwordConfirmacion.setCustomValidity('Repite la contraseña.');
    } else if (confirmacion !== password) {
        actualizarEstadoAyuda(ayudaConfirmacion, 'Las contraseñas no coinciden.', false);
        passwordConfirmacion.setCustomValidity('Las contraseñas no coinciden.');
    } else {
        const faltantesConfirmacion = validarRequisitosPassword(confirmacion);

        if (faltantesConfirmacion.length === 0) {
            actualizarEstadoAyuda(ayudaConfirmacion, 'Las contraseñas coinciden correctamente.', true);
            passwordConfirmacion.setCustomValidity('');
            confirmacionValida = true;
        } else {
            const mensaje = formatearMensajeFaltantes(faltantesConfirmacion);
            actualizarEstadoAyuda(ayudaConfirmacion, mensaje, false);
            passwordConfirmacion.setCustomValidity(mensaje);
        }
    }

    return passwordValida && confirmacionValida;
};

if (formularioRegistro && passwordRegistro && passwordConfirmacion) {
    validarPasswordsRegistro();

    passwordRegistro.addEventListener('input', validarPasswordsRegistro);
    passwordConfirmacion.addEventListener('input', validarPasswordsRegistro);

    formularioRegistro.addEventListener('submit', (event) => {
        if (!validarPasswordsRegistro()) {
            event.preventDefault();
            formularioRegistro.reportValidity();
        }
    });
}

// Registro de usuario

const registerUser = (event) => {
    event.preventDefault();
    const formData = new FormData(formularioRegistro);
    const formJSON = Object.fromEntries(formData.entries());

    console.log(formJSON);
}

const sendRegisterJson = async (userJson) => {
    const res = await fetch("http://www.localhost:3000/api/tecs/register" ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userJson)
    });
}

formularioRegistro.addEventListener("submit", registerUser)