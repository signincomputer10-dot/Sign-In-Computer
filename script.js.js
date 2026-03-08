// script.js
document.addEventListener('DOMContentLoaded', () => {
    // PRELOADER HIDE
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });
    // fallback: hide after 2.5s
    setTimeout(() => preloader.classList.add('hidden'), 2500);

    // SCROLL PROGRESS BAR
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // SCROLL REVEAL ANIMATION (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => observer.observe(el));

    // COUNTER ANIMATION (when why-choose section appears)
    const counterSection = document.querySelector('#why-choose');
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const increment = target / 80; // smooth step
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                startCounters();
            }
        });
    }, { threshold: 0.4 });
    if (counterSection) counterObserver.observe(counterSection);

    // HOVER GLOW (already in css, but extra effect on service cards)
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            card.style.transition = 'box-shadow 0.2s, transform 0.3s';
        });
    });

    // SMOOTH SCROLL FOR NAVIGATION (anchor links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // animated form dummy submit (just feedback)
    const form = document.getElementById('animatedForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Thank you! We will contact you soon. (demo)');
        form.reset();
    });

    // small floating elements delay (already in css, we add random movement via JS?)
    // extra touch: dynamic gradient on scroll for hero
    window.addEventListener('scroll', () => {
        // subtle parallax for floating blobs
        const blob1 = document.querySelector('.blob1');
        const blob2 = document.querySelector('.blob2');
        if (blob1 && blob2) {
            let scrollY = window.scrollY;
            blob1.style.transform = `translate(${scrollY * 0.02}px, -${scrollY * 0.01}px)`;
            blob2.style.transform = `translate(-${scrollY * 0.01}px, ${scrollY * 0.02}px)`;
        }
    });
});