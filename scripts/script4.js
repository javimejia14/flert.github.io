document.addEventListener("DOMContentLoaded", function () {
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
  
    // Slide functionality
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
  
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
  
    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        nextButton.click();
      } else if (e.key === "ArrowLeft") {
        prevButton.click();
      }
    });
  
    // Initialize first slide
    showSlide(0);
  
    // Process buttons functionality
    const processButtons = document.querySelectorAll('.process-button');
    processButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = href;
        }, 1000);
      });
    });
  
    // Touch swipe functionality for mobile
    let touchstartX = 0;
    let touchendX = 0;
  
    document.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    });
  
    document.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  
    function handleSwipe() {
      if (touchendX < touchstartX) nextButton.click();
      if (touchendX > touchstartX) prevButton.click();
    }
  });