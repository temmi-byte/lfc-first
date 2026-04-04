/* ============================================================
   LFC FIRST CHURCH — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. NAVBAR  — solid background on scroll
  ────────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check


  /* ──────────────────────────────────────────────────────────
     2. SIDEBAR  — open / close / overlay / close-on-outside
  ────────────────────────────────────────────────────────── */
  const hamburger      = document.getElementById('hamburger');
  const sidebar        = document.getElementById('sidebar');
  const overlay        = document.getElementById('sidebarOverlay');
  const sidebarClose   = document.getElementById('sidebarClose');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  sidebarClose.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Close when any sidebar nav link is tapped
  sidebar.querySelectorAll('.sidebar-nav a, .sidebar-btn-primary, .sidebar-btn-secondary').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });


  /* ──────────────────────────────────────────────────────────
     3. HERO — Ken Burns zoom on background image
  ────────────────────────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    // Small delay so the CSS transition is visible from the start
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add('zoomed'), 120);
    });
  }


  /* ──────────────────────────────────────────────────────────
     4. HERO — staggered entrance animations
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  animItems.forEach(el => {
    const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    setTimeout(() => el.classList.add('revealed'), delay);
  });


  /* ──────────────────────────────────────────────────────────
     5. HERO — parallax on scroll (background only)
  ────────────────────────────────────────────────────────── */
  const heroSection = document.getElementById('hero');

  const onParallax = () => {
    if (!heroBg || !heroSection) return;
    const scrollY     = window.scrollY;
    const heroHeight  = heroSection.offsetHeight;

    if (scrollY < heroHeight) {
      // Move bg at 25% of scroll speed for depth
      heroBg.style.transform = `scale(1.0) translateY(${scrollY * 0.25}px)`;
    }
  };

  window.addEventListener('scroll', onParallax, { passive: true });

});

/* ============================================================
   LFC FIRST CHURCH — about.js
   About Section: Scroll-triggered reveal animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     Intersection Observer — reveal elements as they scroll in
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

      setTimeout(() => {
        el.classList.add('revealed');
      }, delay);

      // Stop observing once revealed
      observer.unobserve(el);
    });
  }, {
    threshold: 0.12,       // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // slightly before entering viewport
  });

  animItems.forEach(el => observer.observe(el));


  /* ──────────────────────────────────────────────────────────
     Pillar cards — staggered reveal with individual delays
  ────────────────────────────────────────────────────────── */
  const pillarCards = document.querySelectorAll('.pillar-card');

  const pillarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

      setTimeout(() => {
        el.classList.add('revealed');
      }, delay);

      pillarObserver.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });

  pillarCards.forEach(card => pillarObserver.observe(card));

});

/* ============================================================
   LFC FIRST CHURCH — prayer.js
   Midnight Prayer Section: Scroll Reveal Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     Scroll-triggered reveal for all [data-anim] elements
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      generalObserver.unobserve(el);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animItems.forEach(el => generalObserver.observe(el));


  /* ──────────────────────────────────────────────────────────
     Staggered reveal for prayer cards
  ────────────────────────────────────────────────────────── */
  const cards = document.querySelectorAll('.prayer-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      cardObserver.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });

  cards.forEach(card => cardObserver.observe(card));


  /* ──────────────────────────────────────────────────────────
     Active hour highlight
     Automatically highlights the card matching current time
  ────────────────────────────────────────────────────────── */
  const now  = new Date();
  const hour = now.getHours(); // 0–23

  // Map hour to card index (cards are 1AM–5AM = hours 1,2,3,4)
  const hourToCard = { 1: 0, 2: 1, 3: 2, 4: 3 };
  const activeIndex = hourToCard[hour];

  if (activeIndex !== undefined) {
    const activeCard = cards[activeIndex];
    if (activeCard) {
      // Add an "active now" ring
      activeCard.style.borderColor = 'rgba(37, 211, 102, 0.45)';
      activeCard.style.boxShadow   = '0 0 0 2px rgba(37, 211, 102, 0.15)';

      // Insert "LIVE NOW" tag
      const liveTag = document.createElement('div');
      liveTag.style.cssText = `
        position: absolute;
        top: 16px;
        left: 16px;
        background: #25D366;
        color: #fff;
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding: 3px 9px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        gap: 5px;
        z-index: 10;
      `;
      liveTag.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:#fff;display:inline-block;"></span> Live Now';
      activeCard.appendChild(liveTag);
    }
  }

});

/* ============================================================
   LFC FIRST CHURCH — services.js
   Service Times: Scroll reveals + today highlight logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. SCROLL REVEAL — all [data-anim] elements
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animItems.forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────────────────────
     2. TODAY HIGHLIGHT — highlight today's rows in the table
  ────────────────────────────────────────────────────────── */
  const today     = new Date().getDay(); // 0=Sun, 1=Mon … 6=Sat
  const todayRows = document.querySelectorAll(`.day-row[data-day="${today}"]`);

  todayRows.forEach(row => row.classList.add('today-highlight'));


  /* ──────────────────────────────────────────────────────────
     3. TODAY BANNER — show what's on today
  ────────────────────────────────────────────────────────── */
  const todayLabel = document.getElementById('todayLabel');
  const todayDesc  = document.getElementById('todayDesc');
  const todayBadge = document.getElementById('todayBadge');

  // Map day index to schedule summary
  const scheduleMap = {
    0: { label: "It's Sunday!", desc: "First Service 7:00 AM • Second Service 9:30 AM • Children's Church & YAF 9:30 AM" },
    1: { label: "Today — Monday",  desc: "Covenant Hour of Prayer (CHOP) • 6:00 AM – 7:00 AM" },
    2: { label: "Today — Tuesday", desc: "Covenant Hour of Prayer (CHOP) • 6:00 AM – 7:00 AM" },
    3: { label: "Today — Wednesday", desc: "CHOP 6:00 AM • Midweek Communion Service 5:00 PM – 7:00 PM" },
    4: { label: "Today — Thursday", desc: "Covenant Hour of Prayer (CHOP) • 6:00 AM – 7:00 AM" },
    5: { label: "Today — Friday",  desc: "CHOP 6:00 AM • Digging Deep (Bible Study) 5:30 PM – 7:30 PM" },
    6: { label: "Today — Saturday", desc: "CHOP 6:00 AM • Winners Satellite Fellowship (WSF) 4:00 PM – 6:00 PM" },
  };

  const todayInfo = scheduleMap[today];
  if (todayInfo && todayLabel && todayDesc) {
    todayLabel.textContent = todayInfo.label;
    todayDesc.textContent  = todayInfo.desc;
    // Sunday gets a special badge
    if (today === 0 && todayBadge) {
      todayBadge.textContent = 'Worship Day';
      todayBadge.style.background = '#b8860b';
    }
  }


  /* ──────────────────────────────────────────────────────────
     4. TABLE ROW HOVER — subtle arrow feedback
     (CSS handles most hover, this adds minor JS polish)
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.day-row').forEach(row => {
    row.style.cursor = 'default';
  });

});

/* ============================================================
   LFC FIRST CHURCH — location.js
   Location Section: Scroll reveals + map fallback
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. SCROLL REVEAL
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animItems.forEach(el => observer.observe(el));


  /* ──────────────────────────────────────────────────────────
     2. MAP FALLBACK
     If the iframe fails to load, render a styled fallback card
  ────────────────────────────────────────────────────────── */
  const mapFrame    = document.querySelector('.map-frame');
  const mapIframe   = mapFrame ? mapFrame.querySelector('iframe') : null;
  let   fallbackShown = false;

  function showFallback() {
    if (fallbackShown || !mapFrame) return;
    fallbackShown = true;

    // Remove the iframe
    if (mapIframe) mapIframe.remove();

    // Inject fallback UI
    mapFrame.innerHTML = `
      <div class="map-fallback">
        <i class="fas fa-map-location-dot"></i>
        <h3>Living Faith Church<br/>First Church, Ilorin</h3>
        <p>Kwara State Headquarters — Ilorin, Kwara State, Nigeria</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=LIVING+FAITH+CHURCH+FIRST+CHURCH+ILORIN&query_place_id=ChIJe--SUgCzNxAR7j7lTxZAKjQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fas fa-diamond-turn-right"></i>
          Open in Google Maps
        </a>
      </div>
    `;
  }

  // Listen for iframe load error
  if (mapIframe) {
    mapIframe.addEventListener('error', showFallback);

    // Safety timeout — if iframe hasn't loaded content in 6s, show fallback
    setTimeout(() => {
      try {
        // Cross-origin: if no src or blank, show fallback
        if (!mapIframe.src || mapIframe.src === 'about:blank') showFallback();
      } catch (e) {
        // Expected cross-origin error — map likely loaded fine, do nothing
      }
    }, 6000);
  }


  /* ──────────────────────────────────────────────────────────
     3. INFO CARD STAGGER
     Adds a small stagger delay to each info card on reveal
  ────────────────────────────────────────────────────────── */
  const infoCards = document.querySelectorAll('.info-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const cards = entry.target.querySelectorAll('.info-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity    = '1';
          card.style.transform  = 'translateX(0)';
        }, i * 80);
      });
      cardObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  const infoPanel = document.querySelector('.info-panel');
  if (infoPanel) {
    // Pre-hide cards for stagger
    infoCards.forEach(card => {
      card.style.opacity   = '0';
      card.style.transform = 'translateX(-16px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    cardObserver.observe(infoPanel);
  }

});

/* ============================================================
   LFC FIRST CHURCH — giving.js
   Sow a Seed: Scroll reveals, tab switching, copy to clipboard
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. SCROLL REVEAL
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  animItems.forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────────────────────
     2. ACCOUNT CARD STAGGER
  ────────────────────────────────────────────────────────── */
  const accountCards = document.querySelectorAll('.account-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      cardObserver.unobserve(el);
    });
  }, { threshold: 0.10 });

  accountCards.forEach(card => cardObserver.observe(card));


  /* ──────────────────────────────────────────────────────────
     3. GIVING TYPE TABS
  ────────────────────────────────────────────────────────── */
  const tabDescriptions = {
    tithe: 'The tithe is a holy covenant obligation — 10% of your income returned to God. It is the gateway to open heavens, divine protection, and supernatural provision over your finances and household. (Malachi 3:10)',
    offering: 'An offering is a freewill expression of gratitude and worship beyond the tithe. Every offering is a statement of your faith and love for God — and God loves a cheerful giver. (2 Corinthians 9:7)',
    seed: 'Seed Faith is a specific act of sowing in expectation of a targeted harvest. When you sow a seed with faith and a specific prayer point, you activate the law of seedtime and harvest in your favour. (Genesis 8:22)',
    project: 'The Project offering supports the physical growth and expansion of the House of God — buildings, equipment, and facilities. When you invest in God\'s house, He invests in yours. (Haggai 2:19)',
  };

  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabDescEl  = document.getElementById('tabDescText');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Fade out → update text → fade in
      if (tabDescEl) {
        tabDescEl.style.opacity = '0';
        setTimeout(() => {
          tabDescEl.textContent = tabDescriptions[btn.dataset.tab] || '';
          tabDescEl.style.opacity = '1';
        }, 200);
      }
    });
  });


  /* ──────────────────────────────────────────────────────────
     4. COPY TO CLIPBOARD
     Called inline from HTML: copyNumber('accId', btn)
  ────────────────────────────────────────────────────────── */
  window.copyNumber = function (elementId, btn) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const number = el.textContent.trim();

    navigator.clipboard.writeText(number).then(() => {
      // Update button state
      const originalHTML = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';

      showToast(`Account number copied to clipboard!`);

      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalHTML;
      }, 2500);
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = number;
      textarea.style.position = 'fixed';
      textarea.style.opacity  = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      showToast('Account number copied!');
    });
  };


  /* ──────────────────────────────────────────────────────────
     5. TOAST NOTIFICATION
  ────────────────────────────────────────────────────────── */
  function showToast(message) {
    const toast    = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => toast.classList.remove('show'), 3000);
  }

});

/* ============================================================
   LFC FIRST CHURCH — bishop.js
   Bishop Section: Scroll reveals + timeline stagger
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. GENERAL SCROLL REVEAL — all [data-anim] elements
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  animItems.forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────────────────────
     2. TIMELINE STAGGER — each item animates in sequence
  ────────────────────────────────────────────────────────── */
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Trigger all timeline items in sequence
      timelineItems.forEach((item, i) => {
        const delay = parseInt(item.getAttribute('data-delay') || '0', 10);
        setTimeout(() => item.classList.add('revealed'), delay);
      });

      timelineObserver.disconnect();
    });
  }, { threshold: 0.15 });

  const timelineEl = document.querySelector('.timeline');
  if (timelineEl) timelineObserver.observe(timelineEl);


  /* ──────────────────────────────────────────────────────────
     3. ACHIEVEMENT ITEMS STAGGER
  ────────────────────────────────────────────────────────── */
  const achievementItems = document.querySelectorAll('.achievement-item');

  const achObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      achievementItems.forEach((item, i) => {
        item.style.opacity   = '0';
        item.style.transform = 'translateY(16px)';
        item.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`;

        setTimeout(() => {
          item.style.opacity   = '1';
          item.style.transform = 'translateY(0)';
        }, i * 80 + 100);
      });

      achObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  const achGrid = document.querySelector('.achievements-grid');
  if (achGrid) achObserver.observe(achGrid);


  /* ──────────────────────────────────────────────────────────
     4. PORTRAIT PHOTO — graceful load
  ────────────────────────────────────────────────────────── */
  const photo    = document.querySelector('.portrait-photo');
  const fallback = document.getElementById('portraitFallback');

  if (photo) {
    photo.addEventListener('load', () => {
      photo.style.opacity = '1';
    });

    photo.addEventListener('error', () => {
      photo.style.display = 'none';
      if (fallback) fallback.style.display = 'flex';
    });

    // Start with slight fade-in
    photo.style.opacity    = '0';
    photo.style.transition = 'opacity 0.5s ease';

    // If already cached and loaded
    if (photo.complete && photo.naturalWidth > 0) {
      photo.style.opacity = '1';
    }
  }

});

/* ============================================================
   LFC FIRST CHURCH — footer.js
   Footer: Year update, back-to-top, smooth scrolling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. AUTO-UPDATE COPYRIGHT YEAR
  ────────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ──────────────────────────────────────────────────────────
     2. BACK TO TOP BUTTON
     Shows after scrolling 400px, hides at top
  ────────────────────────────────────────────────────────── */
  const backToTopBtn = document.getElementById('backToTop');

  const handleScroll = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ──────────────────────────────────────────────────────────
     3. SMOOTH ANCHOR SCROLL
     Handles all footer links that point to #section anchors
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ──────────────────────────────────────────────────────────
     4. FOOTER LINK HOVER — subtle slide effect via JS
     (CSS handles main hover; this adds a small bounce on click)
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.footer-links li a').forEach(link => {
    link.addEventListener('click', function () {
      this.style.transform = 'translateX(4px)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  });


  /* ──────────────────────────────────────────────────────────
     5. SOCIAL ICONS — open in new tab safety
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.setAttribute('rel', 'noopener noreferrer');
  });


  /* ──────────────────────────────────────────────────────────
     6. FOOTER REVEAL — subtle entrance animation
  ────────────────────────────────────────────────────────── */
  const footerCols = document.querySelectorAll('.footer-col');

  const colObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      footerCols.forEach((col, i) => {
        col.style.opacity   = '0';
        col.style.transform = 'translateY(20px)';
        col.style.transition = `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`;

        setTimeout(() => {
          col.style.opacity   = '1';
          col.style.transform = 'translateY(0)';
        }, i * 100 + 100);
      });

      colObserver.disconnect();
    });
  }, { threshold: 0.1 });

  const footerBody = document.querySelector('.footer-body');
  if (footerBody) colObserver.observe(footerBody);

});

/* ============================================================
   LFC FIRST CHURCH — pastor.js
   Pastor Card: Scroll reveal + photo load handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. SCROLL REVEAL
  ────────────────────────────────────────────────────────── */
  const animItems = document.querySelectorAll('[data-anim]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.classList.add('revealed'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  animItems.forEach(el => observer.observe(el));


  /* ──────────────────────────────────────────────────────────
     2. PASTOR PHOTO — graceful load & fallback
  ────────────────────────────────────────────────────────── */
  const photo    = document.querySelector('.pastor-photo');
  const fallback = document.getElementById('photoFallback');

  if (photo) {
    // Fade in on load
    photo.style.opacity    = '0';
    photo.style.transition = 'opacity 0.6s ease';

    photo.addEventListener('load', () => {
      photo.style.opacity = '1';
    });

    photo.addEventListener('error', () => {
      photo.style.display = 'none';
      if (fallback) fallback.style.display = 'flex';
    });

    // Handle cached images
    if (photo.complete && photo.naturalWidth > 0) {
      photo.style.opacity = '1';
    }
  }


  /* ──────────────────────────────────────────────────────────
     3. PILLAR ITEMS — stagger in on card reveal
  ────────────────────────────────────────────────────────── */
  const card = document.querySelector('.pastor-card');
  const pillars = document.querySelectorAll('.pillar-item');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      pillars.forEach((p, i) => {
        p.style.opacity   = '0';
        p.style.transform = 'translateY(10px)';
        p.style.transition = `opacity 0.4s ease ${300 + i * 80}ms, transform 0.4s ease ${300 + i * 80}ms`;

        setTimeout(() => {
          p.style.opacity   = '1';
          p.style.transform = 'translateY(0)';
        }, 300 + i * 80);
      });

      cardObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  if (card) cardObserver.observe(card);

});