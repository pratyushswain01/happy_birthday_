/* ============================================
   PERSONALIZATION CONFIG
   Edit everything below this block.
   ============================================ */

const birthdayConfig = {
  herName: "astha",
  yourName: "pratyush",
  birthday: "2026-08-09",          // YYYY-MM-DD
  music: "birthday-music.mp3"
};

const personalMessage = `
  <p>There are people who walk into your life quietly and somehow change the way the world feels. You are one of those people.</p>
  <p>Your presence has a way of making ordinary days feel lighter. The way you care, the way you listen, the way you show up — it stays with me.</p>
  <p>I am grateful for the moments we have shared, for the laughter, the conversations, and the quiet understanding that never needed too many words.</p>
  <p>On your birthday, I hope you feel even a fraction of the warmth you give so freely to others. May this year bring you gentle mornings, honest friendships, and reasons to smile that catch you by surprise.</p>
  <p>You deserve every good thing that finds its way to you. Keep being exactly who you are.</p>
`;

const reasons = [
  "Your smile",
  "Your kindness",
  "The way you care",
  "Your presence",
  "The little things you do",
  "The way you make ordinary moments special"
];

const memories = [
  {
    date: "A quiet afternoon",
    title: "The first real conversation",
    description: "Somewhere between ordinary days, you became someone extraordinary."
  },
  {
    date: "Late evening",
    title: "Shared silence",
    description: "Not every moment needs words. Some just need the right person next to you."
  },
  {
    date: "A random Tuesday",
    title: "Unexpected laughter",
    description: "You have a way of turning the smallest things into something worth remembering."
  },
  {
    date: "One of those days",
    title: "When it mattered",
    description: "You showed up. That is rarer than people admit."
  },
  {
    date: "Recently",
    title: "Still here",
    description: "Grateful for the chapters that keep unfolding."
  }
];

const secretMessage = `
  If I could give you one thing today...<br><br>
  ...it would be the ability to see yourself through the eyes of the people who are lucky enough to know you.<br><br>
  You are more special than you realize.
`;

const finaleWish = "May this year give you more reasons to smile, more moments to remember, and everything your heart quietly wishes for.";

/* ============================================
   APPLICATION LOGIC
   ============================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) document.body.classList.add('reduced-motion');

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function applyNames() {
    $$('.her-name').forEach(el => el.textContent = birthdayConfig.herName);
    $$('.your-name').forEach(el => el.textContent = birthdayConfig.yourName);
  }

  function renderMessage() {
    const el = $('#personalMessage');
    if (el) el.innerHTML = personalMessage;
  }

  function renderReasons() {
    const grid = $('#reasonsGrid');
    if (!grid) return;
    grid.innerHTML = reasons.map((text, i) => `
      <div class="reason-card" data-index="${i}">
        <div class="reason-number">0${i + 1}</div>
        <div class="reason-text">${text}</div>
      </div>
    `).join('');
  }

  function renderTimeline() {
    const track = $('#timelineTrack');
    if (!track) return;
    track.innerHTML = memories.map((m, i) => `
      <div class="timeline-item" data-index="${i}">
        <div class="timeline-date">${m.date}</div>
        <div class="timeline-title">${m.title}</div>
        <div class="timeline-desc">${m.description}</div>
      </div>
    `).join('');
  }

  function renderMoment() {
    const dateEl = $('#momentDate');
    const msgEl = $('#momentMessage');
    if (!dateEl || !msgEl) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bday = new Date(birthdayConfig.birthday + 'T00:00:00');
    bday.setHours(0, 0, 0, 0);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = bday.toLocaleDateString('en-US', options);

    if (today.getTime() === bday.getTime()) {
      msgEl.textContent = "Today is yours. Make it unforgettable.";
    } else if (today > bday) {
      msgEl.textContent = "Your day has arrived. Carry its light with you.";
    } else {
      const diff = Math.ceil((bday - today) / (1000 * 60 * 60 * 24));
      msgEl.textContent = diff === 1
        ? "Tomorrow is the day. Almost there."
        : `${diff} days until your special day.`;
    }
  }

  function renderSecret() {
    const el = $('#secretText');
    if (el) el.innerHTML = secretMessage;
  }

  function renderFinale() {
    const el = $('#finaleWish');
    if (el) el.textContent = finaleWish;
  }

  function createParticles(container, count = 40) {
    if (!container || prefersReduced) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = Math.random() * 8 + 's';
      p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
      p.style.background = Math.random() > 0.5 ? 'var(--rose-soft)' : 'var(--violet)';
      container.appendChild(p);
    }
  }

  function createStars(container, count = 60) {
    if (!container || prefersReduced) return;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 2 + 's';
      s.style.width = s.style.height = (1 + Math.random()) + 'px';
      container.appendChild(s);
    }
  }

  function createBurst() {
    if (prefersReduced) return;
    const container = $('#particleBurst');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'burst-particle';
      const angle = (i / 30) * Math.PI * 2;
      const dist = 80 + Math.random() * 120;
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.background = ['var(--rose)', 'var(--gold)', 'var(--violet)'][i % 3];
      container.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transition = 'all 1.4s cubic-bezier(0.16,1,0.3,1)';
        p.style.opacity = '0.7';
        p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
      });
      setTimeout(() => p.remove(), 1600);
    }
  }

  function setupScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.id === 'timelineTrack' || entry.target.classList.contains('reasons-grid')) {
            Array.from(entry.target.children).forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 100);
            });
          }
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    $$('.section-heading, .letter-card, .moment-card, .reason-card, .timeline-item').forEach(el => {
      observer.observe(el);
    });

    const reasonsGrid = $('#reasonsGrid');
    const timelineTrack = $('#timelineTrack');
    if (reasonsGrid) observer.observe(reasonsGrid);
    if (timelineTrack) observer.observe(timelineTrack);
  }

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const bar = $('#progressBar');
    if (bar) bar.style.width = progress + '%';
  }

  function updateNav() {
    const sections = ['reveal', 'message', 'reasons', 'timeline', 'moment', 'secret', 'finale'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 200) current = id;
    });
    $$('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }

  function setupCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cursor = $('#cursor');
    const follower = $('#cursorFollower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    $$('a, button, .candle, .envelope').forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('hover'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
  }

  function setupMusic() {
    const btn = $('#musicBtn');
    const audio = $('#bgMusic');
    if (!btn || !audio) return;

    audio.src = birthdayConfig.music;
    let playing = false;

    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        btn.querySelector('.icon-play').classList.remove('hidden');
        btn.querySelector('.icon-pause').classList.add('hidden');
      } else {
        audio.play().catch(() => {});
        btn.querySelector('.icon-play').classList.add('hidden');
        btn.querySelector('.icon-pause').classList.remove('hidden');
      }
      playing = !playing;
    });
  }

  function runIntro() {
    const line1 = $('#line1');
    const line2 = $('#line2');
    const line3 = $('#line3');
    const btn = $('#beginBtn');

    setTimeout(() => line1 && line1.classList.add('show'), 600);
    setTimeout(() => line2 && line2.classList.add('show'), 1800);
    setTimeout(() => line3 && line3.classList.add('show'), 3000);
    setTimeout(() => btn && btn.classList.add('show'), 4200);
  }

  function setupBegin() {
    const btn = $('#beginBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const nav = $('#nav');
      if (nav) nav.classList.add('visible');
      const reveal = $('#reveal');
      if (reveal) {
        reveal.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        setTimeout(() => {
          reveal.classList.add('active');
          createBurst();
        }, prefersReduced ? 100 : 800);
      }
    });
  }

  function setupEnvelope() {
    const btn = $('#openEnvelope');
    const envelope = $('#envelope');
    if (!btn || !envelope) return;

    const open = () => {
      envelope.classList.add('open');
      btn.classList.add('hidden');
    };

    btn.addEventListener('click', open);
    envelope.addEventListener('click', open);
  }

  function setupCandle() {
    const candle = $('#candle');
    const flame = $('#flame');
    const wrapper = $('#candleWrapper');
    const reveal = $('#finaleReveal');
    const stars = $('#stars');
    if (!candle) return;

    let blown = false;
    candle.addEventListener('click', () => {
      if (blown) return;
      blown = true;
      if (flame) flame.classList.add('out');
      if (stars) stars.classList.add('bright');
      setTimeout(() => {
        if (wrapper) wrapper.style.opacity = '0';
        if (reveal) reveal.classList.add('show');
      }, 900);
    });
  }

  function setupFinaleSequence() {
    const finale = $('#finale');
    if (!finale) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const line1 = $('#finaleLine1');
        const line2 = $('#finaleLine2');
        const wrapper = $('#candleWrapper');
        setTimeout(() => line1 && line1.classList.add('show'), 300);
        setTimeout(() => line2 && line2.classList.add('show'), 1400);
        setTimeout(() => wrapper && wrapper.classList.add('show'), 2600);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(finale);
  }

  function setupMobileNav() {
    const toggle = $('#navToggle');
    const mobile = $('#navMobile');
    if (!toggle || !mobile) return;

    toggle.addEventListener('click', () => {
      mobile.classList.toggle('open');
    });

    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobile.classList.remove('open'));
    });
  }

  function setupNavLinks() {
    $$('.nav-links a, .nav-mobile a').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        }
      });
    });
  }

  function setupReplay() {
    const btn = $('#replayBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      const envelope = $('#envelope');
      const openBtn = $('#openEnvelope');
      if (envelope) envelope.classList.remove('open');
      if (openBtn) openBtn.classList.remove('hidden');
      const flame = $('#flame');
      const reveal = $('#finaleReveal');
      const stars = $('#stars');
      const wrapper = $('#candleWrapper');
      if (flame) flame.classList.remove('out');
      if (reveal) reveal.classList.remove('show');
      if (stars) stars.classList.remove('bright');
      if (wrapper) {
        wrapper.style.opacity = '';
        wrapper.classList.remove('show');
      }
    });
  }

  function setupScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          updateNav();
          const nav = $('#nav');
          if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function hideLoader() {
    const loader = $('#loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        runIntro();
      }, 1400);
    } else {
      runIntro();
    }
  }

  function init() {
    applyNames();
    renderMessage();
    renderReasons();
    renderTimeline();
    renderMoment();
    renderSecret();
    renderFinale();

    createParticles($('#particles'), 35);
    createStars($('#stars'), 50);

    setupCursor();
    setupMusic();
    setupBegin();
    setupEnvelope();
    setupCandle();
    setupFinaleSequence();
    setupMobileNav();
    setupNavLinks();
    setupReplay();
    setupScroll();
    setupScrollReveals();

    hideLoader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
