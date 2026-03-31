// HERO SLIDER

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slider .slide");
    if (slides.length <= 1) return;

    let current = 0;
    const intervalTime = 5000; // 5s

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    setInterval(nextSlide, intervalTime);
});
