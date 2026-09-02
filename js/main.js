/* Synaptro.AI — vanilla JS (no frameworks, no build step).
   Theme toggle · navbar scroll state · mega menu · mobile drawer ·
   FAQ accordion · scroll reveals · count-up stats · contact forms. */
(function () {
  "use strict";

  var SITE_EMAIL = "sales@synaptro.in";
  var FORMSPREE_URL = "https://formspree.io/f/maewllyl";

  /* ---------- Theme (light default, class-based dark) ---------- */
  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
  // Theme is read as early as possible from an inline snippet in <head>;
  // this wires up the toggle buttons.
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var dark = document.documentElement.classList.contains("dark");
      var next = dark ? "light" : "dark";
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
      applyTheme(next);
    });
  });

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.querySelector(".navbar");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Desktop mega menu (hover with close delay + click for touch) ---------- */
  var megaWrap = document.querySelector(".mega-wrap");
  if (megaWrap) {
    var closeTimer = null;
    var openNow = function () {
      if (closeTimer) clearTimeout(closeTimer);
      megaWrap.classList.add("open");
    };
    var closeSoon = function () {
      closeTimer = setTimeout(function () { megaWrap.classList.remove("open"); }, 150);
    };
    megaWrap.addEventListener("mouseenter", openNow);
    megaWrap.addEventListener("mouseleave", closeSoon);
    megaWrap.addEventListener("focusin", openNow);
    megaWrap.addEventListener("focusout", closeSoon);
  }

  /* ---------- Mobile drawer ---------- */
  var openBtn = document.querySelector("[data-drawer-open]");
  var closeBtn = document.querySelector("[data-drawer-close]");
  var backdrop = document.querySelector(".drawer-backdrop");
  function setDrawer(open) {
    document.body.classList.toggle("drawer-open", open);
    if (openBtn) openBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (openBtn) openBtn.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (backdrop) backdrop.addEventListener("click", function () { setDrawer(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setDrawer(false);
  });

  // Expandable services list inside the drawer
  var drawerServicesBtn = document.querySelector("[data-drawer-services]");
  var drawerServices = document.querySelector(".drawer-services");
  if (drawerServicesBtn && drawerServices) {
    drawerServicesBtn.addEventListener("click", function () {
      var open = drawerServices.classList.toggle("open");
      drawerServicesBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- FAQ accordion (single-open, collapsible) ---------- */
  document.querySelectorAll(".faq-list").forEach(function (list) {
    var items = list.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        items.forEach(function (other) {
          other.classList.remove("open");
          var oa = other.querySelector(".faq-a");
          if (oa) oa.style.maxHeight = "0px";
          var oq = other.querySelector(".faq-q");
          if (oq) oq.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Count-up stats ---------- */
  var countEls = document.querySelectorAll("[data-count-to]");
  function animateCount(el) {
    var end = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(eased * end) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window && countEls.length) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-60px 0px" }
    );
    countEls.forEach(function (el) { countObserver.observe(el); });
  } else {
    countEls.forEach(function (el) {
      el.textContent = el.getAttribute("data-count-to") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Contact forms (Formspree) ---------- */
  function setFieldError(field, message) {
    var wrap = field.closest(".form-field");
    if (!wrap) return;
    wrap.classList.toggle("invalid", !!message);
    var err = wrap.querySelector(".field-error");
    if (err && message) err.textContent = message;
  }

  function validateForm(form) {
    var ok = true;
    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    var message = form.querySelector('[name="message"]');
    if (name) {
      var bad = name.value.trim().length < 2;
      setFieldError(name, bad ? "Please enter your name" : "");
      if (bad) ok = false;
    }
    if (email) {
      var badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setFieldError(email, badEmail ? "Please enter a valid email" : "");
      if (badEmail) ok = false;
    }
    if (message) {
      var badMsg = message.value.trim().length < 10;
      setFieldError(message, badMsg ? "Tell us a little more (at least 10 characters)" : "");
      if (badMsg) ok = false;
    }
    return ok;
  }

  function openSuccessModal() {
    var modal = document.getElementById("success-modal");
    if (modal) modal.classList.add("open");
  }
  var successModal = document.getElementById("success-modal");
  if (successModal) {
    successModal.addEventListener("click", function (e) {
      if (e.target === successModal) successModal.classList.remove("open");
    });
    successModal.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () { successModal.classList.remove("open"); });
    });
  }

  document.querySelectorAll("form[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      var btnLabel = submitBtn ? submitBtn.innerHTML : "";
      var errorBanner = form.querySelector(".form-error-banner");
      if (errorBanner) errorBanner.classList.remove("show");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
      }

      var fd = new FormData(form);
      var body = new URLSearchParams();
      body.set("name", (fd.get("name") || "").toString().trim());
      body.set("email", (fd.get("email") || "").toString().trim());
      body.set("company", (fd.get("company") || "").toString().trim() || "—");
      body.set("phone", (fd.get("phone") || "").toString().trim() || "—");
      body.set("service", (fd.get("service") || "").toString() || "Not specified");
      body.set("budget", (fd.get("budget") || "").toString() || "Not specified");
      body.set("message", (fd.get("message") || "").toString().trim());
      body.set("source", form.getAttribute("data-source") || "website");
      body.set("page", window.location.href);
      body.set("_subject", "New lead from " + body.get("name") + " — Synaptro.AI");

      fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: body,
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Form submission failed (" + res.status + ")");
          form.reset();
          openSuccessModal();
        })
        .catch(function (err) {
          console.error("Lead submission failed:", err);
          if (errorBanner) {
            errorBanner.textContent =
              "Something went wrong sending your message. Please email us directly at " + SITE_EMAIL + ".";
            errorBanner.classList.add("show");
          }
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = btnLabel;
          }
        });
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
