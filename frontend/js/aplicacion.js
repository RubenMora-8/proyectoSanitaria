(function () {
  const CLAVE_STORAGE_CASSETTES = "sanitaria.cassettes";

  const elementos = {
    modalCassette: document.getElementById("modalNuevoCassette"),
    modalEliminarCassette: document.getElementById("modalEliminarCassette"),
    formularioCassette: document.getElementById("formNuevoCassette"),
    tablaCassettesBody: document.getElementById("tablaCassettesBody"),
    tablaMuestrasBody: document.getElementById("tablaMuestrasBody"),
    mensajeErrorCassette: document.getElementById("mensajeErrorCassette"),
    mensajeMuestra: document.getElementById("mensajeMuestra"),
    detalleDescripcion: document.getElementById("detalleDescripcion"),
    detalleOrgano: document.getElementById("detalleOrgano"),
    detalleFecha: document.getElementById("detalleFecha"),
    detalleCaracteristicas: document.getElementById("detalleCaracteristicas"),
    detalleObservaciones: document.getElementById("detalleObservaciones"),
    botonNuevoCassette: document.getElementById("botonNuevoCassette"),
    botonEditarCassette: document.getElementById("botonEditarCassette"),
    botonEliminarCassette: document.getElementById("botonEliminarCassette"),
    botonConfirmarEliminarCassette: document.getElementById("confirmarEliminarCassette"),
    botonCrearMuestra: document.getElementById("botonCrearMuestra"),
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

  if (!elementos.modalCassette || !elementos.formularioCassette) return;

  const modalCassette = new bootstrap.Modal(elementos.modalCassette);
  const modalEliminarCassette = new bootstrap.Modal(elementos.modalEliminarCassette);
  const detalleVacio = {
    descripcion: elementos.detalleDescripcion.textContent.trim(),
    organoTexto: elementos.detalleOrgano.textContent.trim(),
    fechaTexto: elementos.detalleFecha.textContent.trim(),
    caracteristicas: elementos.detalleCaracteristicas.textContent.trim(),
    observaciones: elementos.detalleObservaciones.textContent.trim(),
  };
  const estado = {
    campoOrden: null,
    direccionOrden: "asc",
    modoFormulario: "crear",
    cassetteEnEdicion: null,
    cassettePendienteEliminar: null,
    temporizadorDialogo: null,
    temporizadorMensajeMuestra: null,
  };

  function formatearFecha(fechaISO) {
    const [anio, mes, dia] = fechaISO.split("-");
    return `${dia}-${mes}-${anio}`;
  }

  function formatearFechaParaInput(fechaTexto) {
    if (!fechaTexto) return "";
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
      descripcion: fila.dataset.descripcion,
      fechaTexto: fila.dataset.fechaTexto,
      organoTexto: fila.dataset.organoTexto,
      caracteristicas: fila.dataset.caracteristicas,
      observaciones: fila.dataset.observaciones,
    };
  }

  function obtenerClaveCassette(datosCassette) {
    return [datosCassette.fechaTexto, datosCassette.descripcion, datosCassette.organoTexto, datosCassette.caracteristicas, datosCassette.observaciones].join("||");
  }

  function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
  }

  function ocultarMensajeMuestra() {
    if (estado.temporizadorMensajeMuestra) {
      clearTimeout(estado.temporizadorMensajeMuestra);
      estado.temporizadorMensajeMuestra = null;
    }
    elementos.mensajeMuestra.classList.add("d-none");
  }

  function mostrarMensajeMuestra(texto) {
    if (estado.temporizadorMensajeMuestra) clearTimeout(estado.temporizadorMensajeMuestra);
    elementos.mensajeMuestra.textContent = texto;
    elementos.mensajeMuestra.classList.remove("d-none");
    estado.temporizadorMensajeMuestra = setTimeout(() => {
      elementos.mensajeMuestra.classList.add("d-none");
      estado.temporizadorMensajeMuestra = null;
    }, 2000);
  }

  function limpiarDetalle() {
    elementos.tablaCassettesBody.querySelectorAll("tr").forEach((fila) => fila.classList.remove("tabla-app__fila--activa"));
    elementos.detalleDescripcion.textContent = detalleVacio.descripcion;
    elementos.detalleOrgano.textContent = detalleVacio.organoTexto;
    elementos.detalleFecha.textContent = detalleVacio.fechaTexto;
    elementos.detalleCaracteristicas.textContent = detalleVacio.caracteristicas;
    elementos.detalleObservaciones.textContent = detalleVacio.observaciones;
    ocultarMensajeMuestra();
  }

  function actualizarDetalle(datosCassette) {
    elementos.detalleDescripcion.textContent = datosCassette.descripcion;
    elementos.detalleOrgano.textContent = datosCassette.organoTexto;
    elementos.detalleFecha.textContent = datosCassette.fechaTexto;
    elementos.detalleCaracteristicas.textContent = datosCassette.caracteristicas;
    elementos.detalleObservaciones.textContent = datosCassette.observaciones;
  }

  function crearFilaMuestra(datosCassette) {
    const fila = document.createElement("tr");
    fila.className = "tabla-app__fila--muestra";
    fila.dataset.claveMuestra = obtenerClaveCassette(datosCassette);
    fila.append(
      crearCelda(datosCassette.fechaTexto),
      crearCelda(datosCassette.descripcion),
      crearCelda(datosCassette.organoTexto)
    );
    return fila;
  }

  function buscarMuestra(claveCassette) {
    return Array.from(elementos.tablaMuestrasBody.querySelectorAll("tr")).find(
      (fila) => fila.dataset.claveMuestra === claveCassette
    ) || null;
  }

  function pasarCassetteAMuestra(datosCassette) {
    const filaMuestra = buscarMuestra(obtenerClaveCassette(datosCassette));
    if (filaMuestra) {
      const celdas = filaMuestra.querySelectorAll("td");
      celdas[0].textContent = datosCassette.fechaTexto;
      celdas[1].textContent = datosCassette.descripcion;
      celdas[2].textContent = datosCassette.organoTexto;
      return;
    }
    elementos.tablaMuestrasBody.prepend(crearFilaMuestra(datosCassette));
  }

  function seleccionarCassette(fila) {
    const datosCassette = obtenerDatosDeFila(fila);
    elementos.tablaCassettesBody.querySelectorAll("tr").forEach((item) => item.classList.remove("tabla-app__fila--activa"));
    fila.classList.add("tabla-app__fila--activa");
    actualizarDetalle(datosCassette);
    pasarCassetteAMuestra(datosCassette);
    ocultarMensajeMuestra();
  }

  function obtenerValorOrdenable(fila, campo) {
    if (campo === "fecha") {
      const [dia, mes, anio] = fila.dataset.fechaTexto.split("-");
      return new Date(`${anio}-${mes}-${dia}`).getTime();
    }
    if (campo === "descripcion") return fila.dataset.descripcion.toLowerCase();
    return fila.dataset.organoTexto.toLowerCase();
  }

  function actualizarEstadoOrden() {
    elementos.botonesOrden.forEach((boton) => {
      const activo = boton.dataset.orden === estado.campoOrden;
      boton.setAttribute("aria-pressed", activo ? "true" : "false");
      boton.dataset.direccion = activo ? estado.direccionOrden : "";
    });
  }

  function aplicarOrden() {
    if (!estado.campoOrden) return;
    const filas = Array.from(elementos.tablaCassettesBody.querySelectorAll("tr"));
    filas.sort((filaA, filaB) => {
      const valorA = obtenerValorOrdenable(filaA, estado.campoOrden);
      const valorB = obtenerValorOrdenable(filaB, estado.campoOrden);
      if (valorA < valorB) return estado.direccionOrden === "asc" ? -1 : 1;
      if (valorA > valorB) return estado.direccionOrden === "asc" ? 1 : -1;
      return 0;
    });
    filas.forEach((fila) => elementos.tablaCassettesBody.appendChild(fila));
    actualizarEstadoOrden();
  }

  function ordenarPor(campo) {
    estado.direccionOrden = estado.campoOrden === campo && estado.direccionOrden === "asc" ? "desc" : "asc";
    estado.campoOrden = campo;
    aplicarOrden();
  }

  function guardarCassettes() {
    const cassettes = Array.from(elementos.tablaCassettesBody.querySelectorAll("tr")).map(obtenerDatosDeFila);
    localStorage.setItem(CLAVE_STORAGE_CASSETTES, JSON.stringify(cassettes));
  }

  function crearFilaCassette(datosCassette) {
    const fila = document.createElement("tr");
    fila.dataset.descripcion = datosCassette.descripcion;
    fila.dataset.fechaTexto = datosCassette.fechaTexto;
    fila.dataset.organoTexto = datosCassette.organoTexto;
    fila.dataset.caracteristicas = datosCassette.caracteristicas;
    fila.dataset.observaciones = datosCassette.observaciones;
    fila.append(
      crearCelda(datosCassette.fechaTexto),
      crearCelda(datosCassette.descripcion),
      crearCelda(datosCassette.organoTexto),
      document.createElement("td")
    );

    const botonDetalle = document.createElement("button");
    botonDetalle.className = "btn-tabla";
    botonDetalle.type = "button";
    botonDetalle.setAttribute("aria-label", "Ver cassette");
    botonDetalle.innerHTML = '<i class="fas fa-file-alt"></i>';
    fila.lastChild.appendChild(botonDetalle);
    botonDetalle.addEventListener("click", function (evento) {
      evento.stopPropagation();
      seleccionarCassette(fila);
    });
    return fila;
  }

  function cargarCassettesGuardados() {
    const guardados = localStorage.getItem(CLAVE_STORAGE_CASSETTES);
    if (!guardados) return false;
    try {
      const cassettesGuardados = JSON.parse(guardados);
      if (!Array.isArray(cassettesGuardados)) return false;

      const cassettes = cassettesGuardados.filter((cassette) => !esCassetteDePrueba(cassette));
      elementos.tablaCassettesBody.innerHTML = "";
      cassettes.forEach((cassette) => elementos.tablaCassettesBody.appendChild(crearFilaCassette(cassette)));
      if (cassettes.length !== cassettesGuardados.length) {
        localStorage.setItem(CLAVE_STORAGE_CASSETTES, JSON.stringify(cassettes));
      }
      limpiarDetalle();
      return true;
    } catch (error) {
      localStorage.removeItem(CLAVE_STORAGE_CASSETTES);
      return false;
    }
  }

  function prepararAperturaDialogo() {
    if (estado.temporizadorDialogo) clearTimeout(estado.temporizadorDialogo);
    elementos.modalCassette.classList.add("modal-cassette--awaiting-dialog");
  }

  function mostrarDialogoTrasVelo() {
    if (estado.temporizadorDialogo) clearTimeout(estado.temporizadorDialogo);
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
    elementos.modalCassette.classList.remove("modal-cassette--closing", "modal-cassette--awaiting-dialog");
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
    modalCassette.show();
  }

  function abrirModalEditarCassette() {
    const filaActiva = obtenerFilaActiva();
    if (!filaActiva) return;

    estado.modoFormulario = "editar";
    estado.cassetteEnEdicion = filaActiva;
    elementos.modalNuevoCassetteLabel.textContent = "Editar cassette";
    elementos.botonGuardarCassette.textContent = "Guardar cambios";
    elementos.descripcionCorta.value = filaActiva.dataset.descripcion;
    elementos.fechaCassette.value = formatearFechaParaInput(filaActiva.dataset.fechaTexto);
    elementos.caracteristicasCassette.value = filaActiva.dataset.caracteristicas;
    elementos.observacionesCassette.value = filaActiva.dataset.observaciones;
    for (const opcion of elementos.organoCassette.options) {
      if (opcion.textContent.trim() === filaActiva.dataset.organoTexto) elementos.organoCassette.value = opcion.value;
    }
    elementos.formularioCassette.classList.remove("was-validated");
    elementos.mensajeErrorCassette.classList.add("d-none");
    modalCassette.show();
  }

  function abrirModalEliminarCassette() {
    const filaActiva = obtenerFilaActiva();
    if (!filaActiva) return;
    estado.cassettePendienteEliminar = filaActiva;
    elementos.textoEliminarCassette.textContent = `¿Quieres eliminar el cassette "${filaActiva.dataset.descripcion}"?`;
    modalEliminarCassette.show();
  }

  function eliminarCassetteSeleccionado() {
    if (!estado.cassettePendienteEliminar) return;
    const muestraAsociada = buscarMuestra(obtenerClaveCassette(obtenerDatosDeFila(estado.cassettePendienteEliminar)));
    if (muestraAsociada) muestraAsociada.remove();
    estado.cassettePendienteEliminar.remove();
    estado.cassettePendienteEliminar = null;
    // guardarCassettes();
    modalEliminarCassette.hide();
    limpiarDetalle();
  }

  function crearMuestraDesdeSeleccion() {
    const filaActiva = obtenerFilaActiva();
    if (!filaActiva) return mostrarMensajeMuestra("No tiene ningún cassette seleccionado");
    pasarCassetteAMuestra(obtenerDatosDeFila(filaActiva));
    ocultarMensajeMuestra();
  }

  function recogerDatosFormulario() {
    return {
      descripcion: normalizarTexto(elementos.descripcionCorta.value),
      fecha: elementos.fechaCassette.value,
      organo: elementos.organoCassette.value,
      organoTexto: elementos.organoCassette.options[elementos.organoCassette.selectedIndex]?.textContent || "",
      caracteristicas: normalizarTexto(elementos.caracteristicasCassette.value),
      observaciones: normalizarTexto(elementos.observacionesCassette.value),
    };
  }

  function formularioCompleto(datos) {
    return datos.descripcion && datos.fecha && datos.organo && datos.caracteristicas && datos.observaciones;
  }

  function guardarCassette(evento) {
    evento.preventDefault();
    elementos.formularioCassette.classList.add("was-validated");
    const datosFormulario = recogerDatosFormulario();
    if (!formularioCompleto(datosFormulario)) return elementos.mensajeErrorCassette.classList.remove("d-none");

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
      fila.dataset.fechaTexto = cassette.fechaTexto;
      fila.dataset.organoTexto = cassette.organoTexto;
      fila.dataset.caracteristicas = cassette.caracteristicas;
      fila.dataset.observaciones = cassette.observaciones;
      const celdas = fila.querySelectorAll("td");
      celdas[0].textContent = cassette.fechaTexto;
      celdas[1].textContent = cassette.descripcion;
      celdas[2].textContent = cassette.organoTexto;
      seleccionarCassette(fila);
    } else {
      // elementos.tablaCassettesBody.prepend(crearFilaCassette(cassette));
    }

    // guardarCassettes();
    // aplicarOrden();
    activarCierreInstantaneo();
    modalCassette.hide();
  }

  function enlazarEventos() {
    elementos.formularioCassette.addEventListener("submit", guardarCassette);
    elementos.modalCassette.addEventListener("hide.bs.modal", activarCierreInstantaneo);
    elementos.modalCassette.addEventListener("show.bs.modal", function () {
      limpiarCierreInstantaneo();
      prepararAperturaDialogo();
    });
    elementos.modalCassette.addEventListener("shown.bs.modal", mostrarDialogoTrasVelo);
    elementos.modalCassette.addEventListener("hidden.bs.modal", function () {
      if (estado.modoFormulario === "crear") elementos.formularioCassette.reset();
      restablecerFormulario();
      limpiarCierreInstantaneo();
    });
    elementos.modalEliminarCassette.addEventListener("hidden.bs.modal", function () {
      estado.cassettePendienteEliminar = null;
    });
    elementos.botonesOrden.forEach((boton) => boton.addEventListener("click", function () {
      ordenarPor(boton.dataset.orden);
    }));
    elementos.botonNuevoCassette.addEventListener("click", abrirModalCrearCassette);
    elementos.botonEditarCassette.addEventListener("click", abrirModalEditarCassette);
    // elementos.botonEliminarCassette.addEventListener("click", abrirModalEliminarCassette);
    // elementos.botonConfirmarEliminarCassette.addEventListener("click", eliminarCassetteSeleccionado);
    // elementos.botonCrearMuestra.addEventListener("click", crearMuestraDesdeSeleccion);
  }

  function iniciar() {
    if (!cargarCassettesGuardados()) {
      limpiarDetalle();
      // guardarCassettes();
    }
    enlazarEventos();
    actualizarEstadoOrden();
  }

  iniciar();
})();

// ----------------------------------------------------------------------

const formularioCassette = document.getElementById("formNuevoCassette");
const formNuevaMuestra = document.getElementById("formNuevaMuestra");
const tablaCassettesBody = document.getElementById("tablaCassettesBody");
const tablaMuestrasBody = document.getElementById("tablaMuestrasBody");
const detalleDescripcion = document.getElementById("detalleDescripcion");
const detalleOrgano = document.getElementById("detalleOrgano");
const detalleFecha = document.getElementById("detalleFecha");
const detalleCaracteristicas = document.getElementById("detalleCaracteristicas");
const detalleObservaciones = document.getElementById("detalleObservaciones");
const botonCrearMuestra = document.getElementById("botonCrearMuestra");
const modalNuevaMuestra = document.getElementById("modalNuevaMuestra");
const btnCloseMuestra = document.getElementById("btnCloseMuestra");
const mensajeMuestra = document.getElementById("mensajeMuestra");
const detalleDescripcionMuestra = document.getElementById("detalleDescripcionMuestra");
const detalleOrganoMuestra = document.getElementById("detalleOrganoMuestra");
const detalleFechaMuestra = document.getElementById("detalleFechaMuestra");
const detalleCaracteristicasMuestra = document.getElementById("detalleCaracteristicasMuestra");
const btnCloseDetailsMuestra = document.getElementById("btnCloseDetailsMuestra");
const detailsMuestra = document.getElementById("detailsMuestra");
const botonEliminarCassette = document.getElementById("botonEliminarCassette");
const confirmationDeleteCasmodal = document.getElementById("confirmationDeleteCasmodal");
const confirmarEliminarCassette = document.getElementById("confirmarEliminarCassette");
const confirmationDeleteMuesmodal = document.getElementById("confirmationDeleteMuesmodal");
const botonEliminarMuestra = document.getElementById("botonEliminarMuestra");
const btncancelarDeleteCas = document.getElementById("btncancelarDeleteCas");
const confirmarDeleteMuestra = document.getElementById("confirmarDeleteMuestra");
const btncancelarDeleteMues = document.getElementById("btncancelarDeleteMues");

let arrayCassetes = [];
let arrayMuestras = [];
let casseteActivo = null;
let muestraActiva = null;

const createCassete = async (event) => {
  event.preventDefault();
  const formData = new FormData(formularioCassette);
  formData.append("id_tec", sessionStorage.getItem("id_tec"));
  formData.append("qr_cassete", "QR pendiente");
  const formJSON = Object.fromEntries(formData.entries());

  createCasseteJson(formJSON);
}

function getCookieByName(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

const createCasseteJson = async (casJson) => {
  const token = getCookieByName("tokenCookie");

  const res = await fetch("http://www.localhost:3000/api/cassetes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    },
    body: JSON.stringify(casJson)
  });
  const resJSON = await res.json();

  if (resJSON.error) {
    console.log(resJSON);
  }
  showCassetes();

}

const showCassetes = async () => {
  const token = getCookieByName("tokenCookie");
  const res = await fetch("http://www.localhost:3000/api/cassetes", {
    headers: {
      "authorization": "Bearer " + token
    }
  });
  const resJSON = await res.json();

  arrayCassetes = [...resJSON];

  cassetesTable();

}

const cassetesTable = () => {
  tablaCassettesBody.innerHTML = "";

  const fragment = document.createDocumentFragment();
  arrayCassetes.forEach(cas => {
    const fila = document.createElement("tr");

    const colTxt = document.createElement("td");
    colTxt.textContent = cas.fecha.slice(0, cas.fecha.indexOf("T"))
    fila.appendChild(colTxt);

    const colDesc = document.createElement("td");
    colDesc.textContent = cas.descripcion;
    fila.appendChild(colDesc);

    const colOrg = document.createElement("td");
    colOrg.textContent = cas.organo;
    fila.appendChild(colOrg);

    const colButton = document.createElement("td");
    const btn = document.createElement("button");
    btn.value = cas.id_cas;
    btn.innerHTML = '<i class="fa-solid fa-file-circle-question"></i>';
    btn.className = "btn_details";
    colButton.appendChild(btn);

    fila.appendChild(colButton);
    fragment.appendChild(fila);
  });

  tablaCassettesBody.appendChild(fragment);

}

const casseteDetails = (event) => {
  if (event.target.tagName === "I") {
    casseteActivo = arrayCassetes.find(cas => cas.id_cas == event.target.parentElement.value);
    detalleDescripcion.textContent = casseteActivo.descripcion;
    detalleOrgano.textContent = casseteActivo.organo;
    detalleFecha.textContent = casseteActivo.fecha.slice(0, casseteActivo.fecha.indexOf("T"));
    detalleCaracteristicas.textContent = casseteActivo.caracteristicas;
    detalleObservaciones.textContent = casseteActivo.observaciones;
    showMuestras();
  }
}

const showModalMuestra = () => {
  if (casseteActivo == null) {
    mensajeMuestra.classList.remove("d-none");
    return null;
  }
  mensajeMuestra.classList.add("d-none");
  modalNuevaMuestra.classList.remove("hidden");
}

const closeModalMuestra = () => {
  modalNuevaMuestra.classList.add("hidden");
}


const showDetailsMuestra = () => {
  console.log(muestraActiva);
  detailsMuestra.classList.remove("hidden");
}

const closeMuestraDetails = () => {
  detailsMuestra.classList.add("hidden");
}


const createMuestra = async () => {
  event.preventDefault();
  const formData = new FormData(formNuevaMuestra);
  formData.append("qr_muestra", "QR pendiente");
  formData.append("id_cas", casseteActivo.id_cas);
  const formJSON = Object.fromEntries(formData.entries());

  createMuestraJson(formJSON);
}

const createMuestraJson = async (muestraJson) => {
  const token = getCookieByName("tokenCookie");
  const res = await fetch("http://www.localhost:3000/api/muestras", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    },
    body: JSON.stringify(muestraJson)
  });
  const resJSON = await res.json();

  if (resJSON.error) {
    showMessage(resJSON.error);
  }
  closeModalMuestra();
  formNuevaMuestra.reset();
  showMuestras();
}

const showMuestras = async () => {
  const token = getCookieByName("tokenCookie");
  const res = await fetch("http://www.localhost:3000/api/muestras/" + casseteActivo.id_cas, {
    headers: {
      "authorization": "Bearer " + token
    }
  });
  const resJSON = await res.json();

  arrayMuestras = [...resJSON];
  console.log(arrayMuestras);
  tableMuestras(resJSON);

}

const tableMuestras = (muestrasJson) => {
  tablaMuestrasBody.innerHTML = "";

  const fragment = document.createDocumentFragment();
  muestrasJson.forEach(mues => {
    const fila = document.createElement("tr");

    const colFch = document.createElement("td");
    colFch.textContent = mues.fecha.slice(0, mues.fecha.indexOf("T"))
    fila.appendChild(colFch);

    const colDesc = document.createElement("td");
    colDesc.textContent = mues.descripcion;
    fila.appendChild(colDesc);

    const colTin = document.createElement("td");
    colTin.textContent = mues.tincion;
    fila.appendChild(colTin);

    const colButton = document.createElement("td");
    const btn = document.createElement("button");
    btn.value = mues.id_muestra;
    btn.innerHTML = '<i class="fa-solid fa-file-circle-question"></i>';
    btn.className = "btn_details";
    colButton.appendChild(btn);

    fila.appendChild(colButton);
    fragment.appendChild(fila);
  });

  tablaMuestrasBody.appendChild(fragment);
}

const muestraDetails = () => {
  if (event.target.tagName === "I") {
    muestraActiva = arrayMuestras.find(mues => mues.id_muestra == event.target.parentElement.value);
    detalleDescripcionMuestra.textContent = muestraActiva.descripcion;
    detalleOrganoMuestra.textContent = muestraActiva.tincion;
    detalleFechaMuestra.textContent = muestraActiva.fecha.slice(0, muestraActiva.fecha.indexOf("T"));
    detalleCaracteristicasMuestra.textContent = muestraActiva.observaciones;

    showDetailsMuestra();
  }
}

// eliminación de elementos

const confirmationDeleteMues = () => {
  if (muestraActiva) {
    confirmationDeleteMuesmodal.classList.remove("d-none");
  }
}


const confirmationDeleteCas = () => {
  if (casseteActivo) {
    confirmationDeleteCasmodal.classList.remove("d-none");
  }
}

const cancelarDeleteCas = () => {
  confirmationDeleteCasmodal.classList.add("d-none");
}

const cancelarDeleteMues = () => {
  confirmationDeleteMuesmodal.classList.add("d-none");
}

const hideconfirmationDeleteCas = () => {
  confirmationDeleteCasmodal.classList.add("d-none");
}

const limpiarDetailsCassete = () => {
  detalleDescripcion.textContent = "";
  detalleOrgano.textContent = "";
  detalleFecha.textContent = "";
  detalleCaracteristicas.textContent = "";
  detalleObservaciones.textContent = "";
}

const deleteCassete = async () => {
  const token = getCookieByName("tokenCookie");
  const res = await fetch("http://www.localhost:3000/api/cassetes/" + casseteActivo.id_cas, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    }
  });
  const resJSON = await res.json();

  if (resJSON.error) {
    showMessage(resJSON.error);
  }

  showCassetes();
  showMuestras();
  hideconfirmationDeleteCas();
  limpiarDetailsCassete();
}

const deleteMues = async () => {
  const token = getCookieByName("tokenCookie");
  const res = await fetch("http://www.localhost:3000/api/muestras/" + muestraActiva.id_muestra, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    }
  });
  const resJSON = await res.json();

  if (resJSON.error) {
    showMessage(resJSON.error);
  }

  showCassetes();
  showMuestras();
  hideconfirmationDeleteCas();
  cancelarDeleteMues();
  closeMuestraDetails();
}

document.addEventListener("DOMContentLoaded", showCassetes);
formularioCassette.addEventListener("submit", createCassete);
modalNuevaMuestra.addEventListener("submit", createMuestra);
tablaCassettesBody.addEventListener("click", casseteDetails);
tablaMuestrasBody.addEventListener("click", muestraDetails);
botonCrearMuestra.addEventListener("click", showModalMuestra);
btnCloseMuestra.addEventListener("click", closeModalMuestra);
btnCloseDetailsMuestra.addEventListener("click", closeMuestraDetails);
botonEliminarCassette.addEventListener("click", confirmationDeleteCas);
confirmarEliminarCassette.addEventListener("click", deleteCassete);
confirmarDeleteMuestra.addEventListener("click", deleteMues);

botonEliminarMuestra.addEventListener("click", confirmationDeleteMues);
btncancelarDeleteCas.addEventListener("click", cancelarDeleteCas);
btncancelarDeleteMues.addEventListener("click", cancelarDeleteMues);