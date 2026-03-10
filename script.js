/* ============================================
   MCM Enterprises — Global Script
   ============================================ */

// ── Nav mobile toggle ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Contact form ──
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    // Netlify / Formspree compatible — replace action URL as needed
    const data = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(res => {
      if (res.ok) {
        formStatus.textContent = 'Message received. We will be in touch shortly.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('Server error');
      }
    })
    .catch(() => {
      formStatus.textContent = 'Something went wrong. Please email us directly.';
      formStatus.className = 'form-status error';
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'Submit Inquiry';
    });
  });
}
