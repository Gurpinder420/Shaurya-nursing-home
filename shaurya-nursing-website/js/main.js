document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) AOS.init({ duration: 750, once: true, offset: 90 });

  document.querySelectorAll(".testimonial-swiper").forEach((el) => {
    if (!window.Swiper) return;
    new Swiper(el, {
      loop: true,
      autoplay: { delay: 3600, disableOnInteraction: false },
      pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
      slidesPerView: 1,
      spaceBetween: 24,
      breakpoints: { 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }
    });
  });

  const counters = document.querySelectorAll(".counter");
  const runCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = `${target}${target === 98 ? "%" : "+"}`;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach(runCounter);
  }

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".filter-scope");
      const filter = button.dataset.filter;
      group.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      group.querySelectorAll("[data-category]").forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    });
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.classList.add("submitted");
    });
  });
});
