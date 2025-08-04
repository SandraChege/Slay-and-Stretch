document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks for subscribing!");
});

// Smooth scroll
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Optional: Alert on form submit
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks for reaching out!");
});

// SHOP OUR MERCH;

  const carousel = document.getElementById("shop-carousel");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");

  let currentIndex = 0;
  const visibleCards = 3;
  const cardWidth = 500 + 24; // width + margin

  function updateScroll() {
    const offset = currentIndex * cardWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener("click", () => {
    const totalCards = carousel.children.length;
    if (currentIndex < totalCards - visibleCards) {
      currentIndex++;
      updateScroll();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateScroll();
    }
  });

  // Auto-scroll every 15s
  setInterval(() => {
    const totalCards = carousel.children.length;
    currentIndex = (currentIndex + 1) % (totalCards - visibleCards + 1);
    updateScroll();
  }, 15000);

  //TESTIMONIALS

  const testimonialCarousel = document.getElementById("testimonial-carousel");
  const testimonialDots = document.getElementById("testimonial-dots");
  const testimonialCards = testimonialCarousel.children;

  const testimonialsvisibleCards = 2;
  const totalCards = testimonialCards.length;
  const totalSlides = Math.ceil(totalCards / testimonialsvisibleCards);
  let currentSlide = 0;

  // Dynamically calculate gap and card width
  const gap = parseFloat(getComputedStyle(testimonialCarousel).gap) || 0;
  const testimonialcardWidth = testimonialCards[0].offsetWidth + gap;

  // Generate dots
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
    const offset = currentSlide * (testimonialcardWidth * visibleCards);
    testimonialCarousel.style.transform = `translateX(-${offset}px)`;

    // Update active dot
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  }

  // Auto-scroll every 30 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, 30000);

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
        modal.style.display = "block";
      });

      // Insert before the author name
      const parent = textElement.parentElement;
      parent.insertBefore(button, parent.querySelector("span"));
    }
  });

  // Close modal on click (×)
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });