document.addEventListener("DOMContentLoaded", () => {
  const casa = document.querySelector("#casa");
  const navegacion = document.querySelector("#navegacion");
  casa.addEventListener("click", () => {
    const menuAbierto = casa.getAttribute("aria-expanded") === "true";
    casa.setAttribute("aria-expanded", String(!menuAbierto));
    casa.setAttribute(
      "aria-label",
      menuAbierto ? "Abrir navegación" : "Cerrar navegación",
    );
    document
      .querySelector(".contenido-navegacion")
      .classList.toggle("menu-abierto", !menuAbierto);
  });
  navegacion.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      casa.setAttribute("aria-expanded", "false");
      casa.setAttribute("aria-label", "Abrir navegación");
      document
        .querySelector(".contenido-navegacion")
        .classList.remove("menu-abierto");
    }
  });

  const paginas = document.querySelectorAll(".pagina-vista");
  const titulosPagina = {
    inicio: "Alzheimer: comprender para acompañar",
    riesgos: "Factores de riesgo | Alzheimer",
    proteccion: "Factores protectores | Alzheimer",
  };

  function mostrarPagina() {
    const paginaSolicitada = window.location.hash.slice(1);
    const paginaActiva = Array.from(paginas).find(
      (pagina) => pagina.id === paginaSolicitada,
    );
    const idActivo = paginaActiva
      ? paginaActiva.dataset.pagina
      : "inicio";

    paginas.forEach((pagina) => {
      pagina.hidden = pagina.dataset.pagina !== idActivo;
    });

    navegacion.querySelectorAll("[data-pagina]").forEach((enlace) => {
      if (enlace.dataset.pagina === idActivo) {
        enlace.setAttribute("aria-current", "page");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });

    document.title = titulosPagina[idActivo];
    if (paginaActiva) {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", mostrarPagina);
  mostrarPagina();

  /* Juego de relacionar conceptos */
  const piezas = document.querySelectorAll(".pieza[data-pareja]");
  const tablero = document.querySelector(".tablero");
  const estadoJuego = document.querySelector("#estado-juego");
  let piezaSeleccionada = null;
  let parejasEncontradas = 0;

  function fusionar(p1, p2) {
    const fusion = document.createElement("div");
    fusion.classList.add("pieza", "fusionada");
    const titulo = p1.querySelector("h3") || p2.querySelector("h3");
    const definicion = p1.querySelector("p") || p2.querySelector("p");
    const tituloFusion = document.createElement("h3");
    const definicionFusion = document.createElement("p");
    const botonDesglosar = document.createElement("button");

    tituloFusion.textContent = titulo.textContent;
    definicionFusion.textContent = definicion.textContent;
    botonDesglosar.classList.add("desglosar");
    botonDesglosar.type = "button";
    botonDesglosar.textContent = "Separar pareja";
    fusion.append(tituloFusion, definicionFusion, botonDesglosar);
    tablero.appendChild(fusion);
    p1.remove();
    p2.remove();
    parejasEncontradas += 1;
    estadoJuego.textContent =
      parejasEncontradas === 4
        ? "¡Excelente! Encontraste las cuatro parejas."
        : `¡Muy bien! Parejas encontradas: ${parejasEncontradas} de 4.`;

    botonDesglosar.addEventListener("click", () => {
      desglosar(fusion, p1, p2);
    });
  }

  function desglosar(fusion, p1, p2) {
    tablero.insertBefore(p1, fusion);
    tablero.insertBefore(p2, fusion);
    fusion.remove();
    parejasEncontradas -= 1;
    estadoJuego.textContent = `Parejas encontradas: ${parejasEncontradas} de 4.`;
  }

  piezas.forEach((pieza) => {
    pieza.setAttribute("aria-pressed", "false");
    pieza.addEventListener("click", () => {
      if (piezaSeleccionada === pieza) {
        pieza.classList.remove("seleccionada");
        pieza.setAttribute("aria-pressed", "false");
        piezaSeleccionada = null;
        estadoJuego.textContent = "Selecciona un concepto y su definición.";
        return;
      }

      if (!piezaSeleccionada) {
        piezaSeleccionada = pieza;
        pieza.classList.add("seleccionada");
        pieza.setAttribute("aria-pressed", "true");
        estadoJuego.textContent = "Ahora selecciona su definición.";
        return;
      }

      if (pieza.dataset.pareja === piezaSeleccionada.dataset.pareja) {
        piezaSeleccionada.classList.remove("seleccionada");
        piezaSeleccionada.setAttribute("aria-pressed", "false");
        pieza.classList.remove("seleccionada");
        piezaSeleccionada.setAttribute("aria-pressed", "false");
        const pareja = piezaSeleccionada;
        piezaSeleccionada = null;
        fusionar(pareja, pieza);
        return;
      }

      piezaSeleccionada.classList.remove("seleccionada");
      piezaSeleccionada.setAttribute("aria-pressed", "false");
      piezaSeleccionada = null;
      estadoJuego.textContent =
        "Esas piezas no forman una pareja. Selecciona de nuevo un concepto.";
    });
  });

  /* CITAS BIBLIOGRAFICAS */
  const body = document.querySelector("body");
  const citaUno = document.querySelector("#uno");
  const citaDos = document.querySelector("#dos");
  const citaTres = document.querySelector("#tres");
  const citaCuatro = document.querySelector("#cuatro");
  const citaCinco = document.querySelector("#cinco");
  const citaSeis = document.querySelector("#seis");
  const citaSiete = document.querySelector("#siete");

  let divUNO = null;
  let divDOS = null;
  let divTres = null;
  let divCuatro = null;
  let divCinco = null;
  let divSeis = null;
  let divSiete = null;

  citaUno.addEventListener("click", (event) => {
    // Evita crear más de una vez
    if (divUNO) return;

    // Crear el contenedor
    divUNO = document.createElement("div");
    divUNO.classList.add("UNO", "mostrar");
    divUNO.innerHTML = `
    <p>
      Alzheimer’s Disease and Dementia, “Alzheimer’s Association 2024 Alzheimer’s
      Disease Facts and Figures”, [En línea]. Disponible en:
      <a href="https://www.alz.org/media/Documents/alzheimers-facts-and-figures.pdf" 
         target="_blank" 
         style="color: blue; text-decoration: underline;">
         alz.org/media/Documents/alzheimers-facts-and-figures.pdf
      </a>
    </p>
  `;

    body.appendChild(divUNO);

    // Posicionar arriba del span de cita
    const rect = citaUno.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const left = rect.left + window.scrollX - 6;
    const top = rect.top + scrollY - divUNO.offsetHeight - 1; // arriba de la cita

    divUNO.style.left = `${left}px`;
    divUNO.style.top = `${top}px`;

    // Evitar que desaparezca si haces click dentro del cuadro
    divUNO.addEventListener("click", (e) => e.stopPropagation());
  });
  citaDos.addEventListener("click", (event) => {
    // Evita crear más de una vez
    if (divDOS) return;

    // Crear el contenedor
    divDOS = document.createElement("div");
    divDOS.classList.add("DOS", "mostrar");
    divDOS.innerHTML = `
    <p>
     I. Lefterov, N. F. Fitz, Y. Lu, y R. Koldamova, «APOEε4 and risk of Alzheimer’s disease – time to move forward», Front. Neurosci., vol. 17, p. 1195724, may 2023, ,doi: 10.3389/fnins.2023.1195724.
    </p>
  `;

    body.appendChild(divDOS);

    // Posicionar arriba del span de cita
    const rect = citaDos.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const left = rect.left + window.scrollX - 120;
    const top = rect.top + scrollY - divDOS.offsetHeight - 1; // arriba de la cita

    divDOS.style.left = `${left}px`;
    divDOS.style.top = `${top}px`;

    // Evitar que desaparezca si haces click dentro del cuadro
    divDOS.addEventListener("click", (e) => e.stopPropagation());
  });
  citaTres.addEventListener("click", (event) => {
    // Evita crear más de una vez
    if (divTres) return;

    // Crear el contenedor
    divTres = document.createElement("div");
    divTres.classList.add("TRES", "mostrar");
    divTres.innerHTML = `
    <p>
     Alzheimer’s Disease and Dementia, «Alzheimer’s Association 2024 Alzheimer’s Disease Facts and Figures», [En línea]. Disponible en:       
     <a href="https://www.alz.org/media/Documents/alzheimers-facts-and-figures.pdf" 
         target="_blank" 
         style="color: blue; text-decoration: underline;">
         alz.org/media/Documents/alzheimers-facts-and-figures.pdf
      </a>
    </p>
  `;

    body.appendChild(divTres);

    // Posicionar arriba del span de cita
    const rect = citaTres.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const left = rect.left + window.scrollX - 238;
    const top = rect.top + scrollY - divTres.offsetHeight - 1; // arriba de la cita

    divTres.style.left = `${left}px`;
    divTres.style.top = `${top}px`;

    // Evitar que desaparezca si haces click dentro del cuadro
    divTres.addEventListener("click", (e) => e.stopPropagation());
  });
  citaCuatro.addEventListener("click", (event) => {
    // Evita crear más de una vez
    if (divCuatro) return;

    // Crear el contenedor
    divCuatro = document.createElement("div");
    divCuatro.classList.add("CUATRO", "mostrar");
    divCuatro.innerHTML = `
    <p>
     G. Livingston et al., «Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission», The Lancet, vol. 404, n.o 10452, pp. 572-628, ago. 2024, doi: 10.1016/S0140-6736(24)01296-0.
    </p>
  `;

    body.appendChild(divCuatro);

    // Posicionar arriba del span de cita
    const rect = citaCuatro.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const left = rect.left + window.scrollX - 208;
    const top = rect.top + scrollY - divCuatro.offsetHeight - 1; // arriba de la cita

    divCuatro.style.left = `${left}px`;
    divCuatro.style.top = `${top}px`;

    // Evitar que desaparezca si haces click dentro del cuadro
    divCuatro.addEventListener("click", (e) => e.stopPropagation());
  });
  citaCinco.addEventListener("click", (event) => {
    // Evita crear más de una vez
    if (divCinco) return;

    // Crear el contenedor
    divCinco = document.createElement("div");
    divCinco.classList.add("CINCO", "mostrar");
    divCinco.innerHTML = `
    <p>
    L. Fratiglioni, A. Marseglia, y S. Dekhtyar, «Ageing without dementia: can stimulating psychosocial and lifestyle experiences make a difference?», Lancet Neurol., vol. 19, n.o 6, pp. 533-543, jun. 2020, doi: 10.1016/S1474-4422(20)30039-9.
    </p>
  `;

    body.appendChild(divCinco);

    // Posicionar arriba del span de cita
    const rect = citaCinco.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const left = rect.left + window.scrollX - 99;
    const top = rect.top + scrollY - divCinco.offsetHeight - 1; // arriba de la cita

    divCinco.style.left = `${left}px`;
    divCinco.style.top = `${top}px`;

    // Evitar que desaparezca si haces click dentro del cuadro
    divCinco.addEventListener("click", (e) => e.stopPropagation());
  });
  citaSeis.addEventListener("click", (event) => {
    // Evita crear más de una vez
    if (divSeis) return;

    // Crear el contenedor
    divSeis = document.createElement("div");
    divSeis.classList.add("SEIS", "mostrar");
    divSeis.innerHTML = `
    <p>
    J. R. Beard et al., «The World report on ageing and health: a policy framework for healthy ageing», The Lancet, vol. 387, n.o 10033, pp. 2145-2154, may 2016, doi: 10.1016/S0140-6736(15)00516-4.
    </p>
  `;

    body.appendChild(divSeis);

    // Posicionar arriba del span de cita
    const rect = citaSeis.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const left = rect.left + window.scrollX - 180;
    const top = rect.top + scrollY - divSeis.offsetHeight - 1; // arriba de la cita

    divSeis.style.left = `${left}px`;
    divSeis.style.top = `${top}px`;

    // Evitar que desaparezca si haces click dentro del cuadro
    divSeis.addEventListener("click", (e) => e.stopPropagation());
  });
  citaSiete.addEventListener("click", (event) => {
    // Evita crear más de una vez
    if (divSiete) return;

    // Crear el contenedor
    divSiete = document.createElement("div");
    divSiete.classList.add("SIETE", "mostrar");
    divSiete.innerHTML = `
    <p>
    Y. Liu, G. Lu, L. Liu, Y. He, y W. Gong, «Cognitive reserve over the life course and risk of dementia: a systematic review and meta-analysis», Front. Aging Neurosci., vol. 16, p. 1358992, abr. 2024, doi: 10.3389/fnagi.2024.1358992.
    </p>
  `;

    body.appendChild(divSiete);

    // Posicionar arriba del span de cita
    const rect = citaSiete.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const left = rect.left + window.scrollX - 50;
    const top = rect.top + scrollY - divSiete.offsetHeight - 1; // arriba de la cita

    divSiete.style.left = `${left}px`;
    divSiete.style.top = `${top}px`;

    // Evitar que desaparezca si haces click dentro del cuadro
    divSiete.addEventListener("click", (e) => e.stopPropagation());
  });
  // Cerrar al hacer click fuera
  document.addEventListener("click", (event) => {
    if (
      divUNO &&
      !event.target.closest(".cita") &&
      !event.target.closest(".UNO")
    ) {
      divUNO.remove();
      divUNO = null;
    }
    if (
      divDOS &&
      !event.target.closest(".cita") &&
      !event.target.closest(".DOS")
    ) {
      divDOS.remove();
      divDOS = null;
    }
    if (
      divTres &&
      !event.target.closest(".cita") &&
      !event.target.closest(".TRES")
    ) {
      divTres.remove();
      divTres = null;
    }
    if (
      divCuatro &&
      !event.target.closest(".cita") &&
      !event.target.closest(".CUATRO")
    ) {
      divCuatro.remove();
      divCuatro = null;
    }
    if (
      divCinco &&
      !event.target.closest(".cita") &&
      !event.target.closest(".CINCO")
    ) {
      divCinco.remove();
      divCinco = null;
    }
    if (
      divSeis &&
      !event.target.closest(".cita") &&
      !event.target.closest(".SEIS")
    ) {
      divSeis.remove();
      divSeis = null;
    }
    if (
      divSiete &&
      !event.target.closest(".cita") &&
      !event.target.closest(".SIETE")
    ) {
      divSiete.remove();
      divSiete = null;
    }
  });
});
