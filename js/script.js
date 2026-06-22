document.addEventListener('DOMContentLoaded', function() {

    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000);
    }

    const burger = document.querySelector('.burger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const navItems = document.querySelectorAll('.nav-links a');

    function closeMenu() {
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            burger.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('open');
        }
    }

    function toggleMenu(e) {
        e.stopPropagation();
        navLinks.classList.toggle('open');
        burger.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('open');
    }

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    const navHeader = document.getElementById('navHeader');
    if (navHeader) {
        navHeader.addEventListener('click', closeMenu);
    }

    if (navItems.length) {
        navItems.forEach(item => {
            item.addEventListener('click', closeMenu);
        });
    }

    const heroImg = document.querySelector('.hero-img');
    const aboutSection = document.querySelector('.about-section');
    const aboutCards = document.querySelectorAll('.about-card img');

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isMobile && !prefersReducedMotion) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;

            if (heroImg) {
                const heroRect = heroImg.closest('.hero-section') ? heroImg.closest('.hero-section').getBoundingClientRect() : null;
                const heroSectionTop = heroRect ? heroRect.top + scrollY : 0;
                let heroRelative = scrollY - heroSectionTop;
                if (heroRelative < 0) {
                    heroRelative = 0;
                }
                if (scrollY < window.innerHeight * 1.2) {
                    heroImg.style.transform = `translateY(${heroRelative * 0.18}px)`;
                }
            }

            if (aboutSection) {
                const aboutRect = aboutSection.getBoundingClientRect();
                const aboutMid = aboutRect.top + aboutRect.height / 2;
                const windowMid = window.innerHeight / 2;
                const aboutOffset = (aboutMid - windowMid) * 0.12;
                aboutCards.forEach((card, i) => {
                    const dir = i % 2 === 0 ? 1 : -1;
                    card.style.transform = `translateY(${aboutOffset * dir}px)`;
                });
            }
        }, { passive: true });
    }

    const fadeTargets = document.querySelectorAll(
        '.about-card, .feature-block, .step, .review-card, .cta, .section-title'
    );

    fadeTargets.forEach(el => {
        el.classList.add('fade-in-up');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeTargets.forEach(el => observer.observe(el));

});