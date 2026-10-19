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

    show(index, direction = 1) {
        if (!this.imgEl) return;
        // Slide transition: current image slides out, new one slides in from
        // the opposite side. direction = 1 -> next (slide left), -1 -> prev.
        const img = this.imgEl;
        const outX = direction > 0 ? '-30px' : '30px';
        const inX = direction > 0 ? '30px' : '-30px';

        img.style.transition = 'transform 0.22s ease, opacity 0.22s ease';
        img.style.transform = `translateX(${outX})`;
        img.style.opacity = '0';

        const swap = () => {
            img.src = this.images[index];
            // place new image on the entering side, then animate to center
            img.style.transition = 'none';
            img.style.transform = `translateX(${inX})`;
            img.style.opacity = '0';
            requestAnimationFrame(() => {
                img.style.transition = 'transform 0.26s ease, opacity 0.26s ease';
                img.style.transform = 'translateX(0)';
                img.style.opacity = '1';
            });
            if (this.counterEl) {
                this.counterEl.textContent = (index + 1) + ' / ' + this.images.length;
            }
            if (ImageSlider.activeLightbox === this) this._updateLightbox(direction);
        };
        setTimeout(swap, 180);
    }

    next() {
        this.index = (this.index + 1) % this.images.length;
        this.show(this.index, 1);
        this._resetTimer();
    }

    prev() {
        this.index = (this.index - 1 + this.images.length) % this.images.length;
        this.show(this.index, -1);
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
        const modalEl = document.getElementById('lightboxModal');
        if (!modalEl) return;
        // mark this slider as the one controlling the lightbox
        ImageSlider.activeLightbox = this;
        this.stop(); // pause autoplay while the user looks at the full image
        this._updateLightbox();
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

    _updateLightbox(direction = 0) {
        const lightboxImg = document.getElementById('lightboxImg');
        const counter = document.getElementById('lightboxCounter');
        const nav = document.getElementById('lightboxNav');
        if (lightboxImg) {
            if (direction !== 0) {
                // slide the big image in the same direction as the thumbnail
                const inX = direction > 0 ? '40px' : '-40px';
                lightboxImg.style.transition = 'none';
                lightboxImg.style.transform = `translateX(${inX})`;
                lightboxImg.style.opacity = '0';
                lightboxImg.src = this.images[this.index];
                requestAnimationFrame(() => {
                    lightboxImg.style.transition = 'transform 0.26s ease, opacity 0.26s ease';
                    lightboxImg.style.transform = 'translateX(0)';
                    lightboxImg.style.opacity = '1';
                });
            } else {
                lightboxImg.style.transition = 'none';
                lightboxImg.style.transform = 'translateX(0)';
                lightboxImg.style.opacity = '1';
                lightboxImg.src = this.images[this.index];
            }
        }
        if (counter) counter.textContent = (this.index + 1) + ' / ' + this.images.length;
        // only show the nav arrows when there is more than one image
        if (nav) nav.style.display = this.images.length > 1 ? '' : 'none';
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

// Tracks which slider currently owns the lightbox (for in-modal navigation)
ImageSlider.activeLightbox = null;

// Global functions for the lightbox arrows
function lightboxNext() { ImageSlider.activeLightbox && ImageSlider.activeLightbox.next(); }
function lightboxPrev() { ImageSlider.activeLightbox && ImageSlider.activeLightbox.prev(); }

// ============================================================
// SLIDER INSTANCES
// ============================================================
let ornaSlider, tamboradaSlider, tejaSlider, ventanaSlider, obrasSlider;

// Global functions for inline onclick buttons (kept for backward compatibility)
function ornaNext() { ornaSlider && ornaSlider.next(); }
function ornaPrev() { ornaSlider && ornaSlider.prev(); }
function tamboradaNext() { tamboradaSlider && tamboradaSlider.next(); }
function tamboradaPrev() { tamboradaSlider && tamboradaSlider.prev(); }
function tejaNext() { tejaSlider && tejaSlider.next(); }
function tejaPrev() { tejaSlider && tejaSlider.prev(); }
function ventanaNext() { ventanaSlider && ventanaSlider.next(); }
function ventanaPrev() { ventanaSlider && ventanaSlider.prev(); }
function sliderNext() { obrasSlider && obrasSlider.next(); }
function sliderPrev() { obrasSlider && obrasSlider.prev(); }
function sliderLightbox() { obrasSlider && obrasSlider.openLightbox(); }

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- AOS (Animate On Scroll) ---
    // Only enable the hide-before-animate CSS when AOS is actually available.
    // If the AOS CDN fails to load, we skip this and all [data-aos] elements
    // remain visible instead of being stuck at opacity:0.
    if (typeof AOS !== 'undefined') {
        document.documentElement.classList.add('aos-ready');
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
            'assets/images/orna 1.png','assets/images/orna 2.png','assets/images/orna 3.png',
            'assets/images/orna 4.png','assets/images/orna 5.png','assets/images/orna 6.png',
            'assets/images/orna 7.png','assets/images/orna 8.png','assets/images/orna 9.png',
            'assets/images/orna 10.png','assets/images/orna 11.png','assets/images/orna 12.png',
            'assets/images/orna 13.png','assets/images/orna 14.png','assets/images/orna 15.png',
            'assets/images/orna 16.png','assets/images/orna 17.png','assets/images/orna 18.png',
            'assets/images/orna 19.png','assets/images/orna 20.png','assets/images/orna 21.png',
            'assets/images/orna 22.png','assets/images/orna 23.png','assets/images/orna 24.png',
            'assets/images/orna 25.png','assets/images/orna 26.png','assets/images/orna 27.png'
        ],
        imgId: 'ornaImg',
        counterId: 'ornaCounter'
    });

    tamboradaSlider = new ImageSlider({
        images: [
            'assets/images/tamborada 1.png',
            'assets/images/tamborada 2.png',
            'assets/images/tamborada 3.png',
            'assets/images/tamborada 4.png',
            'assets/images/tamborada 5.png'
        ],
        imgId: 'tamboradaImg',
        counterId: 'tamboradaCounter'
    });

    ventanaSlider = new ImageSlider({
        images: [
            'assets/images/ventana 1.png','assets/images/ventana 2.png','assets/images/ventana 3.png',
            'assets/images/ventana 4.png','assets/images/ventana 5.png','assets/images/ventana 6.png',
            'assets/images/ventana 7.png','assets/images/ventana 8.png','assets/images/ventana 9.png',
            'assets/images/ventana 10.png','assets/images/ventana 11.png'
        ],
        imgId: 'ventanaImg',
        counterId: 'ventanaCounter'
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
            'assets/images/modelo 28.jpeg','assets/images/modelo 29.jpeg','assets/images/modelo 30.jpeg',
            'assets/images/modelo 31.jpeg','assets/images/modelo 32.jpeg','assets/images/modelo 33.jpeg',
            'assets/images/modelo 34.jpeg','assets/images/modelo 35.jpeg','assets/images/modelo 36.jpeg',
            'assets/images/modelo 37.jpeg','assets/images/modelo 38.jpeg','assets/images/modelo 39.jpeg'
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

    // --- Lightbox for plaqueta/bloquelon images (single image, no nav) ---
    document.querySelectorAll('[data-src]').forEach(img => {
        img.addEventListener('click', (e) => {
            const src = e.currentTarget.getAttribute('data-src');
            const lightboxImg = document.getElementById('lightboxImg');
            const nav = document.getElementById('lightboxNav');
            if (lightboxImg && src) {
                ImageSlider.activeLightbox = null; // standalone image, no slider
                if (nav) nav.style.display = 'none';
                lightboxImg.src = src;
                bootstrap.Modal.getOrCreateInstance(document.getElementById('lightboxModal')).show();
            }
        });
    });

    // --- Lightbox navigation & cleanup ---
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        // When the lightbox closes, resume autoplay of the slider that opened it
        lightboxModal.addEventListener('hidden.bs.modal', () => {
            if (ImageSlider.activeLightbox) {
                ImageSlider.activeLightbox.start();
                ImageSlider.activeLightbox = null;
            }
        });
        // Keyboard arrows navigate the active slider inside the lightbox
        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('show')) return;
            if (!ImageSlider.activeLightbox) return;
            if (e.key === 'ArrowRight') lightboxNext();
            else if (e.key === 'ArrowLeft') lightboxPrev();
        });
    }

});
