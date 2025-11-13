document.addEventListener("DOMContentLoaded", () => {
  // alert(
  //   "¡Hola! 🌸 Toda la información que verás está respaldada por fuentes confiables.\nHaz clic en las citas para descubrirlas.\nInformarnos y compartir es la mejor forma de ayudar, porque nadie está libre."
  // );
  /* TABLERO */
  const piezas = document.querySelectorAll(".pieza");
  const tablero = document.querySelector(".tablero");

  // Función para verificar si dos divs se superponen
  function estanSuperpuestos(div1, div2) {
    const r1 = div1.getBoundingClientRect();
    const r2 = div2.getBoundingClientRect();
    return !(
      r1.right < r2.left ||
      r1.left > r2.right ||
      r1.bottom < r2.top ||
      r1.top > r2.bottom
    );
  }

  function fusionar(p1, p2) {
    const h3 = p1.querySelector("h3") || p2.querySelector("h3");
    const p = p1.querySelector("p") || p2.querySelector("p");

    // Evita fallar si algo no se encontró
    if (!h3 || !p) return;

    const fusion = document.createElement("div");
    fusion.classList.add("pieza", "fusionada");
    fusion.innerHTML = `
    <h3>${h3.textContent}</h3>
    <p>${p.textContent}</p>
    <button class="desglosar">🧩 Desglosar</button>
  `;

    fusion.style.left = (p1.offsetLeft + p2.offsetLeft) / 2 + "px";
    fusion.style.top = (p1.offsetTop + p2.offsetTop) / 2 + "px";
    tablero.appendChild(fusion);
    p1.remove();
    p2.remove();

    fusion.querySelector(".desglosar").addEventListener("click", () => {
      desglosar(fusion, p1, p2);
    });
  }

  // Desglosar: volver a separar las piezas
  function desglosar(fusion, p1, p2) {
    tablero.removeChild(fusion);
    tablero.appendChild(p1);
    tablero.appendChild(p2);
    p1.style.left = fusion.offsetLeft + "px";
    p1.style.top = fusion.offsetTop + "px";
    p2.style.left = fusion.offsetLeft + 40 + "px";
    p2.style.top = fusion.offsetTop + 40 + "px";
  }

  // Movimiento solo en escritorio
  if (!/Mobi|Android/i.test(navigator.userAgent)) {
    piezas.forEach((pieza) => {
      let offsetX, offsetY;

      pieza.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - pieza.offsetLeft;
        offsetY = e.clientY - pieza.offsetTop;
        pieza.style.zIndex = "1000";
        pieza.style.transition = "none";

        function mover(e) {
          const x = e.clientX - offsetX;
          const y = e.clientY - offsetY;
          const maxX = tablero.offsetWidth - pieza.offsetWidth;
          const maxY = tablero.offsetHeight - pieza.offsetHeight;
          pieza.style.left = Math.min(Math.max(0, x), maxX) + "px";
          pieza.style.top = Math.min(Math.max(0, y), maxY) + "px";
        }

        document.addEventListener("mousemove", mover);

        document.addEventListener(
          "mouseup",
          () => {
            pieza.style.zIndex = "1";
            pieza.style.transition = "transform 0.2s";
            document.removeEventListener("mousemove", mover);

            // Al soltar, verificamos si coincide con su pareja
            const pareja = pieza.dataset.pareja;
            piezas.forEach((otra) => {
              if (
                otra !== pieza &&
                otra.dataset.pareja === pareja &&
                estanSuperpuestos(pieza, otra)
              ) {
                fusionar(pieza, otra);
              }
            });
          },
          { once: true }
        );
      });
    });
  }

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
    const left = rect.left + window.scrollX;
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
    const left = rect.left + window.scrollX;
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
    const left = rect.left + window.scrollX;
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
    const left = rect.left + window.scrollX;
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
    const left = rect.left + window.scrollX;
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
    const left = rect.left + window.scrollX;
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
    const left = rect.left + window.scrollX;
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
