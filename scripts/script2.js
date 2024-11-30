document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.style.transform = "scale(1)";
        slide.style.zIndex = "1";
        setTimeout(() => slide.classList.add("active"), 50);
      } else {
        let xTranslate = (i - index) * 100;
        let yTranslate = 0;
        if (Math.abs(i - index) > 1) {
          yTranslate = ((i - index) % 2) * 100;
        }
        slide.style.transform = `scale(0.8) translate(${xTranslate}%, ${yTranslate}%)`;
        slide.style.zIndex = "0";
      }
    });
    updateProgressBar();
  }

  function updateProgressBar() {
    const progress = ((currentSlide + 1) / slides.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
  }

  document.getElementById("next").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  document.getElementById("prev").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Iniciar la presentación
  showSlide(0);

  // Zoom de la imagen del modelo de gobierno
  const imagenModelo = document.querySelector(".imagen-modelo img");
  if (imagenModelo) {
    imagenModelo.addEventListener("click", function () {
      this.classList.toggle("zoomed");
    });

    const style = document.createElement("style");
    style.textContent = `
            .imagen-modelo img {
                transition: transform 0.3s ease;
                cursor: zoom-in;
            }
            .imagen-modelo img.zoomed {
                transform: scale(1.5);
                cursor: zoom-out;
            }
        `;
    document.head.appendChild(style);
  }
});
