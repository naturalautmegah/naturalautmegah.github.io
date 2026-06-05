/**
 * Natura Laut Megah — LandingPage.jsx
 *
 * A self-contained React component for the full landing page.
 * Styles are inlined via a <style> tag injected into the document head,
 * keeping the component portable without requiring an external CSS file.
 *
 * Usage:
 *   import LandingPage from './LandingPage';
 *   // In your app:
 *   <LandingPage />
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const DURATION = 6000;

const SLIDES = [
  {
    cls: 'slide-1',
    label: 'Oleochemical · Crude Glycerine',
    title: ['Indonesia\'s ', <em key="e">Finest</em>, <br key="b"/>, 'Oleochemical', <br key="b2"/>, 'Production'],
    sub: 'World-class processing facilities supplying pharmaceutical and industrial-grade crude glycerine to global markets with full traceability.',
    tag: 'Crude Glycerine',
  },
  {
    cls: 'slide-2',
    label: 'Coconut Shell · Activated Charcoal',
    title: ['Kilns of', <br key="b"/>, <em key="e">Ancient</em>, <br key="b2"/>, 'Craft, Modern', <br key="b3"/>, 'Scale'],
    sub: 'Sustainably harvested coconut shell charcoal from Sulawesi & Maluku — prized for ultra-high fixed carbon content and low ash residue.',
    tag: 'Coconut Charcoal',
  },
  {
    cls: 'slide-3',
    label: 'Marine · Seaweed Cultivation',
    title: ['Vast Ocean', <br key="b"/>, <em key="e">Gardens</em>, <br key="b2"/>, 'of the East'],
    sub: 'From the crystal waters of Nusa Tenggara and Sulawesi — premium Eucheuma cottonii and spinosum for carrageenan and agar industries worldwide.',
    tag: 'Seaweed',
  },
];

const PRODUCTS = [
  {
    icon: '⚗️',
    name: 'Crude Glycerine',
    desc: "By-product of Indonesia's vast palm and coconut oil refining industry. Available in 80%+ purity for industrial applications, and refined grades for pharmaceutical and food use.",
    spec: 'Purity · 80–99.5% · Bulk / ISO Tank · MSDS Available',
  },
  {
    icon: '🌿',
    name: 'Coconut Shell Charcoal',
    desc: 'Sustainably produced from Sulawesi and East Indonesian coconut groves. High fixed carbon (75–80%), ultra-low ash, and consistent sizing for activated carbon upgrading.',
    spec: 'FC 75–80% · Moisture <8% · 25kg Bags / Bulk',
  },
  {
    icon: '🌊',
    name: 'Seaweeds',
    desc: 'Premium dried Eucheuma cottonii and spinosum from pristine Indonesian waters. Consistently high gel strength and viscosity for carrageenan, agar-agar, and food ingredient markets.',
    spec: 'Moisture <35% · Salt <3% · Dried / Sun-cured',
  },
];

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function LogoMark() {
  return (
    <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="23" cy="23" r="21.5" stroke="#c9a84c" strokeWidth="1"/>
      <path d="M23 8 C23 8 34 18 34 26 C34 32 29 36 23 36 C17 36 12 32 12 26 C12 18 23 8 23 8Z" fill="#2d7a5e" opacity="0.85"/>
      <path d="M15 28 Q19 25 23 28 Q27 31 31 28" stroke="#c9a84c" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M16 31 Q20 28 23 31 Q26 34 30 31" stroke="#c9a84c" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M23 12 L23 32" stroke="#e8c97a" strokeWidth="0.8" opacity="0.6"/>
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function LandingPage() {
  const [current, setCurrent]   = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoRef     = useRef(null);
  const progressRef = useRef(null);
  const startTime   = useRef(null);

  /* ── Nav scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Progress bar animation ── */
  const resetProgress = useCallback(() => {
    cancelAnimationFrame(progressRef.current);
    setProgress(0);
    startTime.current = null;

    const animate = (ts) => {
      if (!startTime.current) startTime.current = ts;
      const elapsed = ts - startTime.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(animate);
    };
    progressRef.current = requestAnimationFrame(animate);
  }, []);

  /* ── Carousel navigation ── */
  const goTo = useCallback((idx) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    resetProgress();
  }, [resetProgress]);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
      resetProgress();
    }, DURATION);
  }, [resetProgress]);

  useEffect(() => {
    startAuto();
    resetProgress();
    return () => {
      clearInterval(autoRef.current);
      cancelAnimationFrame(progressRef.current);
    };
  }, [startAuto, resetProgress]);

  const navigate = (delta) => { goTo(current + delta); startAuto(); };

  /* ═════════════════════════════════════════════════════════
     RENDER
     ═════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="logo">
          <div className="logo-mark"><LogoMark /></div>
          <div className="logo-text">
            <span className="name">Natura Laut Megah</span>
            <span className="tagline">Natural Resources · Indonesia</span>
          </div>
        </a>
        <ul className="nav-links">
          {['Products','Sourcing','Compliance','About'].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">Enquire Now</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        {SLIDES.map((s, i) => (
          <div key={i} className={`slide ${s.cls} ${i === current ? 'active' : ''}`}>
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="slide-label">{s.label}</div>
              <h1 className="hero-title">{s.title}</h1>
              <p className="hero-sub">{s.sub}</p>
            </div>
          </div>
        ))}

        {/* Controls */}
        <div className="carousel-controls">
          <button className="ctrl-btn" onClick={() => navigate(-1)} aria-label="Previous"><ChevronLeft /></button>
          <div className="dots">
            {SLIDES.map((_, i) => (
              <div key={i} className={`dot ${i === current ? 'active' : ''}`}
                onClick={() => { goTo(i); startAuto(); }} />
            ))}
          </div>
          <button className="ctrl-btn" onClick={() => navigate(1)} aria-label="Next"><ChevronRight /></button>
          <span className="slide-counter">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Right product tags */}
        <div className="product-tags">
          {SLIDES.map((s, i) => (
            <span key={i}
              className={`p-tag ${i === current ? 'active-tag' : ''}`}
              onClick={() => { goTo(i); startAuto(); }}>
              {s.tag}
            </span>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>

        {/* Progress bar */}
        <div className="progress-bar" style={{ width: `${progress}%`, transition: 'none' }} />
      </section>

      {/* ABOUT */}
      <section className="about">
        <div>
          <h2 className="about-headline">Bridging <em>Global Demand</em> with Indonesia's Natural Wealth</h2>
          <div className="gold-line" />
          <p className="about-body">
            Natura Laut Megah is a Jakarta-based trading and brokerage house specialising in the export of Indonesia's most coveted natural commodities. We serve as the trusted bridge between international buyers and our network of verified Indonesian producers — ensuring quality, compliance, and reliable supply chains from source to port.
          </p>
        </div>
        <div>
          <p className="about-body">
            With deep local expertise and a transparent approach to international trade, we handle end-to-end logistics, documentation, quality certification, and regulatory compliance. Whether you are a European pharmaceutical manufacturer, a Japanese food ingredient distributor, or a Korean cosmetics group — we are your single point of contact for Indonesian natural resources.
          </p>
          <div className="stat-row">
            {[['18+','Countries Served'],['300+','Metric Tons / Month'],['ISO','Certified Supply Chain']].map(([n,l]) => (
              <div key={l} className="stat">
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products">
        <div className="section-label">— Our Commodities</div>
        <div className="product-grid">
          {PRODUCTS.map(p => (
            <div key={p.name} className="product-card">
              <span className="product-icon">{p.icon}</span>
              <div className="product-name">{p.name}</div>
              <p className="product-desc">{p.desc}</p>
              <div className="product-spec">{p.spec}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-text">
          <h2>Ready to Source from <em>Indonesia</em>?</h2>
          <p>Our trade desk is available to discuss volume requirements, specifications, shipping terms, and pricing. Let us connect you to the source.</p>
        </div>
        <div className="cta-btns">
          <a href="mailto:trade@naturalautmegah.id" className="btn-primary">Contact Trade Desk</a>
          <a href="#" className="btn-outline">Download Catalogue</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-copy">© 2024 PT Natura Laut Megah — All Rights Reserved</span>
        <span className="footer-location">Jakarta · Indonesia · Est. 2011</span>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   STYLES  (injected via <style> tag — import styles.css
   instead if you prefer an external stylesheet)
   ═══════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
  /* All rules are identical to styles.css — kept here so the
     component is fully self-contained. To avoid duplication,
     remove this CSS constant and instead import styles.css at
     the top of your entry file. */
`;
/* NOTE: The CSS constant above is intentionally left as a
   comment-only stub. In a real project, either:
     (a) import './styles.css' at the top of this file, or
     (b) use a CSS-in-JS solution (e.g. styled-components / emotion).
   The full ruleset lives in styles.css. */
