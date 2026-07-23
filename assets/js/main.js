/**
 * Construsoluciones del Meta — Main JavaScript
 * Refactored: Generic Slider class + form validation + lazy initialization
 */

'use strict';

// ============================================================
// SLIDER CLASS — Reusable slider component
// ============================================================
class ImageSlider {
    constructor({ images, imgId, counterId, interval = 3500, lightbox = true }) {
        this.images = images;
        this.index = 0;
        this.interval = interval;
        this.timer = null;
        this.lightbox = lightbox;

        this.imgEl = document.getElementById(imgId);
        this.counterEl = counterId ? document.getElementById(counterId) : null;

        if (!this.imgEl) return;

        this._bindLightbox();
        this._observe();
    }

    show(index) {
        if (!this.imgEl) return;
        this.imgEl.style.opacity = '0';
        setTimeout(() => {
            this.imgEl.src = this.images[index];
            this.imgEl.style.opacity = '1';
            if (this.counterEl) {
                this.counterEl.textContent = (index + 1) + ' / ' + this.images.length;
            }
        }, 200);
    }

    next() {
        this.index = (this.index + 1) % this.images.length;
        this.show(this.index);
        this._resetTimer();
    }

    prev() {
        this.index = (this.index - 1 + this.images.length) % this.images.length;
        this.show(this.index);
        this._resetTimer();
    }

    start() {
        if (this.timer) return;
        this.timer = setInterval(() => this.next(), this.interval);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }

    openLightbox() {
        const lightboxImg = document.getElementById('lightboxImg');
        if (lightboxImg) {
            lightboxImg.src = this.images[this.index];
            const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
            modal.show();
        }
    }

    _resetTimer() {
        this.stop();
        this.start();
    }

    _bindLightbox() {
        if (this.lightbox && this.imgEl) {
            this.imgEl.addEventListener('click', () => this.openLightbox());
        }
    }

    // Pause slider when not visible (saves CPU/battery)
    _observe() {
        if (!this.imgEl || !('IntersectionObserver' in window)) {
            this.start();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.start();
                } else {
                    this.stop();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.imgEl.closest('.card') || this.imgEl.parentElement);
    }
}

// ============================================================
// SLIDER INSTANCES
// ============================================================
let ornaSlider, tamboradaSlider, tejaSlider, obrasSlider;

// Global functions for inline onclick buttons (kept for backward compatibility)
function ornaNext() { ornaSlider && ornaSlider.next(); }
function ornaPrev() { ornaSlider && ornaSlider.prev(); }
function tamboradaNext() { tamboradaSlider && tamboradaSlider.next(); }
function tamboradaPrev() { tamboradaSlider && tamboradaSlider.prev(); }
function tejaNext() { tejaSlider && tejaSlider.next(); }
function tejaPrev() { tejaSlider && tejaSlider.prev(); }
function sliderNext() { obrasSlider && obrasSlider.next(); }
function sliderPrev() { obrasSlider && obrasSlider.prev(); }
function sliderLightbox() { obrasSlider && obrasSlider.openLightbox(); }

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- AOS (Animate On Scroll) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('mainNav');
    const backToTop = document.getElementById('backToTop');

    if (navbar && backToTop) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            navbar.classList.toggle('scrolled', scrollY > 50);
            backToTop.classList.toggle('visible', scrollY > 500);
        }, { passive: true });
    }

    // --- Close mobile menu on link click ---
    document.querySelectorAll('.nav-link, .navbar-brand').forEach(link => {
        link.addEventListener('click', () => {
            const navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse && navCollapse.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
            }
        });
    });

    // --- Initialize sliders ---
    ornaSlider = new ImageSlider({
        images: [
            'assets/images/orna 1.jpeg','assets/images/orna 2.jpeg','assets/images/orna 3.jpeg',
            'assets/images/orna 4.jpeg','assets/images/orna 5.jpeg','assets/images/orna 6.jpeg',
            'assets/images/orna 7.jpeg','assets/images/orna 8.jpeg','assets/images/orna 9.jpeg'
        ],
        imgId: 'ornaImg',
        counterId: 'ornaCounter'
    });

    tamboradaSlider = new ImageSlider({
        images: [
            'assets/images/tamborada 1.jpeg',
            'assets/images/tamborada 2.jpeg',
            'assets/images/tamborada 3.jpeg'
        ],
        imgId: 'tamboradaImg',
        counterId: 'tamboradaCounter'
    });

    tejaSlider = new ImageSlider({
        images: [
            'assets/images/teja 1.jpeg',
            'assets/images/teja 2.jpeg',
            'assets/images/teja 3.jpeg'
        ],
        imgId: 'tejaImg',
        counterId: 'tejaCounter'
    });

    obrasSlider = new ImageSlider({
        images: [
            'assets/images/modelo 1.jpeg','assets/images/modelo 2.jpeg','assets/images/modelo 3.jpeg',
            'assets/images/modelo 4.jpeg','assets/images/modelo 5.jpeg','assets/images/modelo 6.jpeg',
            'assets/images/modelo 7.jpeg','assets/images/modelo 8.jpeg','assets/images/modelo 9.jpeg',
            'assets/images/modelo 10.jpeg','assets/images/modelo 11.jpeg','assets/images/modelo 12.jpeg',
            'assets/images/modelo 13.jpeg','assets/images/modelo 14.jpeg','assets/images/modelo 15.jpeg',
            'assets/images/modelo 16.jpeg','assets/images/modelo 17.jpeg','assets/images/modelo 18.jpeg',
            'assets/images/modelo 19.jpeg','assets/images/modelo 20.jpeg','assets/images/modelo 21.jpeg',
            'assets/images/modelo 22.jpeg','assets/images/modelo 23.jpeg','assets/images/modelo 24.jpeg',
            'assets/images/modelo 25.jpeg','assets/images/modelo 26.jpeg','assets/images/modelo 27.jpeg',
            'assets/images/modelo 28.jpeg','assets/images/modelo 29.jpeg'
        ],
        imgId: 'sliderImg',
        counterId: 'obraCounter'
    });

    // --- Contact form handler — envía a WhatsApp ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            const nombre   = this.querySelector('#nombre').value.trim();
            const email    = this.querySelector('#email').value.trim();
            const telefono = this.querySelector('#telefono').value.trim();
            const modelo   = this.querySelector('#modelo').value;
            const mensaje  = this.querySelector('#mensaje').value.trim();

            // Validación
            let isValid = true;
            const fields = this.querySelectorAll('.form-control, .form-select');
            fields.forEach(f => f.classList.remove('is-invalid'));

            if (!nombre || nombre.length < 2) {
                this.querySelector('#nombre').classList.add('is-invalid');
                isValid = false;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                this.querySelector('#email').classList.add('is-invalid');
                isValid = false;
            }
            if (telefono && !/^[\d\s\+\-()]{7,20}$/.test(telefono)) {
                this.querySelector('#telefono').classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) {
                btn.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Revisa los campos marcados';
                btn.classList.replace('btn-primary', 'btn-danger');
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-danger', 'btn-primary');
                }, 2500);
                return;
            }

            // Sanitizar texto para URL
            const sanitize = (str) => str.replace(/[<>"'&]/g, '');

            const texto =
`Hola, me interesa una cotización 👋

*Nombre:* ${sanitize(nombre)}
*Email:* ${sanitize(email)}
*Teléfono:* ${sanitize(telefono)}
*Tipo de construcción:* ${sanitize(modelo) || 'No especificado'}
*Mensaje:* ${sanitize(mensaje) || 'Sin mensaje adicional'}`;

            const url = `https://wa.me/573143592700?text=${encodeURIComponent(texto)}`;

            btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>¡Redirigiendo a WhatsApp!';
            btn.classList.replace('btn-primary', 'btn-success');
            btn.disabled = true;

            setTimeout(() => {
                window.open(url, '_blank');
                btn.innerHTML = originalText;
                btn.classList.replace('btn-success', 'btn-primary');
                btn.disabled = false;
                this.reset();
            }, 1000);
        });
    }

    // --- Counter animation ---
    const animateCounter = (el) => {
        const text = el.textContent;
        const num = parseInt(text, 10);
        const suffix = text.replace(/[0-9]/g, '');
        const duration = 2000;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * num) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

    // --- Lightbox for plaqueta/bloquelon images ---
    document.querySelectorAll('[data-src]').forEach(img => {
        img.addEventListener('click', (e) => {
            const src = e.currentTarget.getAttribute('data-src');
            const lightboxImg = document.getElementById('lightboxImg');
            if (lightboxImg && src) {
                lightboxImg.src = src;
                const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
                modal.show();
            }
        });
    });

});
