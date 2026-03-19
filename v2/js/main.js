// Enable reveal animations
document.documentElement.classList.add('js');

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Nav scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// Contact form — Formbridge
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('.form-submit');
        btn.disabled = true;
        btn.textContent = 'Versturen...';

        const data = Object.fromEntries(new FormData(this));
        data._ts = Date.now();

        try {
            const res = await fetch('https://forms.perceptum.nl/api/v1/s/f_12b2c5badffa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                this.innerHTML = '<div style="text-align:center;padding:3rem;">' +
                    '<h3 style="margin-bottom:0.5rem;">Bericht verstuurd</h3>' +
                    '<p style="color:var(--gray-700);">We nemen zo snel mogelijk contact met je op.</p>' +
                    '</div>';
            } else {
                throw new Error();
            }
        } catch {
            btn.disabled = false;
            btn.textContent = 'Verstuur bericht';
            alert('Er ging iets mis. Probeer het nog eens of bel 06 – 511 930 50.');
        }
    });
}
