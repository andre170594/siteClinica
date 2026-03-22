// ================================
// STORY SLIDER (IGUAL AO INSTAGRAM)
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const gallerySection = document.getElementById("galeria");
    let sliderStarted = false;

    function startStorySlider() {
        if (sliderStarted) return;
        sliderStarted = true;

        const stories = document.querySelectorAll(".story");
        let current = 0;
        let timer;
        let isPaused = false;
        const duration = 5000;

        function resetBars() {
            stories.forEach(story => {
                const bar = story.querySelector(".bar span");
                bar.style.transition = "none";
                bar.style.width = "0%";
            });
        }

        function animateBar(story) {
            const bar = story.querySelector(".bar span");
            bar.style.transition = `width ${duration}ms linear`;
            requestAnimationFrame(() => {
                bar.style.width = "100%";
            });
        }

        function showStory(index) {
            stories.forEach((s, i) => {
                s.classList.remove("active");
            });
            stories[index].classList.add("active");
            resetBars();
            animateBar(stories[index]);

        }

        function nextStory() {
            current = (current + 1) % stories.length;
            showStory(current);
        }

        function startTimer() {
            timer = setInterval(() => {
                if (!isPaused) nextStory();
            }, duration);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        stories.forEach(story => {
            story.addEventListener("mousedown", () => {
                isPaused = true;
                stopTimer();
            });

            story.addEventListener("mouseup", () => {
                isPaused = false;
                startTimer();
            });

            story.addEventListener("touchstart", () => {
                isPaused = true;
                stopTimer();
            });

            story.addEventListener("touchend", () => {
                isPaused = false;
                startTimer();
            });

            story.addEventListener("click", () => {
                nextStory();
            });
        });

        showStory(current);
        startTimer();
    }

    // Iniciar apenas quando a secção ficar visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startStorySlider();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(gallerySection);
});