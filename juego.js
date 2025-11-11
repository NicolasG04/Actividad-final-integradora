
document.addEventListener("DOMContentLoaded", () => {
  let secJuego = document.querySelector(".sec-juego");
  let divTop = document.querySelector(".div-top");
  let zonasDrop = document.querySelectorAll(".div-juego");
  let imagenes = document.querySelectorAll(".div-img-juego img");
  let botonReiniciar = document.getElementById("botoncito");
  let titulo = document.getElementById("titulo");

  const contenedoresOriginales = {};
  imagenes.forEach((img, index) => {
    const id = `img-${index}`;
    img.setAttribute("data-id", id);
    contenedoresOriginales[id] = img.parentElement;
  });

  let imagenArrastrada = null;

  imagenes.forEach((img) => {
    img.addEventListener("dragstart", () => {
      imagenArrastrada = img;
    });
  });

  zonasDrop.forEach((zona) => {
    zona.addEventListener("dragover", (e) => e.preventDefault());
    zona.addEventListener("drop", (e) => {
      e.preventDefault();
      botonReiniciar.style.display = "flex";
      if (imagenArrastrada) {
        zona.innerHTML = "";
        zona.appendChild(imagenArrastrada);
        imagenArrastrada.setAttribute("draggable", "false");
        imagenArrastrada.classList.add("moved");
        imagenArrastrada = null;
        setTimeout(verificarPuzzle, 100);
      }
    });
  });

  function verificarPuzzle() {
    const imagenesColocadas = Array.from(zonasDrop).map((z) =>
      z.querySelector("img")
    );
    const todasColocadas = imagenesColocadas.every((img) => img !== null);
    if (!todasColocadas) return;

    let ordenCorrecto = ["imagenDos", "imagenUno", "imagenTres"];
    const ordenActual = imagenesColocadas.map((img) => {
      if (img.classList.contains("imagenUno")) return "imagenUno";
      if (img.classList.contains("imagenDos")) return "imagenDos";
      if (img.classList.contains("imagenTres")) return "imagenTres";
      return "";
    });

    divTop.classList.add("imagenes-finales");
    titulo.style.opacity = 0;
    setTimeout(() => {
      titulo.style.display = "none";
    }, 3000);

    if (JSON.stringify(ordenActual) === JSON.stringify(ordenCorrecto)) {
      mostrarFinal(imagenesColocadas);
    } 
    else {
      setTimeout(() => {
        let mensaje = document.createElement("p");
        mensaje.innerHTML = "Lo sentimos ,Puzzle no resuelto. <br> Prueba otra vez";
        mensaje.classList.add("mensaje-mal");
        divTop.appendChild(mensaje);
      }, 3000);
    }
  }

  function mostrarFinal(imagenesColocadas) {
    setTimeout(() => {
      let mensaje = document.createElement("p");
      mensaje.innerHTML = `Felicitaciones!! <br> Puzzle correctamente resuelto`;
      mensaje.classList.add("mensaje-final");
      secJuego.insertBefore(mensaje, botonReiniciar);
      divTop.style.display = "none";
    }, 3000);
  }

  botonReiniciar.addEventListener("click", () => {
    window.location.reload();
  });
});
