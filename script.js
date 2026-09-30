const cursorGlow = document.querySelector('.cursor-glow');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const planRows = document.querySelectorAll('.plan-row');
const planLabel = document.querySelector('#plan-label');
const planName = document.querySelector('#plan-name');
const planCopy = document.querySelector('#plan-copy');
const planFeatures = document.querySelector('#plan-features');
const planImage = document.querySelector('#plan-image');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.carousel-dot');
const heroLabel = document.querySelector('#hero-slide-label');
const heroNoteName = document.querySelector('#hero-note-name');
const carousel = document.querySelector('.hero-carousel');
const carouselPause = document.querySelector('.carousel-pause');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
let heroSlideIndex = 0;
let carouselTimer;
let carouselPaused = false;

const heroSlideContent = [
  { label: '01 / Plan Tradicional', note: 'Tradicional' },
  { label: '02 / Plan Híbrido', note: 'Híbrido' },
  { label: '03 / Plan Integral 360°', note: 'Integral 360°' }
];

const planContent = {
  tradicional: {
    label: 'Paquete 1 / Base visible',
    name: 'Plan tradicional',
    copy: 'Presencia física para que tu negocio se vea, circule y abra conversaciones.',
    image: 'WhatsApp Image 2026-09-22 at 12.13.27 PM (1).jpeg',
    imageAlt: 'Plan tradicional de ClickDigital con tarjetas, volantes y pendón',
    features: ['1.000 tarjetas impresas', '1.000 volantes impresos', '1 pendón publicitario']
  },
  hibrido: {
    label: 'Paquete 2 / Pack Crecimiento',
    name: 'Plan Híbrido / Pack Crecimiento',
    copy: 'Contenido y pauta digital para convertir tus redes en un canal activo de crecimiento.',
    image: '2.jpeg',
    imageAlt: 'Plan Híbrido de ClickDigital: publicidad física y redes sociales',
    features: ['Optimización de biografía, enlaces y botón de WhatsApp en Facebook e Instagram', '8 a 12 piezas gráficas mensuales: posts, reels e historias', 'Configuración y gestión de 1 campaña de Meta Ads', 'El cliente define el presupuesto de pauta']
  },
  integral: {
    label: 'Paquete 3 / Pack Dominio Digital',
    name: 'Plan Integral 360°',
    copy: 'Una presencia completa: material impreso, redes, campañas y una web lista para convertir.',
    image: '3.jpeg',
    imageAlt: 'Plan Integral 360 de ClickDigital con web, redes e impresos',
    features: ['Todo el material impreso del Plan 1: 1.000 tarjetas, 1.000 volantes y 1 pendón', '12 a 16 contenidos mensuales + gestión de 2 campañas de Meta Ads', 'Landing Page o sitio One-Page responsive', 'Secciones: Inicio, Servicios/Productos, Nosotros y Testimonios', 'Botón flotante de WhatsApp y formulario de contacto', 'Dominio, hosting básico y certificado SSL']
  }
};

if (cursorGlow) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

function showHeroSlide(index) {
  heroSlideIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === heroSlideIndex));
  heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === heroSlideIndex;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
  heroLabel.textContent = heroSlideContent[heroSlideIndex].label;
  heroNoteName.textContent = heroSlideContent[heroSlideIndex].note;
}

function restartCarousel() {
  window.clearInterval(carouselTimer);
  if (!carouselPaused) {
    carouselTimer = window.setInterval(() => showHeroSlide(heroSlideIndex + 1), 5500);
  }
}

carouselPause?.addEventListener('click', () => {
  carouselPaused = !carouselPaused;
  carouselPause.setAttribute('aria-pressed', String(carouselPaused));
  carouselPause.setAttribute('aria-label', carouselPaused ? 'Reanudar carrusel' : 'Pausar carrusel');
  carouselPause.textContent = carouselPaused ? '▶' : 'Ⅱ';
  restartCarousel();
});

carousel?.addEventListener('focusin', () => {
  if (!carouselPaused) window.clearInterval(carouselTimer);
});

carousel?.addEventListener('focusout', (event) => {
  if (!carousel.contains(event.relatedTarget) && !carouselPaused) restartCarousel();
});

document.querySelector('.carousel-prev')?.addEventListener('click', () => {
  showHeroSlide(heroSlideIndex - 1);
  restartCarousel();
});

document.querySelector('.carousel-next')?.addEventListener('click', () => {
  showHeroSlide(heroSlideIndex + 1);
  restartCarousel();
});

heroDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showHeroSlide(Number(dot.dataset.slideTo));
    restartCarousel();
  });
});

restartCarousel();

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('open');
  mainNav.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('open');
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

planRows.forEach((row) => {
  row.addEventListener('click', () => {
    planRows.forEach((item) => item.classList.remove('active'));
    row.classList.add('active');
    const selectedPlan = planContent[row.dataset.plan];
    planLabel.textContent = selectedPlan.label;
    planName.textContent = selectedPlan.name;
    planCopy.textContent = selectedPlan.copy;
    planImage.src = selectedPlan.image;
    planImage.alt = selectedPlan.imageAlt;
    planFeatures.innerHTML = selectedPlan.features.map((feature) => `<li>${feature}</li>`).join('');
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Consulta de ${formData.get('name')}`);
  const body = encodeURIComponent(`Nombre: ${formData.get('name')}\nCorreo: ${formData.get('email')}\n\nMensaje:\n${formData.get('message')}`);
  formStatus.textContent = 'Abriendo tu correo para enviar la consulta...';
  window.location.href = `mailto:clickdigital@atomicmail.io?subject=${subject}&body=${body}`;
});

const serviceVideo = document.querySelector('#service-video');
const soundBtn = document.querySelector('#video-sound-btn');
soundBtn?.addEventListener('click', () => {
  const isMuted = serviceVideo.muted;
  serviceVideo.muted = !isMuted;
  soundBtn.setAttribute('aria-pressed', String(isMuted));
  soundBtn.setAttribute('aria-label', isMuted ? 'Silenciar video' : 'Activar sonido');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'reveal .8s forwards';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .plan-row, .gallery-item').forEach((element) => revealObserver.observe(element));