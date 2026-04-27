(function () {
  const CLAVE_STORAGE_CASSETTES = "sanitaria.cassettes";

  const elementos = {
    modalCassette: document.getElementById("modalNuevoCassette"),
    modalEliminarCassette: document.getElementById("modalEliminarCassette"),
    formularioCassette: document.getElementById("formNuevoCassette"),
    tablaCassettesBody: document.getElementById("tablaCassettesBody"),
    mensajeErrorCassette: document.getElementById("mensajeErrorCassette"),
    detalleDescripcion: document.getElementById("detalleDescripcion"),
    detalleOrgano: document.getElementById("detalleOrgano"),
    detalleFecha: document.getElementById("detalleFecha"),
    detalleCaracteristicas: document.getElementById("detalleCaracteristicas"),
    detalleObservaciones: document.getElementById("detalleObservaciones"),
    botonNuevoCassette: document.getElementById("botonNuevoCassette"),
    botonEliminarCassette: document.getElementById("botonEliminarCassette"),
    botonEditarCassette: document.getElementById("botonEditarCassette"),
    botonConfirmarEliminarCassette: document.getElementById(
      "confirmarEliminarCassette"
    ),
    modalNuevoCassetteLabel: document.getElementById("modalNuevoCassetteLabel"),
    botonGuardarCassette: document.getElementById("botonGuardarCassette"),
    textoEliminarCassette: document.getElementById("textoEliminarCassette"),
    botonesOrden: document.querySelectorAll(".btn-tabla-orden"),
    descripcionCorta: document.getElementById("descripcionCorta"),
    fechaCassette: document.getElementById("fechaCassette"),
    organoCassette: document.getElementById("organoCassette"),
    caracteristicasCassette: document.getElementById("caracteristicasCassette"),
    observacionesCassette: document.getElementById("observacionesCassette"),
  };

  if (!elementos.modalCassette || !elementos.formularioCassette) {
    return;
  }

  const modales = {
    cassette: new bootstrap.Modal(elementos.modalCassette),
    eliminar: new bootstrap.Modal(elementos.modalEliminarCassette),
  };

  const detalleVacio = {
    descripcion: elementos.detalleDescripcion.textContent.trim(),
    organoTexto: elementos.detalleOrgano.textContent.trim(),
    fechaTexto: elementos.detalleFecha.textContent.trim(),
    caracteristicas: elementos.detalleCaracteristicas.textContent.trim(),
    observaciones: elementos.detalleObservaciones.textContent.trim(),
  };

  const estado = {
    orden: { campo: null, direccion: "asc" },
    modoFormulario: "crear",
    cassetteEnEdicion: null,
    cassettePendienteEliminar: null,
    temporizadorDialogo: null,
  };

  function formatearFecha(fechaISO) {
    const [anio, mes, dia] = fechaISO.split("-");
    return `${dia}-${mes}-${anio}`;
  }

  function formatearFechaParaInput(fechaTexto) {
    if (!fechaTexto) {
      return "";
    }

    const [dia, mes, anio] = fechaTexto.split("-");
    return `${anio}-${mes}-${dia}`;
  }

  function normalizarTexto(valor) {
    return valor.trim().replace(/\s+/g, " ");
  }

  function esCassetteDePrueba(cassette) {
    const descripcion = (cassette.descripcion || "").trim().toLowerCase();
    const organoTexto = (cassette.organoTexto || "").trim().toLowerCase();
    return descripcion === "prueba" || organoTexto === "prueba";
  }

  function obtenerFilaActiva() {
    return elementos.tablaCassettesBody.querySelector(".tabla-app__fila--activa");
  }

  function obtenerDatosDeFila(fila) {
    return {
      fechaTexto: fila.dataset.fechaTexto,
      descripcion: fila.dataset.descripcion,
      organoTexto: fila.dataset.organoTexto,
      caracteristicas: fila.dataset.caracteristicas,
      observaciones: fila.dataset.observaciones,
    };
  }

  function obtenerValorOrdenable(fila, campo) {
    if (campo === "fecha") {
      const [dia, mes, anio] = fila.dataset.fechaTexto.split("-");
      return new Date(`${anio}-${mes}-${dia}`).getTime();
    }

    if (campo === "descripcion") {
      return fila.dataset.descripcion.toLowerCase();
    }

    return fila.dataset.organoTexto.toLowerCase();
  }

  function limpiarDetalle() {
    const filaActiva = obtenerFilaActiva();
    if (filaActiva) {
      filaActiva.classList.remove("tabla-app__fila--activa");
    }

    elementos.detalleDescripcion.textContent = detalleVacio.descripcion;
    elementos.detalleOrgano.textContent = detalleVacio.organoTexto;
    elementos.detalleFecha.textContent = detalleVacio.fechaTexto;
    elementos.detalleCaracteristicas.textContent = detalleVacio.caracteristicas;
    elementos.detalleObservaciones.textContent = detalleVacio.observaciones;
  }

  function seleccionarCassette(fila) {
    elementos.tablaCassettesBody.querySelectorAll("tr").forEach((item) => {
      item.classList.remove("tabla-app__fila--activa");
    });

    fila.classList.add("tabla-app__fila--activa");
    elementos.detalleDescripcion.textContent = fila.dataset.descripcion;
    elementos.detalleOrgano.textContent = fila.dataset.organoTexto;
    elementos.detalleFecha.textContent = fila.dataset.fechaTexto;
    elementos.detalleCaracteristicas.textContent = fila.dataset.caracteristicas;
    elementos.detalleObservaciones.textContent = fila.dataset.observaciones;
  }

  function actualizarEstadoOrden() {
    elementos.botonesOrden.forEach((boton) => {
      const activo = boton.dataset.orden === estado.orden.campo;
      boton.setAttribute("aria-pressed", activo ? "true" : "false");
      boton.dataset.direccion = activo ? estado.orden.direccion : "";
    });
  }

  function aplicarOrden() {
    if (!estado.orden.campo) {
      return;
    }

    const filas = Array.from(elementos.tablaCassettesBody.querySelectorAll("tr"));
    const { campo, direccion } = estado.orden;

    filas.sort((filaA, filaB) => {
      const valorA = obtenerValorOrdenable(filaA, campo);
      const valorB = obtenerValorOrdenable(filaB, campo);

      if (valorA < valorB) {
        return direccion === "asc" ? -1 : 1;
      }

      if (valorA > valorB) {
        return direccion === "asc" ? 1 : -1;
      }

      return 0;
    });

    filas.forEach((fila) => elementos.tablaCassettesBody.appendChild(fila));
    actualizarEstadoOrden();
  }

  function ordenarPor(campo) {
    const nuevaDireccion =
      estado.orden.campo === campo && estado.orden.direccion === "asc"
        ? "desc"
        : "asc";

    estado.orden = { campo, direccion: nuevaDireccion };
    aplicarOrden();
  }

  function guardarCassettes() {
    const cassettes = Array.from(elementos.tablaCassettesBody.querySelectorAll("tr")).map(
      obtenerDatosDeFila
    );

    window.localStorage.setItem(CLAVE_STORAGE_CASSETTES, JSON.stringify(cassettes));
  }

  function crearFilaCassette(datosCassette) {
    const fila = document.createElement("tr");
    fila.dataset.descripcion = datosCassette.descripcion;
    fila.dataset.organoTexto = datosCassette.organoTexto;
    fila.dataset.fechaTexto = datosCassette.fechaTexto;
    fila.dataset.caracteristicas = datosCassette.caracteristicas;
    fila.dataset.observaciones = datosCassette.observaciones;

    const celdaFecha = document.createElement("td");
    celdaFecha.textContent = datosCassette.fechaTexto;

    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = datosCassette.descripcion;

    const celdaOrgano = document.createElement("td");
    celdaOrgano.textContent = datosCassette.organoTexto;

    const celdaAccion = document.createElement("td");
    const botonDetalle = document.createElement("button");
    botonDetalle.className = "btn-tabla";
    botonDetalle.type = "button";
    botonDetalle.setAttribute("aria-label", "Ver cassette");

    const iconoDetalle = document.createElement("i");
    iconoDetalle.className = "fas fa-file-alt";
    botonDetalle.appendChild(iconoDetalle);
    celdaAccion.appendChild(botonDetalle);

    botonDetalle.addEventListener("click", (evento) => {
      evento.stopPropagation();
      seleccionarCassette(fila);
    });

    fila.append(celdaFecha, celdaDescripcion, celdaOrgano, celdaAccion);
    return fila;
  }

  function cargarCassettesGuardados() {
    const guardados = window.localStorage.getItem(CLAVE_STORAGE_CASSETTES);
    if (!guardados) {
      return false;
    }

    try {
      const cassettesGuardados = JSON.parse(guardados);
      if (!Array.isArray(cassettesGuardados)) {
        return false;
      }

      const cassettes = cassettesGuardados.filter(
        (cassette) => !esCassetteDePrueba(cassette)
      );

      elementos.tablaCassettesBody.innerHTML = "";
      cassettes.forEach((cassette) => {
        elementos.tablaCassettesBody.appendChild(crearFilaCassette(cassette));
      });

      if (cassettes.length !== cassettesGuardados.length) {
        window.localStorage.setItem(CLAVE_STORAGE_CASSETTES, JSON.stringify(cassettes));
      }

      limpiarDetalle();
      return true;
    } catch (error) {
      window.localStorage.removeItem(CLAVE_STORAGE_CASSETTES);
      return false;
    }
  }

  function prepararAperturaDialogo() {
    if (estado.temporizadorDialogo) {
      clearTimeout(estado.temporizadorDialogo);
    }

    elementos.modalCassette.classList.add("modal-cassette--awaiting-dialog");
  }

  function mostrarDialogoTrasVelo() {
    if (estado.temporizadorDialogo) {
      clearTimeout(estado.temporizadorDialogo);
    }

    estado.temporizadorDialogo = setTimeout(() => {
      elementos.modalCassette.classList.remove("modal-cassette--awaiting-dialog");
      estado.temporizadorDialogo = null;
    }, 380);
  }

  function activarCierreInstantaneo() {
    elementos.modalCassette.classList.add("modal-cassette--closing");
    document.body.classList.add("modal-cassette-force-close");
  }

  function limpiarCierreInstantaneo() {
    elementos.modalCassette.classList.remove("modal-cassette--closing");
    elementos.modalCassette.classList.remove("modal-cassette--awaiting-dialog");

    if (estado.temporizadorDialogo) {
      clearTimeout(estado.temporizadorDialogo);
      estado.temporizadorDialogo = null;
    }

    document.body.classList.remove("modal-cassette-force-close");
  }

  function restablecerFormulario() {
    elementos.formularioCassette.reset();
    elementos.formularioCassette.classList.remove("was-validated");
    elementos.mensajeErrorCassette.classList.add("d-none");
    estado.modoFormulario = "crear";
    estado.cassetteEnEdicion = null;
    elementos.modalNuevoCassetteLabel.textContent = "Nuevo cassette";
    elementos.botonGuardarCassette.textContent = "Crear Cassette";
  }

  function abrirModalCrearCassette() {
    restablecerFormulario();
    modales.cassette.show();
  }

  function abrirModalEditarCassette() {
    const filaActiva = obtenerFilaActiva();
    if (!filaActiva) {
      return;
    }

    estado.modoFormulario = "editar";
    estado.cassetteEnEdicion = filaActiva;
    elementos.modalNuevoCassetteLabel.textContent = "Editar cassette";
    elementos.botonGuardarCassette.textContent = "Guardar cambios";
    elementos.descripcionCorta.value = filaActiva.dataset.descripcion;
    elementos.fechaCassette.value = formatearFechaParaInput(filaActiva.dataset.fechaTexto);
    elementos.caracteristicasCassette.value = filaActiva.dataset.caracteristicas;
    elementos.observacionesCassette.value = filaActiva.dataset.observaciones;

    const opcionOrgano = Array.from(elementos.organoCassette.options).find(
      (opcion) => opcion.textContent.trim() === filaActiva.dataset.organoTexto
    );
    elementos.organoCassette.value = opcionOrgano ? opcionOrgano.value : "";

    elementos.formularioCassette.classList.remove("was-validated");
    elementos.mensajeErrorCassette.classList.add("d-none");
    modales.cassette.show();
  }

  function abrirModalEliminarCassette() {
    const filaActiva = obtenerFilaActiva();
    if (!filaActiva) {
      return;
    }

    estado.cassettePendienteEliminar = filaActiva;
    elementos.textoEliminarCassette.textContent = `¿Quieres eliminar el cassette "${filaActiva.dataset.descripcion}"?`;
    modales.eliminar.show();
  }

  function eliminarCassetteSeleccionado() {
    if (!estado.cassettePendienteEliminar) {
      return;
    }

    estado.cassettePendienteEliminar.remove();
    estado.cassettePendienteEliminar = null;
    guardarCassettes();
    modales.eliminar.hide();
    limpiarDetalle();
  }

  function recogerDatosFormulario() {
    const descripcion = normalizarTexto(elementos.descripcionCorta.value);
    const fecha = elementos.fechaCassette.value;
    const organo = elementos.organoCassette.value;
    const organoTexto =
      elementos.organoCassette.options[elementos.organoCassette.selectedIndex]
        ?.textContent || "";
    const caracteristicas = normalizarTexto(elementos.caracteristicasCassette.value);
    const observaciones = normalizarTexto(elementos.observacionesCassette.value);

    return {
      descripcion,
      fecha,
      organo,
      organoTexto,
      caracteristicas,
      observaciones,
    };
  }

  function formularioCompleto(datos) {
    return (
      datos.descripcion &&
      datos.fecha &&
      datos.organo &&
      datos.caracteristicas &&
      datos.observaciones
    );
  }

  function guardarCassette(evento) {
    evento.preventDefault();
    elementos.formularioCassette.classList.add("was-validated");

    const datosFormulario = recogerDatosFormulario();
    if (!formularioCompleto(datosFormulario)) {
      elementos.mensajeErrorCassette.classList.remove("d-none");
      return;
    }

    elementos.mensajeErrorCassette.classList.add("d-none");

    const cassette = {
      descripcion: datosFormulario.descripcion,
      fechaTexto: formatearFecha(datosFormulario.fecha),
      organoTexto: datosFormulario.organoTexto,
      caracteristicas: datosFormulario.caracteristicas,
      observaciones: datosFormulario.observaciones,
    };

    if (estado.modoFormulario === "editar" && estado.cassetteEnEdicion) {
      const fila = estado.cassetteEnEdicion;
      fila.dataset.descripcion = cassette.descripcion;
      fila.dataset.organoTexto = cassette.organoTexto;
      fila.dataset.fechaTexto = cassette.fechaTexto;
      fila.dataset.caracteristicas = cassette.caracteristicas;
      fila.dataset.observaciones = cassette.observaciones;

      const celdas = fila.querySelectorAll("td");
      celdas[0].textContent = cassette.fechaTexto;
      celdas[1].textContent = cassette.descripcion;
      celdas[2].textContent = cassette.organoTexto;

      seleccionarCassette(fila);
    } else {
      elementos.tablaCassettesBody.prepend(crearFilaCassette(cassette));
    }

    guardarCassettes();
    aplicarOrden();
    activarCierreInstantaneo();
    modales.cassette.hide();
  }

  function enlazarEventos() {
    elementos.formularioCassette.addEventListener("submit", guardarCassette);

    elementos.modalCassette.addEventListener("hide.bs.modal", activarCierreInstantaneo);
    elementos.modalCassette.addEventListener("show.bs.modal", () => {
      limpiarCierreInstantaneo();
      prepararAperturaDialogo();
    });
    elementos.modalCassette.addEventListener("shown.bs.modal", mostrarDialogoTrasVelo);
    elementos.modalCassette.addEventListener("hidden.bs.modal", () => {
      if (estado.modoFormulario === "crear") {
        elementos.formularioCassette.reset();
      }

      restablecerFormulario();
      limpiarCierreInstantaneo();
    });

    elementos.modalEliminarCassette.addEventListener("hidden.bs.modal", () => {
      estado.cassettePendienteEliminar = null;
    });

    elementos.botonesOrden.forEach((boton) => {
      boton.addEventListener("click", () => ordenarPor(boton.dataset.orden));
    });

    elementos.botonNuevoCassette.addEventListener("click", abrirModalCrearCassette);
    elementos.botonEditarCassette.addEventListener("click", abrirModalEditarCassette);
    elementos.botonEliminarCassette.addEventListener("click", abrirModalEliminarCassette);
    elementos.botonConfirmarEliminarCassette.addEventListener(
      "click",
      eliminarCassetteSeleccionado
    );
  }

  function iniciar() {
    if (!cargarCassettesGuardados()) {
      limpiarDetalle();
      guardarCassettes();
    }

    enlazarEventos();
    actualizarEstadoOrden();
  }

  iniciar();
})();
