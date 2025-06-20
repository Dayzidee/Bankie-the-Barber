// Loader: show immediately
const loader = (() => {
  const el = document.createElement("div");
  el.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: #111; display: flex; align-items: center; justify-content: center;
    z-index: 10000; transition: opacity 0.5s ease;
  `;
  const text = document.createElement("div");
  text.textContent = "BANKKIETHEBARBER";
  text.style.cssText = `
    font-family: 'Oswald', sans-serif; font-size: 2rem;
    background: linear-gradient(90deg, #444, #b0b0b0);
    -webkit-background-clip: text; color: transparent;
    letter-spacing: 3px; animation: pulse 1.5s infinite;
  `;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
  `;
  document.head.appendChild(style);
  el.appendChild(text);
  document.body.appendChild(el);
  window.addEventListener("load", () => {
    setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 500);
    }, 2000);
  });
  return el;
})();

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeAnimations();
  initializeParticles();
  initializeTestimonials();
  initializeContactForm();
  initializeScrollEffects();
});

// Navigation
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".menu a");

  navLinks.forEach((link, i) => link.style.setProperty("--i", i));

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.querySelectorAll(".line").forEach((line, idx) => {
        if (navMenu.classList.contains("active")) {
          if (idx === 0)
            line.style.transform = "rotate(45deg) translate(5px, 5px)";
          if (idx === 1) line.style.opacity = "0";
          if (idx === 2)
            line.style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
          line.style.transform = "none";
          line.style.opacity = "1";
        }
      });
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const section = document.querySelector(targetId);
      if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.querySelectorAll(".line").forEach((line) => {
          line.style.transform = "none";
          line.style.opacity = "1";
        });
      }
    });
  });

  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".sticky-nav");
    nav.style.background =
      window.scrollY > 100 ? "rgba(17,17,17,0.98)" : "rgba(17,17,17,0.95)";
  });
}

// GSAP Animations
function initializeAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;
  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline();
  heroTl
    .from(".greeting", { opacity: 0, y: 30, duration: 0.8, delay: 0.2 })
    .from(
      ".brand-name",
      { opacity: 0, y: 50, duration: 1, ease: "power2.out" },
      "-=0.5"
    )
    .from(".hero-description", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
    .from(
      ".btn-group .cta-primary",
      { opacity: 0, x: -30, duration: 0.6 },
      "+=0.2"
    )
    .from(
      ".btn-group .btn-secondary",
      { opacity: 0, x: 30, duration: 0.6 },
      "+=0.1"
    )
    .from(
      ".hero-social .social-links a",
      { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 },
      "+=0.1"
    )
    .from(
      ".hero-image",
      { opacity: 0, scale: 0.8, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".service-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".gallery-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: i * 0.05,
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".stat").forEach((stat) => {
    gsap.from(stat, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: stat,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    const numberElement = stat.querySelector("h4");
    if (numberElement) {
      const originalText = numberElement.textContent;
      const finalNumber = parseInt(originalText);
      const hasPlus = originalText.includes("+");
      const hasPercent = originalText.includes("%");
      numberElement.textContent =
        "0" + (hasPlus ? "+" : "") + (hasPercent ? "%" : "");
      gsap.to(
        { value: 0 },
        {
          value: finalNumber,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            const v = Math.floor(this.targets()[0].value);
            numberElement.textContent =
              v + (hasPlus ? "+" : "") + (hasPercent ? "%" : "");
          },
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  });

  gsap.utils.toArray(".contact-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: -50,
      duration: 0.6,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

// Particle Background
function initializeParticles() {
  if (typeof tsParticles === "undefined") return;
  tsParticles.load("particle-background", {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#b0b0b0" },
      links: {
        color: "#b0b0b0",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      collisions: { enable: true },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  });
}

// Testimonials
function initializeTestimonials() {
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".prev-testimonial");
  const nextBtn = document.querySelector(".next-testimonial");
  let current = 0;
  if (!testimonials.length) return;

  const show = (idx) =>
    testimonials.forEach((t, i) => t.classList.toggle("active", i === idx));
  const next = () => {
    current = (current + 1) % testimonials.length;
    show(current);
  };
  const prev = () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    show(current);
  };

  nextBtn && nextBtn.addEventListener("click", next);
  prevBtn && prevBtn.addEventListener("click", prev);
  setInterval(next, 5000);
}

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);
    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const message = formData.get("message")?.trim();

    // Validate required fields
    if (!name || !phone || !message) {
      showNotification("Please fill in all required fields", "error");
      if (status) status.textContent = "Please fill in all required fields";
      return;
    }

    if (status) status.textContent = "Sending...";

    // Try to send to Formspree
    try {
      const res = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        if (status) status.textContent = "Message sent! Thank you.";
        showNotification("Message sent! Thank you.", "success");
        contactForm.reset();
      } else {
        throw new Error("Formspree error");
      }
    } catch {
      // If Formspree fails, redirect to WhatsApp
      const whatsappMessage = `Hi! I'm ${name}.\n\nPhone: ${phone}\n\nMessage: ${message}`;
      const whatsappUrl = `https://wa.me/2348183285443?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
      if (status)
        status.textContent =
          "Could not send via form. Redirecting to WhatsApp...";
      showNotification(
        "Could not send via form. Redirecting to WhatsApp...",
        "error"
      );
    }

    setTimeout(() => {
      if (status) status.textContent = "";
    }, 4000);
  });
}

// Book Appointment (scroll to contact)
function bookAppointment() {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const offsetTop = contactSection.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
    setTimeout(() => {
      const nameField = document.getElementById("name");
      nameField && nameField.focus();
    }, 800);
  }
}

// Scroll Effects
function initializeScrollEffects() {
  // Parallax hero image
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-image");
    if (heroImage)
      heroImage.style.transform = `translateY(${scrolled * -0.5}px)`;
  });

  // Scroll progress bar
  const scrollProgress = document.createElement("div");
  scrollProgress.style.cssText = `
    position: fixed; top: 0; left: 0; width: 0%; height: 3px;
    background: linear-gradient(90deg, #111, #b0b0b0);
    z-index: 9999; transition: width 0.3s ease;
  `;
  document.body.appendChild(scrollProgress);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  });
}

// Notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed; top: 100px; right: 20px;
    background: ${
      type === "success" ? "#444" : type === "error" ? "#b00020" : "#888"
    };
    color: #fff; padding: 15px 20px; border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 10000;
    font-family: 'Poppins', sans-serif; font-weight: 500;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    notification.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Gallery Modal
document.addEventListener("click", (e) => {
  const galleryItem = e.target.closest(".gallery-item");
  if (galleryItem) {
    const img = galleryItem.querySelector("img");
    if (img) {
      const modal = document.createElement("div");
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center;
        z-index: 10000; cursor: pointer;
      `;
      const modalImg = document.createElement("img");
      modalImg.src = img.src;
      modalImg.style.cssText = `
        max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 10px;
      `;
      modal.appendChild(modalImg);
      document.body.appendChild(modal);

      const closeModal = () => modal.remove();
      modal.addEventListener("click", closeModal);
      document.addEventListener("keydown", function escHandler(ev) {
        if (ev.key === "Escape") {
          closeModal();
          document.removeEventListener("keydown", escHandler);
        }
      });
    }
  }
});
