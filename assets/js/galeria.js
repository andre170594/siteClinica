// ================================
// STORY SLIDER
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const gallerySection = document.getElementById("galeria");
    const storyBars = document.getElementById("storyBars");
    let sliderStarted = false;

    function startStorySlider() {
        if (sliderStarted || !gallerySection || !storyBars) return;
        sliderStarted = true;

        const stories = document.querySelectorAll(".story");
        if (!stories.length) return;

        storyBars.innerHTML = "";
        stories.forEach(() => {
            const bar = document.createElement("div");
            bar.className = "bar";
            bar.innerHTML = "<span></span>";
            storyBars.appendChild(bar);
        });

        const barItems = storyBars.querySelectorAll(".bar");
        const barSpans = storyBars.querySelectorAll(".bar span");
        let current = 0;
        let timer;
        let isPaused = false;
        const duration = 5000;

        function paintBars() {
            barItems.forEach((bar, index) => {
                const span = bar.querySelector("span");
                bar.classList.toggle("is-complete", index < current);

                if (index !== current) {
                    span.style.transition = "none";
                    span.style.width = index < current ? "100%" : "0%";
                }
            });
        }

        function animateCurrentBar() {
            const currentBar = barSpans[current];
            currentBar.style.transition = "none";
            currentBar.style.width = "0%";

            requestAnimationFrame(() => {
                currentBar.style.transition = `width ${duration}ms linear`;
                currentBar.style.width = "100%";
            });
        }

        function showStory(index) {
            stories.forEach((story) => story.classList.remove("active"));
            stories[index].classList.add("active");
            current = index;
            paintBars();
            animateCurrentBar();
        }

        function nextStory() {
            const nextIndex = (current + 1) % stories.length;
            showStory(nextIndex);
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(() => {
                if (!isPaused) {
                    nextStory();
                }
            }, duration);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        stories.forEach((story) => {
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
                startTimer();
            });
        });

        showStory(0);
        startTimer();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startStorySlider();
            }
        });
    }, { threshold: 0.3 });

    if (gallerySection) {
        observer.observe(gallerySection);
    }
});
