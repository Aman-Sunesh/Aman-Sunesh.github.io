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

  // Research content refinements
  const earlierHeading = Array.from(document.querySelectorAll(".subsection > h3"))
    .find((el) => el.textContent.trim() === "Earlier research");
  if (earlierHeading) {
    const list = earlierHeading.nextElementSibling;
    if (list) {
      list.className = "research-list";
      list.innerHTML = `
        <article class="card role">
          <header class="role-head">
            <div>
              <h3>Dynamical Systems Lab — Research Assistant</h3>
              <p class="role-sub">NYU Center for Urban Science + Progress</p>
            </div>
            <span class="role-date">Jan – May 2026</span>
          </header>
          <ul class="bullets">
            <li>Built a U.S.-wide tract-level migration–hazard framework over <strong>157M origin–destination-year flows</strong>, integrating FEMA hazard risk, socioeconomic, housing-affordability, and geographic covariates.</li>
            <li>Estimated <strong>Poisson gravity models across four hazard families and 150+ features</strong>, then stress-tested findings using spatial-neighbor controls, county fixed effects, placebo hazard shuffling, calibration diagnostics, and robustness analyses.</li>
            <li>Achieved <strong>test D² ≈ 0.389 and MAE ≈ 1.99</strong> on the final model.</li>
          </ul>
          <div class="tags"><span>Poisson Models</span><span>Geospatial Analysis</span><span>Migration Modeling</span><span>Robustness Analysis</span></div>
        </article>

        <article class="card role">
          <header class="role-head">
            <div>
              <h3>Center for Quantum &amp; Topological Systems — Undergraduate Researcher</h3>
              <p class="role-sub">NYU Abu Dhabi</p>
            </div>
            <span class="role-date">Sep 2024 – Sep 2025</span>
          </header>
          <ul class="bullets">
            <li>Engineered a full-stack <strong>NV-center quantum diamond spectrometer</strong>, integrating 532 nm optical excitation, microwave/RF control, NI-DAQ acquisition, PulseBlaster timing, and APD-based fluorescence detection.</li>
            <li>Performed optical alignment and synchronized pulse sequences with data acquisition, successfully obtaining <strong>ODMR spectra from the diamond sensor</strong>.</li>
            <li>Developed a <strong>PyQt6/QuPyT experiment-control and analysis platform</strong> for code-free experiment configuration, pulse-sequence setup, acquisition, and real-time ODMR analysis.</li>
          </ul>
          <div class="tags"><span>Quantum Sensing</span><span>Experimental Systems</span><span>PyQt6</span><span>DAQ &amp; Pulse Control</span></div>
        </article>`;
    }
  }

  const publications = Array.from(document.querySelectorAll(".publication"));
  const routerPub = publications.find((card) => card.textContent.includes("RequestRouter"));
  if (routerPub) {
    const description = Array.from(routerPub.querySelectorAll("p"))
      .find((p) => !p.classList.contains("authors"));
    if (description) {
      description.innerHTML = `Designed a workload-aware request-boundary controller that routes single-GPU LLM inference across FP16, GPTQ 4-bit, INT8, speculative decoding, prefix caching, and hybrid modes. Evaluated on an NVIDIA A100 across latency, throughput, energy/token, GPU memory, and model quality; achieved a <strong>2.10× mean latency speedup</strong> and a <strong>0.48× energy ratio vs. FP16</strong> while maintaining benchmark quality.`;
    }
  }

  const mnarPub = publications.find((card) => card.textContent.includes("Missing Not-At-Random"));
  if (mnarPub) {
    const description = Array.from(mnarPub.querySelectorAll("p"))
      .find((p) => !p.classList.contains("authors"));
    if (description) {
      description.innerHTML = `Developed an MNAR-aware linear dynamical system combining <strong>Extended Kalman filtering, RTS smoothing, and EM</strong> for traffic-sensor blackouts on Seattle Loop and METR-LA. Achieved approximately <strong>65–70% lower imputation error than LOCF</strong> and <strong>2–8% lower forecasting error than MAR LDS baselines</strong>, while modeling missingness as an informative signal.`;
    }
  }

  const projectsGrid = document.querySelector("#projects .grid.two");
  if (projectsGrid && !projectsGrid.textContent.includes("Bandhani-to-Modern Cultural Style Transfer")) {
    projectsGrid.insertAdjacentHTML("beforeend", `
      <article class="card project">
        <p class="project-kicker">Computer Vision · Generative Modeling</p>
        <h3>Bandhani-to-Modern Cultural Style Transfer</h3>
        <p>Built a PyTorch CycleGAN for unpaired image-to-image translation between Bandhani textile motifs and contemporary art styles, including preprocessing, adversarial and cycle-consistency training, checkpoint evaluation, and an interactive Gradio demo.</p>
        <div class="tags"><span>PyTorch</span><span>CycleGAN</span><span>Computer Vision</span><span>Generative Models</span></div>
        <div class="links"><a href="https://github.com/Aman-Sunesh/CycleGAN-for-Cultural-Style-Transfer-Translating-Bandhani-Textile-Motifs-to-Contemporary-Style" target="_blank" rel="noopener noreferrer">Code ↗</a></div>
      </article>`);
  }

  // Contact form submit (legacy fallback; current redesign uses direct email links)
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
