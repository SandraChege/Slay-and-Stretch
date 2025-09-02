//HAMBURGER MENU
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navbarMenu = document.querySelector("nav ul");
    const navLinks = navbarMenu.querySelectorAll("a");

    // Toggle menu open/close
    menuToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");

        // Change icon ☰ → ✖
        if (navbarMenu.classList.contains("active")) {
            menuToggle.textContent = "✖";
        } else {
            menuToggle.textContent = "☰";
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbarMenu.classList.remove("active");
            menuToggle.textContent = "☰"; // reset icon
        });
    });
});


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

// Testimonial Section
document.addEventListener("DOMContentLoaded", () => {
    const testimonialCarousel = document.getElementById("testimonial-carousel");
    const testimonialDots = document.getElementById("testimonial-dots");
    const testimonialCards = testimonialCarousel.children;

    const testimonialVisibleCards = 2; // show 2 at a time
    const totalCards = testimonialCards.length;
    const totalSlides = totalCards - (testimonialVisibleCards - 1);
    let currentSlide = 0;

    // card width (including gap)
    const gap = parseFloat(getComputedStyle(testimonialCarousel).gap) || 0;
    const testimonialCardWidth = testimonialCards[0].offsetWidth + gap;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            currentSlide = i;
            updateCarousel();
        });
        testimonialDots.appendChild(dot);
    }
    const dots = testimonialDots.querySelectorAll(".dot");

    function updateCarousel() {
        const offset = currentSlide * testimonialCardWidth;
        testimonialCarousel.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[currentSlide]) dots[currentSlide].classList.add("active");
    }

    // Auto-scroll every 30s
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 30000);

    // ===============================
    // Modal Logic for "Read More"
    // ===============================
    const MAX_WORDS = 50;
    const modal = document.getElementById("testimonial-modal");
    const modalText = document.getElementById("modal-text");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll(".testimonial-text").forEach(textElement => {
        const fullText = textElement.textContent.trim();
        const words = fullText.split(/\s+/);

        if (words.length > MAX_WORDS) {
            const truncated = words.slice(0, MAX_WORDS).join(" ") + "...";
            textElement.textContent = truncated;

            const button = document.createElement("button");
            button.className = "read-more-btn";
            button.textContent = "Read More";

            button.addEventListener("click", () => {
                modalText.textContent = fullText;
                modal.style.display = "flex";
            });

            textElement.insertAdjacentElement("afterend", button);
        }
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    window.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

})

//CONTACT US FORM
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear old errors
        form.querySelectorAll(".error-message").forEach(msg => {
            msg.textContent = "";
            msg.style.display = "none";
        });
        form.querySelectorAll("input, textarea").forEach(field => {
            field.classList.remove("error");
        });

        // Validate fields
        const name = form.querySelector("input[name='name']");
        const email = form.querySelector("input[name='email']");
        const message = form.querySelector("textarea[name='message']");

        if (name.value.trim() === "") {
            setError(name, "Name is required.");
            isValid = false;
        }

        if (email.value.trim() === "") {
            setError(email, "Email is required.");
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            setError(email, "Please enter a valid email.");
            isValid = false;
        }

        if (message.value.trim() === "") {
            setError(message, "Message cannot be empty.");
            isValid = false;
        }

        if (isValid) {
            console.log("Message Sent:", {
                name: name.value.trim(),
                email: email.value.trim(),
                message: message.value.trim(),
            });

            alert("Thank you for contacting us, " + name.value.trim() + "! We'll get back to you soon.");
            form.reset();
        }
    });

    function setError(input, message) {
        const errorMessage = input.parentElement.querySelector(".error-message");
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
        input.classList.add("error");
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});


