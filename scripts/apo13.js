document.addEventListener("DOMContentLoaded", function() {
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

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            document.getElementById("next").click();
        } else if (e.key === "ArrowLeft") {
            document.getElementById("prev").click();
        }
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
        if (touchendX < touchstartX) document.getElementById("next").click();
        if (touchendX > touchstartX) document.getElementById("prev").click();
    }

    // Initialize first slide
    showSlide(0);
});