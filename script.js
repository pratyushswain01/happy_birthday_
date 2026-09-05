/* =====================================================
   HAPPY BIRTHDAY — Interactive Experience
   ===================================================== */

(function () {
  'use strict';

  // ---------- Photo config (easy to replace) ----------
  const PHOTOS = {
    photo1: 'images/photo1.jpg',
    photo2: 'images/photo2.jpg',
    photo3: 'images/photo3.jpg',
    photo4: 'images/photo4.jpg',
    photo5: 'images/photo5.jpg',
    photo6: 'images/photo6.jpg'
  };

  // ---------- DOM ----------
  const overlay = document.getElementById('opening-overlay');
  const openBtn = document.getElementById('open-surprise');
  const mainContent = document.getElementById('main-content');
  const musicToggle = document.getElementById('music-toggle');
  const scrollProgress = document.getElementById('scroll-progress');
  const envelope = document.getElementById('envelope');
  const blowBtn = document.getElementById('blow-candles');
  const wishReveal = document.getElementById('wish-reveal');
  const secretBtn = document.getElementById('secret-btn');
  const secretModal = document.getElementById('secret-modal');
  const modalClose = document.getElementById('modal-close');
  const trailCanvas = document.getElementById('trail-canvas');

  // ---------- Audio ----------
  let audio = null;
  let musicPlaying = false;
  let musicStarted = false;

  function initAudio() {
    audio = new Audio('music/birthday-music.mp3');
    audio.loop = true;
    audio.volume = 0.8;
    audio.preload = 'auto';
  }

  function playMusic() {
    if (!audio) initAudio();
    audio.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.remove('muted');
    }).catch(() => {
      // Autoplay blocked — user can toggle
    });
  }

  function toggleMusic() {
    if (!audio) initAudio();
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
      musicToggle.classList.add('muted');
    } else {
      audio.play().then(() => {
        musicPlaying = true;
        musicToggle.classList.remove('muted');
      }).catch(() => {});
    }
  }

  // ---------- Confetti helper ----------
  function burstConfetti(opts = {}) {
    if (typeof confetti !== 'function') return;
    const defaults = {
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f8d7da', '#c9a88a', '#fde8d8', '#ffffff', '#d4af37', '#f5c6cb']
    };
    confetti({ ...defaults, ...opts });
  }

  function heartConfetti() {
    if (typeof confetti !== 'function') return;
    const defaults = {
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f8d7da', '#e8a0a8', '#c9a88a'],
      shapes: ['circle'],
      scalar: 1.1
    };
    confetti(defaults);
    setTimeout(() => confetti({ ...defaults, origin: { y: 0.7, x: 0.3 } }), 200);
    setTimeout(() => confetti({ ...defaults, origin: { y: 0.7, x: 0.7 } }), 350);
  }

  // ---------- Opening ----------
  openBtn.addEventListener('click', () => {
    // Music
    playMusic();
    musicStarted = true;
    musicToggle.classList.add('visible');

    // Confetti burst
    burstConfetti({ particleCount: 100, spread: 90, origin: { y: 0.7 } });
    setTimeout(() => heartConfetti(), 300);

    // Transition out
    overlay.classList.add('hidden');
    mainContent.classList.add('revealed');

    // Start GSAP animations after slight delay
    setTimeout(() => {
      initScrollAnimations();
      initRevealSection();
      initFinaleHearts();
    }, 600);
  });

  musicToggle.addEventListener('click', toggleMusic);

  // ---------- Scroll Progress ----------
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ---------- GSAP Scroll Animations ----------
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Letter paragraphs
    gsap.utils.toArray('.letter-body, .letter-closing').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.08
      });
      el.classList.add('visible');
    });

    // Polaroid cards
    gsap.utils.toArray('.polaroid-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        rotation: card.classList.contains('p1') || card.classList.contains('p4') ? -8 : 6,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Cluster
    gsap.from('.cluster', {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cluster',
        start: 'top 85%'
      }
    });

    // Filmstrip
    gsap.from('.filmstrip-wrap', {
      opacity: 0,
      x: -30,
      duration: 1,
      scrollTrigger: {
        trigger: '.filmstrip-wrap',
        start: 'top 90%'
      }
    });

    // Sticky notes
    gsap.utils.toArray('.sticky-note').forEach((note, i) => {
      gsap.from(note, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.6,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: note,
          start: 'top 92%'
        },
        delay: (i % 5) * 0.05
      });
    });

    // Wall polaroids
    gsap.from('.wall-polaroid', {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.wall-photos',
        start: 'top 90%'
      }
    });

    // Amazing letters
    gsap.utils.toArray('.letter-block').forEach((block, i) => {
      gsap.from(block, {
        opacity: 0,
        x: -20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 90%'
        },
        delay: i * 0.08
      });
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: item.classList.contains('left') ? -40 : 40,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%'
        },
        delay: i * 0.1
      });
    });

    // Finale text sequence
    const finaleLines = gsap.utils.toArray('.finale-line');
    const finaleTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#finale',
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    });
    finaleLines.forEach((line, i) => {
      finaleTl.to(line, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, i * 0.7);
    });

    // Hero Ken Burns on photo (subtle continuous)
    const heroPhoto = document.querySelector('.hero-photo');
    if (heroPhoto) {
      gsap.to(heroPhoto, {
        scale: 1.08,
        duration: 12,
        ease: 'none',
        yoyo: true,
        repeat: -1
      });
    }

    // Parallax doodles
    gsap.utils.toArray('.doodle').forEach((d) => {
      gsap.to(d, {
        y: '+=20',
        scrollTrigger: {
          trigger: '.hero',
          scrub: 1.5,
          start: 'top top',
          end: 'bottom top'
        }
      });
    });
  }

  // ---------- Photo Reveal (scroll-driven) ----------
  function initRevealSection() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const slides = document.querySelectorAll('.reveal-slide');
    const dots = document.querySelectorAll('.reveal-progress .dot');
    if (!slides.length) return;

    const section = document.getElementById('reveal');
    const total = slides.length;

    // Pin and scrub through slides
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (total - 0.5)}`,
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(total - 1, Math.floor(progress * total));
        slides.forEach((s, i) => {
          s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === index);
        });
      }
    });
  }

  // ---------- Envelope ----------
  let envelopeOpen = false;
  envelope.addEventListener('click', () => {
    if (envelopeOpen) return;
    envelopeOpen = true;
    envelope.classList.add('open');
    const hint = document.querySelector('.envelope-hint');
    if (hint) hint.style.opacity = '0';
    burstConfetti({ particleCount: 40, spread: 50, origin: { y: 0.55 } });
  });

  // ---------- Cake ----------
  let candlesBlown = false;
  blowBtn.addEventListener('click', () => {
    if (candlesBlown) return;
    candlesBlown = true;
    blowBtn.disabled = true;

    document.querySelectorAll('.candle').forEach((c, i) => {
      setTimeout(() => c.classList.add('blown'), i * 120);
    });

    setTimeout(() => {
      wishReveal.classList.add('show');
      burstConfetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#f8d7da', '#c9a88a', '#d4af37', '#ffffff', '#f5c6cb']
      });
      setTimeout(() => heartConfetti(), 400);
    }, 800);
  });

  // ---------- Secret Modal ----------
  secretBtn.addEventListener('click', () => {
    secretModal.classList.add('open');
    heartConfetti();
  });

  modalClose.addEventListener('click', () => {
    secretModal.classList.remove('open');
  });

  secretModal.addEventListener('click', (e) => {
    if (e.target === secretModal) {
      secretModal.classList.remove('open');
    }
  });

  // ---------- Finale floating hearts ----------
  function initFinaleHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    function spawnHeart() {
      const heart = document.createElement('span');
      heart.textContent = Math.random() > 0.5 ? '♡' : '♥';
      heart.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        bottom: -20px;
        font-size: ${12 + Math.random() * 16}px;
        color: rgba(248, 215, 218, ${0.4 + Math.random() * 0.4});
        pointer-events: none;
        animation: rise ${6 + Math.random() * 4}s linear forwards;
      `;
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 10000);
    }

    // CSS for rise
    if (!document.getElementById('rise-style')) {
      const style = document.createElement('style');
      style.id = 'rise-style';
      style.textContent = `
        @keyframes rise {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // Spawn when finale is in view
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '#finale',
        start: 'top 70%',
        onEnter: () => {
          const interval = setInterval(spawnHeart, 600);
          setTimeout(() => clearInterval(interval), 12000);
        },
        once: true
      });
    }
  }

  // ---------- Heart cursor trail (desktop) ----------
  function initTrail() {
    if (!trailCanvas || window.matchMedia('(hover: none)').matches) return;

    const ctx = trailCanvas.getContext('2d');
    let width, height;
    const particles = [];
    const maxParticles = 25;

    function resize() {
      width = trailCanvas.width = window.innerWidth;
      height = trailCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 4 + Math.random() * 6;
        this.life = 1;
        this.decay = 0.02 + Math.random() * 0.02;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5 - 0.5;
        this.char = Math.random() > 0.6 ? '♥' : '♡';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
      draw() {
        ctx.globalAlpha = this.life * 0.7;
        ctx.fillStyle = '#e8a0a8';
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.char, this.x, this.y);
      }
    }

    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) > 18) {
        if (particles.length < maxParticles) {
          particles.push(new Particle(e.clientX, e.clientY));
        }
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ---------- Init trail after open ----------
  openBtn.addEventListener('click', () => {
    setTimeout(initTrail, 800);
  }, { once: true });

  // ---------- Keyboard accessibility ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && secretModal.classList.contains('open')) {
      secretModal.classList.remove('open');
    }
  });

  // ---------- Prevent zoom on double-tap (iOS) for buttons ----------
  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      btn.click();
    }, { passive: false });
  });

})();
