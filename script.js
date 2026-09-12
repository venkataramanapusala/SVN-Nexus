/**
 * SVN Nexus Private Limited — Main JavaScript
 * Features: sticky nav, mobile menu, scroll reveal, active links, form validation, back-to-top
 */

'use strict';

/* ============================================================
   UTILITY: Query Selector Helpers
   ============================================================ */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const navbar      = $('#navbar');
const hamburger   = $('#hamburger');
const navLinks    = $('#navLinks');
const navLinkList = $$('.nav-link');
const backToTop   = $('#backToTop');
const contactForm = $('#contactForm');
const formSuccess = $('#formSuccess');
const yearSpan    = $('#year');

/* ============================================================
   DYNAMIC YEAR IN FOOTER
   ============================================================ */
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ============================================================
   STICKY NAVBAR — add shadow on scroll
   ============================================================ */
function handleNavbarScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run on load

/* ============================================================
   MOBILE HAMBURGER MENU — toggle open/close
   ============================================================ */
function toggleMenu(forceClose = false) {
  const isOpen = navLinks.classList.contains('open');
  if (forceClose || isOpen) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  } else {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}

if (hamburger) {
  hamburger.addEventListener('click', () => toggleMenu());
}

// Close menu when a nav link is clicked
navLinkList.forEach((link) => {
  link.addEventListener('click', () => toggleMenu(true));
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    toggleMenu(true);
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleMenu(true);
});

/* ============================================================
   SMOOTH SCROLL — for all anchor links (with navbar offset)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navHeight = navbar ? navbar.offsetHeight : 72;
    const offsetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

/* ============================================================
   ACTIVE NAV LINK — highlight based on scroll position
   ============================================================ */
const sections = $$('section[id]');

function updateActiveLink() {
  let currentSection = '';
  const navHeight = navbar ? navbar.offsetHeight : 72;

  sections.forEach((section) => {
    const top = section.offsetTop - navHeight - 40;
    if (window.scrollY >= top) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkList.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* ============================================================
   SCROLL REVEAL ANIMATION — IntersectionObserver
   ============================================================ */
function initReveal() {
  const revealElements = $$('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation for sibling elements
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
          );
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// Wait for DOM fully loaded
document.addEventListener('DOMContentLoaded', initReveal);
// Also run immediately in case DOM is already ready
if (document.readyState !== 'loading') initReveal();

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

if (backToTop) {
  window.addEventListener('scroll', handleBackToTop, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */

/**
 * Show an error message on a form field.
 * @param {HTMLElement} field  – input/select/textarea
 * @param {string}      msg    – error message
 * @param {string}      errorId – id of the error span
 */
function showError(field, msg, errorId) {
  field.classList.add('error');
  const span = $(`#${errorId}`);
  if (span) span.textContent = msg;
}

/**
 * Clear error message on a form field.
 * @param {HTMLElement} field
 * @param {string}      errorId
 */
function clearError(field, errorId) {
  field.classList.remove('error');
  const span = $(`#${errorId}`);
  if (span) span.textContent = '';
}

/**
 * Validates the full contact form.
 * @returns {boolean} true if all valid
 */
function validateForm() {
  let isValid = true;

  const name    = $('#name');
  const email   = $('#email');
  const phone   = $('#phone');
  const service = $('#service');
  const message = $('#message');

  // --- Name validation ---
  if (!name.value.trim()) {
    showError(name, 'Full name is required.', 'nameError');
    isValid = false;
  } else if (name.value.trim().length < 2) {
    showError(name, 'Name must be at least 2 characters.', 'nameError');
    isValid = false;
  } else {
    clearError(name, 'nameError');
  }

  // --- Email validation ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError(email, 'Email address is required.', 'emailError');
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, 'Please enter a valid email address.', 'emailError');
    isValid = false;
  } else {
    clearError(email, 'emailError');
  }

  // --- Phone validation (optional, but validate if filled) ---
  if (phone.value.trim()) {
    const phoneRegex = /^[+]?[\d\s\-().]{7,15}$/;
    if (!phoneRegex.test(phone.value.trim())) {
      showError(phone, 'Please enter a valid phone number.', 'phoneError');
      isValid = false;
    } else {
      clearError(phone, 'phoneError');
    }
  } else {
    clearError(phone, 'phoneError');
  }

  // --- Service validation ---
  if (!service.value) {
    showError(service, 'Please select a service.', 'serviceError');
    isValid = false;
  } else {
    clearError(service, 'serviceError');
  }

  // --- Message validation ---
  if (!message.value.trim()) {
    showError(message, 'Message is required.', 'messageError');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError(message, 'Message must be at least 10 characters.', 'messageError');
    isValid = false;
  } else {
    clearError(message, 'messageError');
  }

  return isValid;
}

// Real-time inline validation (on blur)
['name', 'email', 'phone', 'service', 'message'].forEach((id) => {
  const field = $(`#${id}`);
  if (field) {
    field.addEventListener('blur', validateForm);
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateForm();
    });
  }
});

// Form submit handler
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = contactForm.querySelector('.error');
      if (firstError) {
        const top = firstError.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }

    // Simulate form submission (replace with real API call)
    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      contactForm.reset();
      formSuccess.classList.add('show');

      // Hide success after 5s
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
  });
}

/* ============================================================
   NAVBAR LOGO & LINKS — smooth scroll back to top
   ============================================================ */
const logoLink = $('.nav-logo');
if (logoLink) {
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   ANIMATED COUNTER — for hero stats on first viewport entry
   ============================================================ */
function animateCounter(el, target, suffix = '', duration = 1400) {
  let start = 0;
  const step = Math.ceil(duration / target);
  const timer = setInterval(() => {
    start += 1;
    el.textContent = start + suffix;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, step);
}

function initCounters() {
  const statsSection = $('.hero-stats');
  if (!statsSection) return;

  const nums = [
    { el: $$('.stat-num')[0], target: 120, suffix: '+' },
    { el: $$('.stat-num')[1], target: 95,  suffix: '%' },
    { el: $$('.stat-num')[2], target: 8,   suffix: '+' },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        nums.forEach(({ el, target, suffix }) => {
          if (el) animateCounter(el, target, suffix);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', initCounters);
if (document.readyState !== 'loading') initCounters();

/* ============================================================
   NAVBAR HIDE ON MOBILE RESIZE — if window grows past mobile
   ============================================================ */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
    toggleMenu(true);
  }
});
