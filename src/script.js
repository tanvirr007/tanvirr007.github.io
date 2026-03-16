/**
 * script.js — Tanvir Hasan Portfolio
 * =====================================================
 * All content is injected dynamically from the DATA object below.
 * Sections rendered:
 *   - Hero, About, Projects, Experience, Contact
 *
 * Features:
 *   - Dark / Light mode toggle (persisted via localStorage)
 *   - Active nav-link highlight on scroll
 *   - Navbar background on scroll
 *   - Scroll-reveal animations (IntersectionObserver)
 *   - Mobile navigation hamburger
 *   - Floating hero particles
 *   - Footer year auto-update
 * ===================================================== */

'use strict';

/* ============================================================
   DATA — Single source of truth (derived from JSON)
   ============================================================ */
const DATA = {
  personal_identity: {
    full_name: "Tanvir Hasan",
    tagline: "Just a random guy on the internet"
  },

  about_me: {
    long_bio: "I am a hobbyist Android developer from Bangladesh, currently studying at university and working as an accountant. I enjoy building websites and learning new web technologies. Alongside my studies, I manage my family business, which gives me real-world experience in handling responsibilities and solving practical problems. I am always excited to learn new things and take on new projects."
  },



  projects: [
    {
      name: "BMI Calculator",
      type: "Health Utility Tool",
      icon: "fas fa-heartbeat",
      description: "A user-friendly BMI calculator with health tips, downloadable reports, and PWA support for offline use",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://tanvirr007.github.io/bmi-calculator"
    },
    {
      name: "GTA VI Countdown",
      type: "Web Project",
      icon: "fas fa-clock",
      description: "A sleek webpage with a real-time countdown to the anticipated GTA VI release",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://tanvirr007.github.io/gta-vi-countdown"
    },
    {
      name: "Stock Tracker",
      type: "M/S Bhai Bhai Traders",
      icon: "fas fa-warehouse",
      description: "An inventory management app to track real-time stock, audit items, and generate detailed sales reports with customizable options",
      technologies: ["React", "Vite", "Node.js", "Express"],
      link: "https://stock.tanvir.info/"
    },
    {
      name: "Tic Tac Toe",
      type: "Web Game",
      icon: "fas fa-gamepad",
      description: "A simple browser-based board game for two players",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://tanvir-projects-archive.github.io/tic-tac-toe/"
    }
  ],



  experience: [
    {
      icon: "fas fa-store",
      iconBg: "rgba(52, 211, 153, 0.12)",
      iconColor: "#34d399",
      role: "Accountant",
      org: "M/S Bhai Bhai Traders",
      responsibilities: [
        "Maintain inventory stock levels",
        "Monitor daily shop operations and workflow",
        "Track and reconcile daily income and expenses",
      ]
    },
    {
      icon: "fas fa-laptop-code",
      iconBg: "rgba(99, 120, 255, 0.12)",
      iconColor: "#6378ff",
      role: "Contributor",
      org: "Open Source Community",
      responsibilities: [
        "Build web projects",
        "Build automation tools with Python and Shell",
        "Review issues and collaborate with contributors in open-source repositories",
      ]
    },
    {
      icon: "fas fa-mobile-alt",
      iconBg: "rgba(255, 159, 67, 0.12)",
      iconColor: "#ff9f43",
      role: "Developer",
      org: "Custom Rom Community",
      responsibilities: [
        "Maintained EuclidOS (2024–2025)",
        "Maintained Lunaris AOSP (2025–2026)",
        "Maintained Project Matrixx (2024–2025)",
        "Founder and the maintainer of the build info bot for the EuclidOS and Project Matrixx communities"
      ]
    }
  ],

  contact: {
    links: [
      {
        icon: "fab fa-github",
        iconBg: "rgba(99, 120, 255, 0.12)",
        iconColor: "#6378ff",
        label: "GitHub",
        href: "https://github.com/tanvirr007"
      },
      {
        icon: "fas fa-envelope",
        iconBg: "rgba(52, 211, 153, 0.12)",
        iconColor: "#34d399",
        label: "Email",
        href: "mailto:tanvirhasan2005@proton.me"
      }
    ]
  }
};

/* ============================================================
   UTILITY HELPERS
   ============================================================ */

/** Create an HTML element with optional attributes and innerHTML */
function el(tag, attrs = {}, innerHTML = '') {
  const elem = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') elem.className = v;
    else elem.setAttribute(k, v);
  });
  if (innerHTML) elem.innerHTML = innerHTML;
  return elem;
}

/** Generate a random float between min and max */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ============================================================
   DARK / LIGHT MODE TOGGLE
   ============================================================ */
(function initTheme() {
  const saved = localStorage.getItem('th-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
})();

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('th-theme', next);
  updateThemeIcon(next);
});

/* ============================================================
   HERO SECTION RENDER
   ============================================================ */
function renderHero() {
  const d = DATA.personal_identity;

  // Name with gradient highlight on last name
  const [first, ...rest] = d.full_name.split(' ');
  document.getElementById('heroName').innerHTML =
    `${first} <span class="hero-name-highlight">${rest.join(' ')}</span>`;

  document.getElementById('heroTagline').textContent = d.tagline;
}

/* ============================================================
   ABOUT SECTION RENDER
   ============================================================ */
function renderAbout() {
  const d = DATA.about_me;

  // Summary and bio
  document.getElementById('aboutBio').textContent = d.long_bio;
}



/* ============================================================
   PROJECTS SECTION RENDER
   ============================================================ */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');

  DATA.projects.forEach(proj => {
    const card = el('div', { class: 'project-card reveal' });

    const header = el('div', { class: 'project-card-header' });
    const iconBox = el('div', { class: 'project-icon' },
      `<i class="${proj.icon}" aria-hidden="true"></i>`
    );
    header.appendChild(iconBox);

    const name = el('h3', { class: 'project-name' }, proj.name);
    const type = el('div', { class: 'project-type' }, proj.type);
    const desc = el('p', { class: 'project-desc' }, proj.description);

    const techs = el('div', { class: 'project-techs' });
    (proj.technologies || []).forEach(t => {
      techs.appendChild(el('span', { class: 'tech-tag' }, t));
    });

    const links = el('div', { class: 'project-links' });
    const ghLink = el('a', {
      class: 'project-link',
      href: proj.link || 'https://github.com/tanvirr007',
      target: '_blank',
      rel: 'noopener noreferrer'
    }, '<i class="fas fa-globe" aria-hidden="true"></i> Live Preview'); links.appendChild(ghLink);

    card.appendChild(header);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(desc);
    card.appendChild(techs);
    card.appendChild(links);
    grid.appendChild(card);
  });
}



/* ============================================================
   EXPERIENCE SECTION RENDER
   ============================================================ */
function renderExperience() {
  const grid = document.getElementById('experienceGrid');

  DATA.experience.forEach(exp => {
    const card = el('div', { class: 'exp-card reveal' });

    const top = el('div', { class: 'exp-card-top' });
    const iconBox = el('div', { class: 'exp-icon-box' },
      `<i class="${exp.icon}" aria-hidden="true"></i>`
    );
    iconBox.style.background = exp.iconBg;
    iconBox.style.color = exp.iconColor;

    const meta = el('div', {});
    meta.appendChild(el('div', { class: 'exp-role' }, exp.role));
    meta.appendChild(el('div', { class: 'exp-org' }, exp.org));

    top.appendChild(iconBox);
    top.appendChild(meta);

    const ul = el('ul', { class: 'exp-responsibilities' });
    exp.responsibilities.forEach(r => {
      ul.appendChild(el('li', {}, r));
    });

    card.appendChild(top);
    card.appendChild(ul);
    grid.appendChild(card);
  });
}



/* ============================================================
   CONTACT SECTION RENDER
   ============================================================ */
function renderContact() {
  const d = DATA.contact;
  const content = document.getElementById('contactContent');



  // Right: links
  const linksDiv = el('div', { class: 'contact-links' });
  d.links.forEach(link => {
    const item = link.href
      ? el('a', {
        class: 'contact-link-item reveal',
        href: link.href,
        target: '_blank',
        rel: 'noopener noreferrer'
      })
      : el('div', { class: 'contact-link-item reveal' });

    const iconBox = el('div', { class: 'contact-link-icon' },
      `<i class="${link.icon}" aria-hidden="true"></i>`
    );
    iconBox.style.background = link.iconBg;
    iconBox.style.color = link.iconColor;

    const textBox = el('div', {});
    textBox.appendChild(el('span', { class: 'contact-link-label' }, link.label));

    item.appendChild(iconBox);
    item.appendChild(textBox);
    linksDiv.appendChild(item);
  });

  content.appendChild(linksDiv);
}

/* ============================================================
   FOOTER — YEAR
   ============================================================ */
function renderFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   HERO PARTICLES
   ============================================================ */
function spawnParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const colors = ['#6378ff', '#a78bfa', '#22d3ee', '#34d399'];
  const count = 16;

  for (let i = 0; i < count; i++) {
    const size = rand(4, 14);
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${rand(0, 100)}%;
      top: ${rand(20, 100)}%;
      background: ${colors[Math.floor(rand(0, colors.length))]};
      animation-duration: ${rand(12, 28)}s;
      animation-delay: ${rand(0, 15)}s;
    `;
    container.appendChild(particle);
  }
}

/* ============================================================
   NAVBAR — SCROLL & ACTIVE LINK
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll handler
  const onScroll = () => {
    const scrollY = window.scrollY;

    // Navbar shadow
    if (scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (scrollY >= top) current = sec.getAttribute('id');
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  toggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });
}



/* ============================================================
   SCROLL-REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Initial elements already in DOM
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Also expose observer so dynamically added .reveal elements can be observed
  window._revealObserver = observer;
}

/** Re-observe all .reveal elements (call after dynamic rendering) */
function observeRevealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    window._revealObserver?.observe(el);
  });
}

/* ============================================================
   MAIN INIT — Render all sections then wire up interactions
   ============================================================ */
function init() {
  // 1. Render all content sections
  renderHero();
  renderAbout();
  renderProjects();
  renderExperience();
  renderContact();
  renderFooterYear();

  // 2. Hero particles
  spawnParticles();

  // 3. Scroll reveal observer
  initScrollReveal();
  observeRevealElements();

  // 4. UI interactions
  initNavbar();
  initMobileNav();
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
