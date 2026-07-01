/**
 * script.js — Portfolio JavaScript
 * ====================================================
 * Controls: Navigation, theme toggle, data rendering,
 * scroll animations, skill bars, modal, contact form.
 * No external dependencies — pure ES6+.
 * ====================================================
 */

'use strict';

/* ─────────────────────────────────────────────────────
   SKILL ICON MAP
   Maps skill names to emoji icons
───────────────────────────────────────────────────── */
const SKILL_ICONS = {
  python:     '🐍',
  database:   '🗃️',
  chart:      '📊',
  table:      '📋',
  analytics:  '📈',
  brain:      '🧠',
  web:        '🌐',
  html:       '🖥️',
  js:         '⚡',
  git:        '🔧',
  chart2:     '📉',
  stats:      '📐',
};

/* ─────────────────────────────────────────────────────
   CERT ICON MAP
───────────────────────────────────────────────────── */
const CERT_ICONS = {
  google:    '🇬',
  microsoft: '🪟',
  python:    '🐍',
  sql:       '🗃️',
  ml:        '🤖',
};

/* ─────────────────────────────────────────────────────
   ACHIEVEMENT ICON MAP
───────────────────────────────────────────────────── */
const ACHIEVEMENT_ICONS = {
  trophy: '🏆',
  medal:  '🥇',
  star:   '⭐',
};

/* ─────────────────────────────────────────────────────
   DATA LOADING
   Fetches JSON data files. Falls back to inline defaults
   if fetch fails (e.g. opened directly as file://).
───────────────────────────────────────────────────── */

/**
 * Loads a JSON file with fetch. Returns null on error.
 * @param {string} url
 */
async function loadJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Could not load ${url}:`, err.message);
    return null;
  }
}

/* ─────────────────────────────────────────────────────
   THEME TOGGLE (Dark / Light)
───────────────────────────────────────────────────── */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;

  // Read persisted preference
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  toggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function applyTheme(theme) {
  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  if (toggle) toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

/* ─────────────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────────────── */
function initNavigation() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('navHamburger');
  const drawer     = document.getElementById('navDrawer');
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');

  /* ── Scroll: add glass effect + active link ── */
  function onScroll() {
    // Navbar glass on scroll
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSection = '';
    sections.forEach(sec => {
      const offset = sec.offsetTop - 100;
      if (window.scrollY >= offset) {
        currentSection = sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── Hamburger toggle ── */
  hamburger?.addEventListener('click', () => {
    const isOpen = drawer?.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* ── Close drawer on link click ── */
  document.querySelectorAll('.nav-drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer?.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Close drawer on outside click ── */
  document.addEventListener('click', (e) => {
    if (!drawer?.contains(e.target) && !hamburger?.contains(e.target)) {
      drawer?.classList.remove('open');
      hamburger?.classList.remove('open');
    }
  });
}

/* ─────────────────────────────────────────────────────
   BACK TO TOP BUTTON
───────────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn?.classList.add('visible');
    } else {
      btn?.classList.remove('visible');
    }
  }, { passive: true });

  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────────────
   SCROLL REVEAL ANIMATION
   Uses IntersectionObserver for performance.
───────────────────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Animate skill bars when skills section visible
          if (entry.target.classList.contains('skill-card')) {
            animateSkillBar(entry.target);
          }
          observer.unobserve(entry.target); // animate once only
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────
   SKILL BAR ANIMATION
───────────────────────────────────────────────────── */
function animateSkillBar(card) {
  const fill    = card.querySelector('.skill-bar-fill');
  const percent = fill?.getAttribute('data-percent');
  if (fill && percent) {
    // Small delay so the reveal animation plays first
    setTimeout(() => { fill.style.width = percent + '%'; }, 100);
  }
}

/* ─────────────────────────────────────────────────────
   RENDER: SKILLS SECTION
───────────────────────────────────────────────────── */
function renderSkills(skills) {
  const grid = document.getElementById('skillsGrid');
  if (!grid || !skills) return;

  grid.innerHTML = skills.map((skill, i) => `
    <div
      class="glass-card skill-card reveal delay-${Math.min(i % 4 + 1, 5)}"
      data-category="${skill.category}"
      role="listitem"
      aria-label="${skill.name}: ${skill.levelPercent}%"
    >
      <div class="skill-header">
        <div class="skill-name-group">
          <div class="skill-icon" aria-hidden="true">${SKILL_ICONS[skill.icon] || '🔹'}</div>
          <div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-category">${skill.category}</div>
          </div>
        </div>
        <span class="skill-pct">${skill.levelPercent}%</span>
      </div>
      <div class="skill-bar-track" role="progressbar" aria-valuenow="${skill.levelPercent}" aria-valuemin="0" aria-valuemax="100" aria-label="${skill.name} proficiency">
        <div class="skill-bar-fill" data-percent="${skill.levelPercent}" style="width:0%"></div>
      </div>
      <p class="skill-desc">${skill.description}</p>
    </div>
  `).join('');

  // Re-observe newly added skill cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animateSkillBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  grid.querySelectorAll('.skill-card').forEach(card => observer.observe(card));

  // Skills filter tabs
  initSkillsFilter(skills);
}

/* Skills category filter */
function initSkillsFilter(skills) {
  const tabs = document.querySelectorAll('.skills-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      const cards = document.querySelectorAll('.skill-card');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.style.display = show ? '' : 'none';
        // Re-animate if now visible
        if (show && !card.classList.contains('visible')) {
          card.classList.add('visible');
          animateSkillBar(card);
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────────────
   RENDER: PROJECTS SECTION
   Generates project cards with hover overlay
───────────────────────────────────────────────────── */
function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !projects) return;

  const placeholderEmojis = ['📊','🤖','💰','👥','🛒','🗃️'];

  grid.innerHTML = projects.map((proj, i) => `
    <article class="glass-card project-card reveal delay-${Math.min(i % 3 + 1, 5)}" aria-labelledby="proj-title-${proj.id}">
      <!-- Thumbnail -->
      <div class="project-thumbnail">
        <img
          src="${proj.image}"
          alt="${proj.title} project screenshot"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <!-- Placeholder shown when image missing -->
        <div class="project-thumbnail-placeholder" style="display:none; background: linear-gradient(135deg, ${proj.color}22, ${proj.color}08);">
          <span style="font-size:3.5rem;">${placeholderEmojis[i] || '📁'}</span>
        </div>
        <!-- Hover overlay with quick action buttons -->
        <div class="project-overlay" aria-hidden="true">
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer"
             class="btn btn-secondary btn-sm" tabindex="-1" aria-label="View ${proj.title} on GitHub">
            🐙 GitHub
          </a>
          <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer"
             class="btn btn-primary btn-sm" tabindex="-1" aria-label="View live demo of ${proj.title}">
            🚀 Demo
          </a>
        </div>
      </div>

      <!-- Card body -->
      <div class="project-body">
        <div class="project-color-bar" style="background:${proj.color};" aria-hidden="true"></div>
        <h3 class="project-title" id="proj-title-${proj.id}">${proj.title}</h3>
        <p class="project-subtitle">${proj.subtitle}</p>
        <p class="project-desc">${proj.shortDesc}</p>

        <!-- Key features -->
        <ul class="project-features" aria-label="Key features">
          ${proj.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
        </ul>

        <!-- Tech stack badges -->
        <div class="tech-stack" aria-label="Technologies used">
          ${proj.techStack.map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>

        <!-- Links -->
        <div class="project-links">
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer"
             class="btn btn-outline btn-sm" aria-label="View source code for ${proj.title} on GitHub">
            🐙 Code
          </a>
          <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer"
             class="btn btn-secondary btn-sm" aria-label="View live demo of ${proj.title}">
            ↗ Demo
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/* ─────────────────────────────────────────────────────
   RENDER: EXPERIENCE SECTION
───────────────────────────────────────────────────── */
function renderExperience(data) {
  // Internships
  const expGrid = document.getElementById('experienceGrid');
  if (expGrid && data.experience) {
    expGrid.innerHTML = data.experience.map((exp, i) => `
      <div class="glass-card exp-card reveal delay-${i + 1}">
        <div class="exp-header">
          <div>
            <div class="exp-title">${exp.role}</div>
            <div class="exp-company" style="color:${exp.color}">${exp.company}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.25rem;">📍 ${exp.location}</div>
          </div>
          <span class="exp-duration">${exp.duration}</span>
        </div>
        <ul class="exp-responsibilities" aria-label="Responsibilities">
          ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // Certifications
  const certsGrid = document.getElementById('certsGrid');
  if (certsGrid && data.certifications) {
    certsGrid.innerHTML = data.certifications.map((cert, i) => `
      <div class="glass-card cert-card reveal delay-${i % 3 + 1}">
        <div class="cert-icon" style="background:${cert.color}18; border-color:${cert.color}30;" aria-hidden="true">
          ${CERT_ICONS[cert.icon] || '📜'}
        </div>
        <div>
          <div class="cert-name">${cert.name}</div>
          <div class="cert-org">${cert.org}</div>
          <div class="cert-date">Issued: ${cert.date}</div>
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer"
             class="cert-link" aria-label="View ${cert.name} credential">
            🔗 View Credential ↗
          </a>
        </div>
      </div>
    `).join('');
  }

  // Achievements
  const achievementsGrid = document.getElementById('achievementsGrid');
  if (achievementsGrid && data.achievements) {
    achievementsGrid.innerHTML = data.achievements.map((ach, i) => `
      <div class="glass-card achievement-card reveal delay-${i + 1}">
        <span class="achievement-icon" aria-hidden="true">${ACHIEVEMENT_ICONS[ach.icon] || '⭐'}</span>
        <div class="achievement-title">${ach.title}</div>
        <div class="achievement-org">${ach.org}</div>
        <p class="achievement-desc">${ach.description}</p>
      </div>
    `).join('');
  }
}

/* ─────────────────────────────────────────────────────
   RENDER: DASHBOARD GALLERY + MODAL
───────────────────────────────────────────────────── */
function renderDashboards(dashboards) {
  const grid = document.getElementById('dashboardGrid');
  if (!grid || !dashboards) return;

  const toolEmojis = { 'Power BI': '📊', 'Excel': '📋', 'Python / Plotly': '🐍', default: '📈' };

  grid.innerHTML = dashboards.map((db, i) => `
    <div class="dashboard-card glass-card reveal delay-${i % 4 + 1}"
         data-id="${db.id}"
         role="button"
         tabindex="0"
         aria-label="Open ${db.title} dashboard preview"
         style="cursor:pointer;">
      <div class="dashboard-thumb">
        <img
          src="${db.image}"
          alt="${db.title} dashboard thumbnail"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="dashboard-thumb-placeholder" style="display:none; background: linear-gradient(135deg, ${db.color}22, ${db.color}08);">
          <span>${toolEmojis[db.tool] || toolEmojis.default}</span>
          <span>${db.tool}</span>
        </div>
        <div class="dashboard-overlay" aria-hidden="true">
          <span class="view-icon">🔍</span>
        </div>
      </div>
      <div class="dashboard-info">
        <div class="dashboard-title">${db.title}</div>
        <span class="dashboard-tool">${db.tool}</span>
      </div>
    </div>
  `).join('');

  // Attach click listeners for modal
  grid.querySelectorAll('.dashboard-card').forEach(card => {
    const openModal = () => {
      const id = parseInt(card.getAttribute('data-id'));
      const db = dashboards.find(d => d.id === id);
      if (db) showDashboardModal(db);
    };
    card.addEventListener('click', openModal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
    });
  });
}

/* Modal logic */
function showDashboardModal(db) {
  const overlay   = document.getElementById('dashboardModal');
  const title     = document.getElementById('modalTitle');
  const desc      = document.getElementById('modalDesc');
  const imgCont   = document.getElementById('modalImgContainer');
  const closeBtn  = document.getElementById('modalClose');

  if (!overlay) return;

  // Populate content
  title.textContent = db.title;
  desc.textContent  = db.description;

  // Try to show image, fall back to placeholder
  imgCont.innerHTML = `
    <img
      src="${db.image}"
      alt="${db.title} dashboard full preview"
      class="modal-img"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    />
    <div class="modal-img-placeholder" style="display:none;">
      <span style="font-size:3rem;">📊</span>
      <span style="font-size:0.9rem; color:var(--text-muted);">${db.title}</span>
    </div>
  `;

  // Open modal
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus management
  setTimeout(() => closeBtn?.focus(), 50);

  // Close handlers
  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal, { once: true });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  }, { once: true });

  // Keyboard: Escape to close, trap focus inside modal
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', keyHandler);
    }
  };
  document.addEventListener('keydown', keyHandler);
}

/* ─────────────────────────────────────────────────────
   RENDER: GITHUB SECTION
───────────────────────────────────────────────────── */
function renderGitHub(data) {
  const gh = data.github;
  if (!gh) return;

  // Profile header
  const profileHeader = document.getElementById('githubProfileHeader');
  if (profileHeader) {
    profileHeader.innerHTML = `
      <div class="github-profile-header reveal">
        <img
          src="${gh.avatarUrl}"
          alt="${gh.username} GitHub avatar"
          class="github-avatar"
          onerror="this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><text y=\\'.9em\\' font-size=\\'90\\'>👩‍💻</text></svg>'"
        />
        <div>
          <div class="github-username">@${gh.username}</div>
          <p class="github-bio">${gh.bio}</p>
          <a href="${gh.profileUrl}" target="_blank" rel="noopener noreferrer"
             class="btn btn-outline btn-sm github-profile-link" aria-label="View GitHub profile">
            🐙 View GitHub Profile ↗
          </a>
        </div>
      </div>
    `;
  }

  // Stats grid
  const statsGrid = document.getElementById('githubStatsGrid');
  if (statsGrid && gh.stats) {
    const stats = [
      { label: 'Public Repos',  value: gh.stats.repos,    icon: '📁' },
      { label: 'Total Commits', value: gh.stats.commits,  icon: '✅' },
      { label: 'GitHub Stars',  value: gh.stats.stars,    icon: '⭐' },
      { label: 'Followers',     value: gh.stats.followers, icon: '👥' },
    ];
    statsGrid.innerHTML = stats.map((s, i) => `
      <div class="glass-card github-stat-card reveal delay-${i + 1}">
        <span style="font-size:1.5rem;" aria-hidden="true">${s.icon}</span>
        <span class="github-stat-num">${s.value}+</span>
        <span class="github-stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  // Language bar
  const langSection = document.getElementById('githubLanguages');
  if (langSection && gh.topLanguages) {
    langSection.innerHTML = `
      <h3 style="font-size:0.88rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:1rem;">Top Languages</h3>
      <div class="github-lang-bar" role="group" aria-label="Top programming languages">
        ${gh.topLanguages.map(l => `
          <div class="github-lang-segment"
               style="width:${l.percent}%; background:${l.color};"
               title="${l.name}: ${l.percent}%"
               aria-label="${l.name} ${l.percent}%">
          </div>
        `).join('')}
      </div>
      <div class="github-lang-legend">
        ${gh.topLanguages.map(l => `
          <div class="lang-legend-item">
            <span class="lang-dot" style="background:${l.color};" aria-hidden="true"></span>
            <span class="lang-name">${l.name}</span>
            <span class="lang-pct">${l.percent}%</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Recent repos
  const repoList = document.getElementById('repoList');
  if (repoList && gh.recentRepos) {
    repoList.innerHTML = gh.recentRepos.map((repo, i) => `
      <div class="glass-card repo-card reveal delay-${i % 4 + 1}">
        <a href="${repo.url}" target="_blank" rel="noopener noreferrer"
           class="repo-name" aria-label="View ${repo.name} repository">
          📁 ${repo.name}
        </a>
        <p class="repo-desc">${repo.description}</p>
        <div class="repo-meta">
          <span class="repo-lang">🔵 ${repo.language}</span>
          <span class="repo-stars">⭐ ${repo.stars}</span>
        </div>
      </div>
    `).join('');
  }
}

/* ─────────────────────────────────────────────────────
   CONTACT FORM VALIDATION + SUBMISSION
───────────────────────────────────────────────────── */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const nameInput  = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const msgInput   = document.getElementById('contactMessage');
  const submitBtn  = document.getElementById('formSubmitBtn');
  const btnText    = document.getElementById('submitBtnText');
  const spinner    = document.getElementById('submitSpinner');
  const success    = document.getElementById('formSuccess');

  if (!form) return;

  /**
   * Show/hide error for a field.
   * @param {HTMLElement} input
   * @param {string} errorId
   * @param {boolean} isValid
   */
  function setFieldValidity(input, errorId, isValid) {
    const errorEl = document.getElementById(errorId);
    if (isValid) {
      input.classList.remove('error');
      errorEl?.classList.remove('visible');
      input.removeAttribute('aria-invalid');
    } else {
      input.classList.add('error');
      errorEl?.classList.add('visible');
      input.setAttribute('aria-invalid', 'true');
    }
  }

  /** Validates the entire form, returns true if valid */
  function validateForm() {
    let valid = true;

    // Name
    const nameOk = nameInput?.value.trim().length >= 2;
    setFieldValidity(nameInput, 'nameError', nameOk);
    if (!nameOk) valid = false;

    // Email
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput?.value.trim());
    setFieldValidity(emailInput, 'emailError', emailOk);
    if (!emailOk) valid = false;

    // Message
    const msgOk = msgInput?.value.trim().length >= 10;
    setFieldValidity(msgInput, 'messageError', msgOk);
    if (!msgOk) valid = false;

    return valid;
  }

  // Real-time validation on blur
  nameInput?.addEventListener('blur',  () => setFieldValidity(nameInput,  'nameError',    nameInput.value.trim().length >= 2));
  emailInput?.addEventListener('blur', () => setFieldValidity(emailInput, 'emailError',   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())));
  msgInput?.addEventListener('blur',   () => setFieldValidity(msgInput,   'messageError', msgInput.value.trim().length >= 10));

  /* ── Form submit handler ──
     This submits to Formspree by default.
     Replace the form's action attribute with your backend URL to switch.
  */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validateForm()) {
      // Focus first error field
      form.querySelector('.error')?.focus();
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    spinner.style.display = 'inline-block';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // Success
        form.reset();
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 6000);
      } else {
        // Server error
        const data = await res.json().catch(() => ({}));
        const errMsg = data.errors?.map(e => e.message).join(', ') || 'Submission failed. Please try emailing directly.';
        alert(errMsg);
      }
    } catch (_err) {
      alert('Network error. Please try emailing me directly at your.email@example.com');
    } finally {
      // Reset button
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message 🚀';
      spinner.style.display = 'none';
    }
  });
}

/* ─────────────────────────────────────────────────────
   HERO: TYPED TEXT EFFECT
   Cycles through role titles in hero section
───────────────────────────────────────────────────── */
function initTypedEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const titles = [
    '📊 Recent CS Graduate & Data Analyst',
    '🐍 Python & SQL Developer',
    '🤖 Machine Learning Enthusiast',
    '📈 Power BI Dashboard Creator',
  ];

  let titleIdx = 0;
  let charIdx  = 0;
  let isDeleting = false;
  let baseText = ''; // text shown while typing

  function type() {
    const target = titles[titleIdx];

    if (!isDeleting) {
      baseText = target.substring(0, charIdx + 1);
      charIdx++;
    } else {
      baseText = target.substring(0, charIdx - 1);
      charIdx--;
    }

    heroTitle.textContent = baseText;

    let delay = isDeleting ? 50 : 80;

    if (!isDeleting && charIdx === target.length) {
      // Pause at end before deleting
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  // Start after a short delay so entrance animation runs first
  setTimeout(type, 1400);
}

/* ─────────────────────────────────────────────────────
   COUNTER ANIMATION (for stat numbers)
───────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current + (progress < 1 ? '' : '+');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* Observe stat numbers and animate when visible */
function initCounters() {
  const counters = document.querySelectorAll('.github-stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const val = parseInt(el.textContent.replace(/\D/g, ''), 10);
        if (!isNaN(val)) animateCounter(el, val);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ─────────────────────────────────────────────────────
   MAIN INIT — Loads data and boots all modules
───────────────────────────────────────────────────── */
async function init() {
  // ── Core UI (no data dependency) ──
  initTheme();
  initNavigation();
  initBackToTop();
  initContactForm();
  initTypedEffect();

  // ── Load JSON data files in parallel ──
  const [skills, projects, experienceData] = await Promise.all([
    loadJSON('data/skills.json'),
    loadJSON('data/projects.json'),
    loadJSON('data/experience.json'),
  ]);

  // ── Render data-driven sections ──
  renderSkills(skills);
  renderProjects(projects);

  if (experienceData) {
    renderExperience(experienceData);
    renderDashboards(experienceData.dashboards);
    renderGitHub(experienceData);
  }

  // ── Scroll animations (after DOM is fully populated) ──
  // Small timeout ensures dynamically injected elements are in the DOM
  setTimeout(() => {
    initScrollReveal();
    initCounters();
  }, 100);
}

/* ─────────────────────────────────────────────────────
   BOOT
───────────────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
