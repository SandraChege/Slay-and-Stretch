// === Activities Section Carousel ===
document.addEventListener("DOMContentLoaded", () => {
    const activityCarousel = document.querySelector(".activities-carousel");
    const activityCards = document.querySelectorAll(".activity-card");
    const activityPrevBtn = document.querySelector(".activities-prev");
    const activityNextBtn = document.querySelector(".activities-next");

    if (activityCarousel && activityCards.length > 0) {
        const activityCardWidth = activityCards[0].offsetWidth + 16; // card + margin
        let activityScrollPosition = 0;

        // Next button
        activityNextBtn.addEventListener("click", () => {
            if (activityScrollPosition < (activityCards.length - 1) * activityCardWidth) {
                activityScrollPosition += activityCardWidth;
                activityCarousel.scrollTo({
                    left: activityScrollPosition,
                    behavior: "smooth"
                });
            }
        });

        // Prev button
        activityPrevBtn.addEventListener("click", () => {
            if (activityScrollPosition > 0) {
                activityScrollPosition -= activityCardWidth;
                activityCarousel.scrollTo({
                    left: activityScrollPosition,
                    behavior: "smooth"
                });
            }
        });
    }
});
