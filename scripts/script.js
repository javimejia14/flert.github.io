document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.getElementById("start-button");
  if (startButton) {
    startButton.addEventListener("click", function (e) {
      e.preventDefault();
      var content = document.getElementById("content");
      content.classList.add("fade-out");
      setTimeout(function () {
        window.location.href = "/src/capitulo1.html";
      }, 1000);
    });
  }
  // Function to toggle dropdown on mobile
  function toggleDropdown(event) {
    if (window.innerWidth <= 768) {
      event.preventDefault();
      const dropdownContent = this.nextElementSibling;
      this.classList.toggle("active");
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    }
  }
  // Add click event listeners to dropdown toggles
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", toggleDropdown);
  });

  // Function to reset dropdowns on window resize
  function resetDropdowns() {
    if (window.innerWidth > 768) {
      const dropdownContents = document.querySelectorAll("nav > ul > li > ul");
      dropdownContents.forEach((content) => {
        content.style.display = "";
      });
      dropdownToggles.forEach((toggle) => {
        toggle.classList.remove("active");
      });
    }
  }
  // Add event listener for window resize
  window.addEventListener("resize", resetDropdowns);

  //Script del capitulo I
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

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  showSlide(0);
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
