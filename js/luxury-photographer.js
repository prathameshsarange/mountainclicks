/**
 * MountainClicks Luxury Photography Engine - Core Interactivity
 * Advanced Animated Physics, Magnetic Buttons, Custom Cursor, & Lightbox
 */

(function () {
    'use strict';

    // ==========================================
    // 1. CUSTOM LUXURY CURSOR
    // ==========================================
    function initCustomCursor() {
        if (window.innerWidth <= 768 || 'ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const dot = document.createElement('div');
        dot.className = 'custom-cursor-dot';
        const ring = document.createElement('div');
        ring.className = 'custom-cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        function renderCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        // Hover interactions on cards, buttons, links
        const interactiveElements = document.querySelectorAll('a, button, .bento-card, .portfolio-card, .story-visual, .insta-box, .gallery-item, [data-cursor]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                ring.classList.add('cursor-hover');
                const customLabel = el.getAttribute('data-cursor') || (el.classList.contains('bento-card') || el.classList.contains('portfolio-card') || el.classList.contains('gallery-item') ? 'VIEW' : '');
                ring.textContent = customLabel;
            });
            el.addEventListener('mouseleave', () => {
                ring.classList.remove('cursor-hover');
                ring.textContent = '';
            });
        });
    }

    // ==========================================
    // 2. MAGNETIC BUTTON PHYSICS
    // ==========================================
    function initMagneticButtons() {
        if (window.innerWidth <= 768 || 'ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const magneticButtons = document.querySelectorAll('.btn-luxury, .hero-arrow-btn, .filter-btn-luxury');
        magneticButtons.forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const btnCenterX = rect.left + rect.width / 2;
                const btnCenterY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - btnCenterX) * 0.28;
                const deltaY = (e.clientY - btnCenterY) * 0.28;

                btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
                btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'none';
            });
        });
    }

    // ==========================================
    // 3. CINEMATIC HERO SLIDER
    // ==========================================
    function initHeroSlider() {
        const slides = document.querySelectorAll('.mc-hero-slide');
        if (!slides.length) return;

        let currentIndex = 0;
        const total = slides.length;
        const counterEl = document.querySelector('.hero-slide-counter');
        const progressFill = document.querySelector('.hero-progress-fill');
        const prevBtn = document.querySelector('.hero-arrow-prev');
        const nextBtn = document.querySelector('.hero-arrow-next');

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const intervalTime = 5500;
        let slideTimer = null;
        let progressStart = 0;
        let progressAnimFrame = null;

        function updateSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            if (counterEl) {
                const currentStr = String(index + 1).padStart(2, '0');
                const totalStr = String(total).padStart(2, '0');
                counterEl.textContent = `${currentStr} / ${totalStr}`;
            }

            if (!reducedMotion) resetProgressBar();
        }

        function resetProgressBar() {
            if (progressAnimFrame) cancelAnimationFrame(progressAnimFrame);
            if (!progressFill) return;

            progressFill.style.width = '0%';
            const startTime = performance.now();

            function stepProgress(time) {
                const elapsed = time - startTime;
                const progress = Math.min((elapsed / intervalTime) * 100, 100);
                progressFill.style.width = `${progress}%`;

                if (elapsed < intervalTime) {
                    progressAnimFrame = requestAnimationFrame(stepProgress);
                }
            }

            progressAnimFrame = requestAnimationFrame(stepProgress);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % total;
            updateSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + total) % total;
            updateSlide(currentIndex);
        }

        function startAutoPlay() {
            if (slideTimer) clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, intervalTime);
            if (!reducedMotion) resetProgressBar();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        updateSlide(0);
        if (!reducedMotion) startAutoPlay();
    }

    // ==========================================
    // 4. FLOATING NAVBAR SCROLL EFFECT
    // ==========================================
    function initNavbar() {
        const nav = document.querySelector('.mc-nav');
        const navWrapper = document.querySelector('.mc-nav-wrapper');
        if (!nav) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                nav.classList.add('scrolled');
                if (navWrapper) navWrapper.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
                if (navWrapper) navWrapper.classList.remove('scrolled');
            }
        });

        // Mobile drawer toggling
        const toggleBtn = document.querySelector('.mc-mobile-toggle');
        const closeBtn = document.querySelector('.mc-mobile-close');
        const mobileMenu = document.querySelector('.mc-mobile-menu');

        if (toggleBtn && mobileMenu) {
            toggleBtn.addEventListener('click', () => {
                mobileMenu.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeBtn && mobileMenu) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        }
    }

    // ==========================================
    // 5. ANIMATED STATS COUNTER
    // ==========================================
    function initStatsCounter() {
        const statElements = document.querySelectorAll('.stat-number[data-target]');
        if (!statElements.length) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    let count = 0;
                    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1600;
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = duration ? Math.min(elapsed / duration, 1) : 1;
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentVal = Math.floor(easeOut * target);
                        el.textContent = `${currentVal}${suffix}`;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = `${target}${suffix}`;
                        }
                    }

                    requestAnimationFrame(updateCount);
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        statElements.forEach(el => observer.observe(el));
    }

    // ==========================================
    // 6. LIGHTBOX MODAL
    // ==========================================
    function initLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'mc-lightbox';
        lightbox.innerHTML = `
            <button class="mc-lightbox-close" aria-label="Close Lightbox">&times;</button>
            <div class="mc-lightbox-content">
                <img class="mc-lightbox-img" src="" alt="Enlarged view">
                <div class="mc-lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        const imgEl = lightbox.querySelector('.mc-lightbox-img');
        const captionEl = lightbox.querySelector('.mc-lightbox-caption');
        const closeBtn = lightbox.querySelector('.mc-lightbox-close');

        function openModal(src, caption) {
            imgEl.src = src;
            captionEl.textContent = caption || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closeModal);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeModal();
            }
        });

        // Attach to all elements with data-lightbox or relevant photos (excluding elements managed by GLightbox)
        document.addEventListener('click', (e) => {
            const card = e.target.closest('[data-lightbox], .portfolio-card, .bento-card, .gallery-item, .insta-box');
            if (card) {
                if (card.querySelector('.glightbox') || card.classList.contains('glightbox') || e.target.closest('.glightbox')) return;
                const img = card.querySelector('img');
                if (img) {
                    const caption = card.getAttribute('data-caption') || '';
                    openModal(img.src, caption);
                }
            }
        });
    }

    // ==========================================
    // 7. PORTFOLIO FILTER TABS
    // ==========================================
    function initPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn-luxury');
        const items = document.querySelectorAll('.gallery-item, .portfolio-filter-item');
        if (!filterButtons.length || !items.length) return;

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = '';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.96)';
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    function initPortfolioLightboxControls() {
        if (!document.querySelector('.glightbox')) return;

        document.addEventListener('click', (event) => {
            const control = event.target.closest('.glightbox-container .gnext, .glightbox-container .gprev');
            if (!control || !window.mcPortfolioLightbox) return;

            event.preventDefault();
            event.stopImmediatePropagation();

            if (control.classList.contains('gnext')) {
                window.mcPortfolioLightbox.nextSlide();
            } else {
                window.mcPortfolioLightbox.prevSlide();
            }
        }, true);
    }

    function initContactForm() {
        const form = document.getElementById('contact-form');
        const status = document.getElementById('contact-form-status');
        if (!form || !status) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            status.textContent = 'Online submission is not available yet. Your details have not been sent.';
        });
    }

    function hardenExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            link.rel = 'noopener noreferrer';
        });

        document.querySelectorAll('a[href="#"]').forEach((link) => {
            link.removeAttribute('href');
            link.classList.add('footer-placeholder-link');
            link.setAttribute('aria-disabled', 'true');
            link.setAttribute('title', 'This page is not available yet.');
        });
    }

    // ==========================================
    // INITIALIZATION ON DOM READY / IMMEDIATE
    // ==========================================
    function initApp() {
        initCustomCursor();
        initMagneticButtons();
        initHeroSlider();
        initNavbar();
        initStatsCounter();
        initLightbox();
        initPortfolioFilters();
        initPortfolioLightboxControls();
        initContactForm();
        hardenExternalLinks();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();
