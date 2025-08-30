document.addEventListener("DOMContentLoaded", function () {
  // Nav toggle
  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Back-to-top visibility
  const toTop = document.getElementById("to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 320) toTop?.classList.add("show");
    else toTop?.classList.remove("show");
  });

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Contact form submit (relies on EmailJS already loaded + inited in <head>)
  const form = document.getElementById("contact-form");
  if (form) {
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please complete all fields.";
        return;
      }

      if (!(window.emailjs && emailjs.send)) {
        statusEl.textContent = "Messaging service unavailable. Please email me directly: as18181@nyu.edu";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      statusEl.textContent = "";

      emailjs
        .send("service_at13aoc", "template_z39a68s", {
          from_name: name,
          from_email: email,
          message: message,
          reply_to: email
        })
        .then(function () {
          statusEl.textContent = "Thanks—your message was sent.";
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        })
        .catch(function (err) {
          let msg = "Could not send message. ";
          if (err && err.text && /origin/i.test(err.text)) {
            msg += "Add your site domain to EmailJS Allowed Origins.";
          } else {
            msg += "Please try again or email me directly: as18181@nyu.edu";
          }
          statusEl.textContent = msg;
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });
  }

  // Hero Email CTA
  const emailCta = document.getElementById("email-cta");
  if (emailCta) {
    emailCta.addEventListener("click", function (e) {
      e.preventDefault();
      const mailto = this.getAttribute("data-mailto") || this.getAttribute("href") || "mailto:as18181@nyu.edu";
      try { window.location.href = mailto; } catch (_) {}

      // Fallback if no mail client opens
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          const addr = (mailto || "").replace(/^mailto:/, "").split("?")[0];
          if (navigator.clipboard && addr) navigator.clipboard.writeText(addr).catch(() => {});
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          const status = document.getElementById("form-status");
          if (status) status.textContent = "Email copied. If your mail app didn’t open, paste it or use the form below.";
          document.getElementById("message")?.focus({ preventScroll: true });
        }
      }, 800);
    });
  }
});
