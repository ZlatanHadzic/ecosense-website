import { useState, useEffect } from "react";

const containers = [
  { id: "KNT-001", location: "Titova 12", zone: "Centar", fill: 94, status: "critical", lastPickup: "2 dana", distance: 12 },
  { id: "KNT-002", location: "Ferhadija 7", zone: "Centar", fill: 78, status: "warning", lastPickup: "1 dan", distance: 31 },
  { id: "KNT-003", location: "Skenderija 3", zone: "Centar", fill: 31, status: "ok", lastPickup: "danas", distance: 68 },
  { id: "KNT-004", location: "Ciglane bb", zone: "Ciglane", fill: 87, status: "critical", lastPickup: "3 dana", distance: 18 },
  { id: "KNT-005", location: "Alipašina 22", zone: "Novo Sarajevo", fill: 55, status: "ok", lastPickup: "1 dan", distance: 52 },
  { id: "KNT-006", location: "Vojvode Putnika 9", zone: "Novo Sarajevo", fill: 97, status: "critical", lastPickup: "4 dana", distance: 6 },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  html { scroll-behavior: smooth; }
  
  body {
    background: #070d07;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #070d07; }
  ::-webkit-scrollbar-thumb { background: rgba(74,222,128,0.3); border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
  }
  @keyframes ripple {
    0% { transform: scale(0.8); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes scan {
    0% { top: 0%; } 100% { top: 100%; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); } to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); }
  }

  .fade-up { animation: fadeUp 0.7s ease both; }
  .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }

  .nav-link {
    color: rgba(255,255,255,0.55);
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.02em;
    transition: color 0.2s;
    padding: 4px 0;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0; right: 0;
    height: 1px;
    background: #4ade80;
    transform: scaleX(0);
    transition: transform 0.2s;
  }
  .nav-link:hover { color: #fff; }
  .nav-link:hover::after { transform: scaleX(1); }

  .card-hover {
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0,0,0,0.4) !important;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4ade80, #16a34a);
    color: #070d07;
    font-weight: 700;
    font-size: 14px;
    padding: 13px 28px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.2s, transform 0.2s;
    letter-spacing: 0.01em;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,0.6);
    font-size: 14px;
    padding: 13px 24px;
    border-radius: 12px;
    border: 1px solid rgba(74,222,128,0.2);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .btn-ghost:hover { border-color: rgba(74,222,128,0.5); color: #fff; }

  .filter-btn {
    padding: 7px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    border: 1px solid;
  }

  .mobile-menu {
    animation: slideDown 0.25s ease;
  }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
    .hero-img-col { order: -1; }
    .howitworks-grid { grid-template-columns: 1fr 1fr !important; }
    .tech-inner { grid-template-columns: 1fr !important; gap: 32px !important; }
    .dashboard-grid { grid-template-columns: 1fr 1fr !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .footer-inner { flex-direction: column !important; gap: 16px !important; text-align: center; }
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: flex !important; }
    .hero-section { padding-top: 70px !important; }
    .section-pad { padding: 72px 0 !important; }
    .h1-hero { font-size: 44px !important; }
    .h2-section { font-size: 34px !important; }
  }
  @media (max-width: 600px) {
    .howitworks-grid { grid-template-columns: 1fr !important; }
    .dashboard-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: 1fr !important; }
    .hero-stats { gap: 20px !important; flex-wrap: wrap; }
    .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
    .h1-hero { font-size: 36px !important; }
    .section-px { padding-left: 20px !important; padding-right: 20px !important; }
    .nav-px { padding-left: 20px !important; padding-right: 20px !important; }
    .dashboard-filters { flex-wrap: wrap !important; gap: 6px !important; }
    .dashboard-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
  }
`;

function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { 
        setVal(target); 
        clearInterval(t); 
      }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [target, duration]); // Dodaj 'duration' ovdje
  return val;
}

function PulseRing({ color, size = 44 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {[1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          border: `1.5px solid ${color}`,
          width: size * (0.5 + i * 0.25), height: size * (0.5 + i * 0.25),
          opacity: 0,
          animation: `ripple 2.4s ease-out ${i * 0.7}s infinite`
        }} />
      ))}
      <div style={{ width: size * 0.38, height: size * 0.38, borderRadius: "50%", background: color, boxShadow: `0 0 ${size * 0.3}px ${color}80` }} />
    </div>
  );
}

function SensorDiagram() {
  const [wave, setWave] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWave(w => (w + 1) % 100), 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: 220, background: "rgba(0,0,0,0.35)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(74,222,128,0.18)" }}>
      {/* Container shape */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 160, height: 150, border: "3px solid rgba(74,222,128,0.4)", borderTop: "none", borderRadius: "0 0 12px 12px" }} />
      <div style={{ position: "absolute", bottom: 3, left: "calc(50% - 77px)", width: 154, height: 88, background: "linear-gradient(0deg,rgba(74,222,128,0.18),rgba(74,222,128,0.05))", borderRadius: "0 0 10px 10px" }} />
      {/* Sensor */}
      <div style={{ position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)", width: 44, height: 22, background: "#0d1a0d", border: "2px solid #4ade80", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 6px" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
      </div>
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "#4ade80", letterSpacing: "0.1em", whiteSpace: "nowrap", fontFamily: "DM Mono, monospace" }}>HC-SR04</div>
      {/* Waves */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", top: 50 + i * 18, left: "50%", transform: "translateX(-50%)", width: 20 + i * 28, height: 2, borderRadius: 2, background: `rgba(74,222,128,${0.7 - i * 0.2})`, opacity: ((wave + i * 33) % 100) < 50 ? 0.8 : 0.1, transition: "opacity 0.06s" }} />
      ))}
      <div style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", textAlign: "right" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80", fontFamily: "DM Mono, monospace" }}>24cm</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>DISTANCA</div>
      </div>
      <div style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#ef4444", fontFamily: "DM Mono, monospace" }}>87%</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>PUNJENJE</div>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    setTimeout(() => document.addEventListener("click", handler), 0);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const navItems = [
    { name: "O projektu", href: "#hero" },
    { name: "Tehnologija", href: "#tehnologija" },
    { name: "Dashboard", href: "#dashboard" },
  ];

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{css}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(7,13,7,0.98)" : "rgba(7,13,7,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(74,222,128,0.1)",
        transition: "background 0.3s",
      }}>
        <div className="nav-px" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src="/logo.png" alt="EcoSense" style={{ height: 46, width: "auto", objectFit: "contain" }} />
          </div>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navItems.map(item => (
              <a key={item.name} href={item.href} className="nav-link" onClick={e => { e.preventDefault(); handleNav(item.href); }}>{item.name}</a>
            ))}
            <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }} onClick={() => handleNav("#dashboard")}>
              Kontakt
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 6, zIndex: 10 }}
            onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 24, height: 2, borderRadius: 2,
                background: menuOpen && i === 1 ? "transparent" : "#fff",
                transition: "all 0.25s",
                transform: menuOpen && i === 0 ? "translateY(7px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : "none"
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" style={{ borderTop: "1px solid rgba(74,222,128,0.1)", background: "rgba(7,13,7,0.99)", padding: "16px 24px 24px" }} onClick={e => e.stopPropagation()}>
            {navItems.map(item => (
              <a key={item.name} href={item.href} className="nav-link"
                style={{ display: "block", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 16 }}
                onClick={e => { e.preventDefault(); handleNav(item.href); }}>
                {item.name}
              </a>
            ))}
            <button className="btn-primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }} onClick={() => { setMenuOpen(false); handleNav("#dashboard"); }}>
              Kontakt
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

function Hero() {
  const cnt = useCountUp(6);
  const pct = useCountUp(94);
  return (
    <section id="hero" className="hero-section" style={{ minHeight: "100vh", background: "#070d07", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
      {/* BG glows */}
      <div style={{ position: "absolute", top: "-15%", right: "-8%", width: 700, height: 700, background: "radial-gradient(ellipse,rgba(34,197,94,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 600, height: 600, background: "radial-gradient(ellipse,rgba(74,222,128,0.04) 0%,transparent 65%)", pointerEvents: "none" }} />
      {/* Grid lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.035, pointerEvents: "none" }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <path key={i} d={`M0,${200 + i * 80} C300,${150 + i * 80} 600,${250 + i * 80} 900,${180 + i * 80} S1200,${220 + i * 80} 1200,${200 + i * 80}`} stroke="#4ade80" strokeWidth="1" fill="none" />
        ))}
      </svg>

      <div className="section-px" style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 40px", width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div className="fade-up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.22)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", animation: "blink 1.5s infinite" }} />
              <span style={{ color: "#4ade80", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace" }}>SISTEM AKTIVAN · SARAJEVO</span>
            </div>
            <h1 className="h1-hero" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 60, fontWeight: 900, color: "#fff", lineHeight: 1.06, marginBottom: 22, letterSpacing: "-0.03em" }}>
              Pametni<br />
              <span style={{ color: "#4ade80" }}>IoT senzori</span><br />
              za otpad
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 16, lineHeight: 1.8, marginBottom: 36, fontFamily: "'DM Sans', sans-serif", maxWidth: 460 }}>
              HC-SR04 ultrazvučni senzori ugrađeni u kontejnere mjere nivo punjenja u realnom vremenu i automatski šalju obavijest za odvoz — bez ljudske intervencije.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => document.querySelector("#dashboard")?.scrollIntoView({ behavior: "smooth" })}>
                Pogledaj dashboard →
              </button>
              <button className="btn-ghost" onClick={() => document.querySelector("#tehnologija")?.scrollIntoView({ behavior: "smooth" })}>
                Kako radi?
              </button>
            </div>
            <div className="hero-stats" style={{ display: "flex", gap: 40, marginTop: 44 }}>
              {[{ n: `${cnt}`, label: "Aktivnih senzora" }, { n: `${pct}%`, label: "Max. punjenje" }, { n: "24/7", label: "Monitoring" }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#4ade80", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="hero-img-col fade-up-2" style={{ position: "relative" }}>
            <div className="card-hover" style={{ borderRadius: 28, overflow: "hidden", border: "1px solid rgba(74,222,128,0.14)", boxShadow: "0 32px 80px rgba(0,0,0,0.55)", position: "relative", background: "#0d180d" }}>
              <img src="/prototip.jpg" alt="EcoSense prototip" style={{ width: "100%", height: 380, objectFit: "cover", objectPosition: "center", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 45%,rgba(7,13,7,0.88) 100%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontSize: 10, color: "#4ade80", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>PROTOTIP UREĐAJA</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>3D printano kućište sa HC-SR04 senzorom</div>
              </div>
            </div>

            {/* Float badges */}
            <div style={{ position: "absolute", top: -16, right: -16, background: "rgba(7,13,7,0.96)", border: "1px solid rgba(74,222,128,0.28)", borderRadius: 16, padding: "12px 16px", backdropFilter: "blur(20px)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>SENZOR</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#4ade80", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>HC-SR04</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>2–400cm · ±3mm</div>
            </div>
            <div style={{ position: "absolute", bottom: 88, left: -20, background: "rgba(7,13,7,0.96)", border: "1px solid rgba(239,68,68,0.28)", borderRadius: 12, padding: "10px 14px", backdropFilter: "blur(20px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", animation: "blink 1s infinite" }} />
                <div style={{ fontSize: 11, color: "#ef4444", fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>KNT-006 · 97% PUNO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "📡", code: "HCSR04", title: "Ultrazvučni senzor mjeri", desc: "HC-SR04 senzor šalje ultrazvučni impuls i mjeri povratak echa. Precizno izračunava rastojanje do otpada unutar kontejnera.", detail: "Frekvencija: 40kHz · Raspon: 2–400cm · Tačnost: ±3mm" },
    { icon: "🔌", code: "ESP32", title: "Mikrokontroler obrađuje", desc: "ESP32 prikuplja mjerenja, izračunava postotak punjenja i šalje podatke putem WiFi/MQTT protokola na cloud server.", detail: "WiFi 802.11b/g/n · MQTT · OTA update" },
    { icon: "☁️", code: "CLOUD", title: "Platforma analizira", desc: "EcoSense cloud prati sve senzore u realnom vremenu, detektuje kritičan nivo (>85%) i kreira zahtjev za odvoz.", detail: "Real-time · Threshold alert · Auto-routing" },
    { icon: "🚛", code: "NOTIFY", title: "Automatska obavijest", desc: "Kada senzor detektuje kritičan nivo, sistem automatski obavijesti komunalnu službu sa tačnom lokacijom i prioritetom.", detail: "GPS lokacija · Push notifikacija · Email/SMS" },
  ];

  return (
    <section id="tehnologija" className="section-pad" style={{ background: "#0b160b", padding: "100px 0" }}>
      <div className="section-px" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "#4ade80", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>TEHNOLOGIJA</div>
          <h2 className="h2-section" style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>Kako naši senzori rade</h2>
        </div>

        <div className="howitworks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
          {steps.map((s, i) => (
            <div key={i} className="card-hover" style={{
              background: i % 2 === 0 ? "rgba(74,222,128,0.04)" : "rgba(255,255,255,0.02)",
              border: "1px solid rgba(74,222,128,0.1)",
              padding: 28,
              position: "relative",
              borderRadius: i === 0 ? "16px 0 0 16px" : i === 3 ? "0 16px 16px 0" : 4,
            }}>
              {i < 3 && (
                <div style={{ position: "absolute", right: -11, top: "50%", transform: "translateY(-50%)", width: 20, height: 20, borderRadius: "50%", background: "#4ade80", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#070d07", fontWeight: 700 }}>→</div>
              )}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#4ade80", letterSpacing: "0.12em", marginBottom: 16 }}>0{i + 1} · {s.code}</div>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 10, lineHeight: 1.35 }}>{s.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>{s.desc}</p>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(74,222,128,0.55)", lineHeight: 1.9 }}>{s.detail}</div>
            </div>
          ))}
        </div>

        {/* Sensor diagram section */}
        <div className="tech-inner" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ color: "#4ade80", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>LIVE SIMULACIJA</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 14 }}>HC-SR04 u kontejneru</h3>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 14, lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
              Senzor je montiran na vrhu kontejnera i mjeri udaljenost od poklopca do sadržaja. Kada rastojanje padne ispod praga, kontejner je pun.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[["Napon napajanja", "5V DC"], ["Frekvencija", "40 kHz"], ["Raspon mjerenja", "2–400 cm"], ["Tačnost", "±3 mm"], ["Kut detekcije", "15°"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>{k}</span>
                  <span style={{ color: "#4ade80", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <SensorDiagram />
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [sent, setSent] = useState([]);
  const [sending, setSending] = useState(null);

  const filtered = filter === "all" ? containers : containers.filter(c => c.status === filter);

  const handleSend = (id, e) => {
    e.stopPropagation();
    if (sent.includes(id) || sending === id) return;
    setSending(id);
    setTimeout(() => { setSending(null); setSent(s => [...s, id]); }, 1800);
  };

  const statusColor = { critical: "#ef4444", warning: "#f59e0b", ok: "#4ade80" };
  const statusLabel = { critical: "KRITIČNO", warning: "UPOZORENJE", ok: "UREDNO" };
  const statusBg = { critical: "rgba(239,68,68,0.06)", warning: "rgba(245,158,11,0.04)", ok: "rgba(74,222,128,0.04)" };

  const filterOpts = [
    ["all", "Svi", "rgba(255,255,255,0.7)"],
    ["critical", "Kritično", "#ef4444"],
    ["warning", "Upozorenje", "#f59e0b"],
    ["ok", "Uredno", "#4ade80"],
  ];

  return (
    <section id="dashboard" className="section-pad" style={{ background: "#070d07", padding: "100px 0" }}>
      <div className="section-px" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div className="dashboard-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
          <div>
            <div style={{ color: "#4ade80", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>LIVE DASHBOARD</div>
            <h2 className="h2-section" style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>Stanje senzora</h2>
          </div>
          <div className="dashboard-filters" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filterOpts.map(([v, l, c]) => (
              <button key={v} className="filter-btn" onClick={() => setFilter(v)} style={{
                borderColor: filter === v ? c : "rgba(255,255,255,0.08)",
                background: filter === v ? `${c}18` : "transparent",
                color: filter === v ? c : "rgba(255,255,255,0.38)",
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {filtered.map(c => (
            <div key={c.id} className="card-hover" style={{
              background: statusBg[c.status],
              border: `1px solid ${c.status === "critical" ? "rgba(239,68,68,0.18)" : c.status === "warning" ? "rgba(245,158,11,0.1)" : "rgba(74,222,128,0.08)"}`,
              borderRadius: 20,
              padding: 24,
              cursor: "default",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "'DM Mono', monospace", marginBottom: 4, letterSpacing: "0.06em" }}>{c.id}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{c.location}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>Zona: {c.zone}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: statusColor[c.status], fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{c.fill}%</div>
                  <div style={{ fontSize: 9, color: statusColor[c.status], letterSpacing: "0.1em", marginTop: 4 }}>{statusLabel[c.status]}</div>
                </div>
              </div>

              {/* Fill bar */}
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, marginBottom: 14, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${c.fill}%`, background: `linear-gradient(90deg, ${statusColor[c.status]}90, ${statusColor[c.status]})`, borderRadius: 3, boxShadow: `0 0 8px ${statusColor[c.status]}50`, transition: "width 1s ease" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif", marginBottom: c.status === "critical" ? 14 : 0 }}>
                <span>Zadnji odvoz: <span style={{ color: "rgba(255,255,255,0.5)" }}>{c.lastPickup}</span></span>
                <span>Distanca: <span style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.5)" }}>{c.distance}cm</span></span>
              </div>

              {c.status === "critical" && (
                <button onClick={e => handleSend(c.id, e)} style={{
                  width: "100%", padding: "10px 0", borderRadius: 10, fontSize: 11, fontWeight: 700,
                  cursor: sent.includes(c.id) ? "default" : "pointer",
                  letterSpacing: "0.06em", border: "none", fontFamily: "'DM Mono', monospace",
                  transition: "all 0.3s",
                  background: sent.includes(c.id) ? "rgba(74,222,128,0.1)" : sending === c.id ? "rgba(96,165,250,0.1)" : "rgba(239,68,68,0.1)",
                  color: sent.includes(c.id) ? "#4ade80" : sending === c.id ? "#60a5fa" : "#ef4444",
                  outline: "none",
                }}>
                  {sent.includes(c.id) ? "✓ OBAVIJEST POSLANA" : sending === c.id
                    ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>⟳</span> SLANJE...</span>
                    : "⚠ POŠALJI OBAVIJEST ZA ODVOZ"}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="stats-grid" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[
            { label: "Ukupno senzora", val: "6", color: "#4ade80", sub: "aktivni" },
            { label: "Kritičan nivo", val: String(containers.filter(c => c.status === "critical").length), color: "#ef4444", sub: "zahtijeva odvoz" },
            { label: "Prosj. punjenje", val: Math.round(containers.reduce((a, c) => a + c.fill, 0) / containers.length) + "%", color: "#f59e0b", sub: "svih kontejnera" },
            { label: "Senzori online", val: "6/6", color: "#4ade80", sub: "100% uptime" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: "18px 20px", display: "flex", gap: 14, alignItems: "center" }}>
              <PulseRing color={s.color} size={40} />
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginTop: 3 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#040a04", borderTop: "1px solid rgba(74,222,128,0.07)", padding: "44px 0" }}>
      <div className="section-px footer-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="EcoSense" style={{ height: 42, width: "auto", objectFit: "contain" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>Smart IoT Waste Management · Sarajevo, 2025</span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>HC-SR04 · ESP32 · MQTT · Cloud</div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ background: "#070d07" }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Dashboard />
      <Footer />
    </div>
  );
}