
document.addEventListener("DOMContentLoaded", () => {
  const imagenes = document.querySelectorAll(".div-img-juego img");
  const zonasDrop = document.querySelectorAll(".div-juego");
  const botonReiniciar = document.getElementById("botoncito");
  const secJuego = document.querySelector(".sec-juego");

  // Crear mensaje final
  const mensajeFinal = document.createElement("p");
  mensajeFinal.textContent = "Felicitaciones!! Puzzle resuelto";
  mensajeFinal.classList.add("mensaje-final");
  mensajeFinal.style.display = "none";
  secJuego.appendChild(mensajeFinal);

  // Guardar contenedores originales
  const contenedoresOriginales = {};
  imagenes.forEach((img, index) => {
    const id = `img-${index}`;
    img.setAttribute("data-id", id);
    contenedoresOriginales[id] = img.parentElement;
    img.setAttribute("draggable", "true");
  });

  let imagenArrastrada = null;

  imagenes.forEach(img => {
    img.addEventListener("dragstart", () => {
      imagenArrastrada = img;
    });
  });

  zonasDrop.forEach(zona => {
    zona.addEventListener("dragover", e => e.preventDefault());

    zona.addEventListener("drop", e => {
      e.preventDefault();
      if (imagenArrastrada) {
        zona.innerHTML = "";
        zona.appendChild(imagenArrastrada);
        imagenArrastrada.classList.add("moved");
        imagenArrastrada.setAttribute("draggable", "false");
        botonReiniciar.classList.remove("btn-principal");
        imagenArrastrada = null;
        setTimeout(verificarPuzzle, 100);
      }
    });
  });

  function verificarPuzzle() {
    const imagenesColocadas = Array.from(zonasDrop).map(z => z.querySelector("img"));
    const todasColocadas = imagenesColocadas.every(img => img !== null);
    if (!todasColocadas) return;

    const ordenCorrecto = ["imagenUno", "imagenDos", "imagenTres"];
    const ordenActual = imagenesColocadas.map(img => {
      if (img.classList.contains("imagenUno")) return "imagenUno";
      if (img.classList.contains("imagenDos")) return "imagenDos";
      if (img.classList.contains("imagenTres")) return "imagenTres";
      return "";
    });

    if (JSON.stringify(ordenActual) === JSON.stringify(ordenCorrecto)) {
      mostrarImagenesFinales(imagenesColocadas);
    }
  }

  function mostrarImagenesFinales(imagenesColocadas) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("imagenes-finales");

    imagenesColocadas.forEach(img => {
      const clon = img.cloneNode(true);
      clon.classList.add("zoomear");
      contenedor.appendChild(clon);
    });

    secJuego.insertBefore(contenedor, botonReiniciar);

    // Ocultar todo menos el botón y mostrar mensaje
    setTimeout(() => {
      Array.from(secJuego.children).forEach(el => {
        if (el !== botonReiniciar && el !== contenedor && el !== mensajeFinal) {
          el.style.display = "none";
        }
      });
      mensajeFinal.style.display = "block";
    }, 1500);
  }

  // Reiniciar juego
  botonReiniciar.addEventListener("click", () => {
    imagenes.forEach(img => {
      const id = img.getAttribute("data-id");
      const originalContainer = contenedoresOriginales[id];
      if (!originalContainer.contains(img)) {
        originalContainer.appendChild(img);
      }
      img.classList.remove("moved");
      img.setAttribute("draggable", "true");
    });

    zonasDrop.forEach(zona => {
      zona.innerHTML = "<p>Arrastre y suelte la imagen aqui</p>";
    });

    botonReiniciar.classList.add("btn-principal");

    // Restaurar elementos
    Array.from(secJuego.children).forEach(el => {
      if (el !== botonReiniciar) {
        el.style.display = "";
      }
    });

    const finales = document.querySelector(".imagenes-finales");
    if (finales) finales.remove();
    mensajeFinal.style.display = "none";
  });
});
