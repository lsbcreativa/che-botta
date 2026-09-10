/* Che Botta · interacciones */
(() => {
  const WA_NUMBER = '51995951778';
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('menuToggle');
  const waFloat = document.querySelector('.wa-float');
  const intro = document.getElementById('intro');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Intro de marca (una vez por sesión) ---- */
  if (intro) {
    let seen = false;
    try { seen = sessionStorage.getItem('cb-intro') === '1'; } catch {}
    if (seen || reduceMotion) {
      intro.classList.add('is-off');
    } else {
      document.body.classList.add('is-locked');
      setTimeout(() => {
        intro.classList.add('is-done');
        document.body.classList.remove('is-locked');
        try { sessionStorage.setItem('cb-intro', '1'); } catch {}
        setTimeout(() => intro.classList.add('is-off'), 900);
      }, 1500);
    }
  }

  /* ---- Header al hacer scroll + botón flotante ---- */
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    waFloat && waFloat.classList.toggle('is-visible', y > window.innerHeight * 0.6);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Menú móvil ---- */
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('is-locked');
  };
  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('is-locked', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---- Brasas en el hero ---- */
  const embers = document.getElementById('embers');
  if (embers && !reduceMotion) {
    const n = window.innerWidth < 700 ? 14 : 28;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i');
      const size = (Math.random() * 4 + 2).toFixed(1);
      s.style.setProperty('--x', `${(Math.random() * 100).toFixed(2)}%`);
      s.style.setProperty('--s', `${size}px`);
      s.style.setProperty('--t', `${(Math.random() * 9 + 8).toFixed(1)}s`);
      s.style.setProperty('--delay', `${(-Math.random() * 16).toFixed(1)}s`);
      s.style.setProperty('--dx', `${((Math.random() - .5) * 120).toFixed(0)}px`);
      s.style.setProperty('--o', (Math.random() * .5 + .35).toFixed(2));
      frag.appendChild(s);
    }
    embers.appendChild(frag);
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Números que cuentan al aparecer ---- */
  const facts = document.querySelectorAll('.facts strong');
  if (facts.length && 'IntersectionObserver' in window && !reduceMotion) {
    const countUp = el => {
      const suffix = el.querySelector('small');
      const target = parseInt(el.textContent, 10);
      const start = performance.now(), dur = 1400;
      const step = now => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.firstChild.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      el.firstChild.textContent = '0';
      if (suffix) el.appendChild(suffix);
      requestAnimationFrame(step);
    };
    const fo = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); fo.unobserve(e.target); } });
    }, { threshold: 0.6 });
    facts.forEach(el => fo.observe(el));
  }

  /* ---- Enlace activo en el nav ---- */
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---- Parallax suave ---- */
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
  if (parallaxEls.length && !reduceMotion) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const f = parseFloat(el.dataset.parallax) || 0.05;
        const center = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-center * f).toFixed(1)}px, 0)${el.dataset.scale ? ` scale(${el.dataset.scale})` : ''}`;
      });
      ticking = false;
    };
    // la imagen de fondo de familia necesita conservar su escala
    parallaxEls.forEach(el => { if (el.closest('.familia__bg')) el.dataset.scale = '1.08'; });
    update();
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---- Efectos por producto (hojas, destellos, fuego) ---- */
  const rnd = (a, b) => a + Math.random() * (b - a);
  document.querySelectorAll('[data-fx]').forEach(box => {
    const kind = box.dataset.fx;
    const frag = document.createDocumentFragment();
    const mk = (cls, vars) => {
      const el = document.createElement('i');
      if (cls) el.className = cls;
      Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
      frag.appendChild(el);
    };
    if (kind === 'herb') {
      for (let i = 0; i < 8; i++) mk('', {
        '--x': rnd(5, 95).toFixed(1) + '%', '--s': rnd(8, 16).toFixed(0) + 'px',
        '--t': rnd(5, 9).toFixed(1) + 's', '--delay': (-rnd(0, 9)).toFixed(1) + 's',
        '--dx': rnd(-40, 40).toFixed(0) + 'px'
      });
    } else if (kind === 'gold') {
      for (let i = 0; i < 9; i++) mk('', {
        '--x': rnd(6, 92).toFixed(1) + '%', '--y': rnd(8, 88).toFixed(1) + '%',
        '--s': rnd(8, 22).toFixed(0) + 'px', '--t': rnd(1.6, 3.2).toFixed(2) + 's',
        '--delay': (-rnd(0, 3)).toFixed(2) + 's'
      });
    } else if (kind === 'fire') {
      for (let i = 0; i < 4; i++) mk('flame', {
        '--x': (i * 27 + rnd(-4, 4)).toFixed(1) + '%', '--w': rnd(36, 48).toFixed(0) + '%',
        '--h': rnd(34, 52).toFixed(0) + '%', '--t': rnd(.5, .9).toFixed(2) + 's',
        '--delay': (-rnd(0, 1)).toFixed(2) + 's'
      });
      for (let i = 0; i < 6; i++) mk('ember', {
        '--x': rnd(10, 90).toFixed(1) + '%', '--s': rnd(2, 5).toFixed(1) + 'px',
        '--t': rnd(2.2, 4).toFixed(1) + 's', '--delay': (-rnd(0, 4)).toFixed(1) + 's',
        '--dx': rnd(-50, 50).toFixed(0) + 'px', '--o': rnd(.5, .95).toFixed(2)
      });
    }
    box.appendChild(frag);
  });

  /* En pantallas táctiles, los efectos se encienden cuando la tarjeta está a la vista */
  if (!finePointer && !reduceMotion && 'IntersectionObserver' in window) {
    const fxo = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('is-fx', e.isIntersecting));
    }, { threshold: 0.55 });
    document.querySelectorAll('.product').forEach(c => fxo.observe(c));
  }

  /* ---- Tilt 3D en tarjetas de producto ---- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      let raf = null;
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `translateY(-8px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
        });
      });
      card.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = '';
      });
    });
  }

  /* ---- Botones "Pedir por WhatsApp" con mensaje por producto ---- */
  document.querySelectorAll('[data-wa]').forEach(link => {
    const product = link.closest('[data-product]')?.dataset.product || 'sus chimichurris';
    const text = `Hola, Che Botta 😉\nQuiero pedir ${product}. ¿Me cuentan disponibilidad y precio?`;
    link.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  });

  /* ---- Año en el footer ---- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
