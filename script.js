// Efecto header

document.addEventListener("DOMContentLoaded", () => {
  let header = document.querySelector("header");
  let links = document.querySelectorAll(".link-nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("scroll");
      links.forEach((link) => link.classList.add("a-scroll"));
    } else {
      header.classList.remove("scroll");
      links.forEach((link) => link.classList.remove("a-scroll"));
    }
  });
});

// Cards main

document.addEventListener("DOMContentLoaded", () => {
  let cardIzq = document.getElementById("cardIzq");
  let cardDer = document.getElementById("cardDer");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(cardIzq);
  observer.observe(cardDer);
});

// Info Historia

document.addEventListener("DOMContentLoaded", () => {
  let showLeft = document.querySelectorAll(".show-left");
  let showRight = document.querySelectorAll(".show-right");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // se ejecuta una sola vez
        }
      });
    },
    { threshold: 0.2 }
  );

  showLeft.forEach((el) => observer.observe(el));
  showRight.forEach((el) => observer.observe(el));
});

// Video

let video = document.querySelector(".div-video video");
let btnPlay = document.querySelector('.div-controles img[alt="play"]');
let btnPause = document.querySelector('.div-controles img[alt="pausa"]');
let divDuracion = document.querySelector(".div-duracion");

function formatoTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${minutos}:${seg.toString().padStart(2, "0")}`;
}

video.addEventListener("loadedmetadata", () => {
  const duracionTotal = formatoTiempo(video.duration);
  divDuracion.textContent = `Duración video: ${duracionTotal}`;
});

video.addEventListener("timeupdate", () => {
  const tiempoActual = formatoTiempo(video.currentTime);
  const duracionTotal = formatoTiempo(video.duration);
  divDuracion.textContent = `Duración video: ${tiempoActual}`;
});

btnPlay.addEventListener("click", () => {
  video.play();
});
btnPause.addEventListener("click", () => {
  video.pause();
});
