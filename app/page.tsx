"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string; no: string; type: string; title: string; short: string; detail: string;
  stack: string[]; status: string; accent: string; live?: string; section: string; logo?: string;
};

const projects: Project[] = [
  {id:"dhr",no:"01",type:"MOBILE PRODUCT · MVP",title:"Digital House Rents",short:"Rental operations for landlords, tenants and admins.",detail:"A connected rental-management MVP covering properties, tenants, billing, complaints, reports, chat and payment flows.",stack:["React Native","Expo","Firebase","Express","Razorpay"],status:"WORKING MVP",accent:"cyan",section:"digital-house-rents",logo:"/projects/digital-house-rents.png"},
  {id:"hrg",no:"02",type:"WEB PRODUCT · LIVE",title:"Heavy Rent Go",short:"Heavy machinery rental made easier.",detail:"A construction-equipment rental concept focused on discovering machinery and moving toward a booking journey with less friction.",stack:["Web App","Product Design","Rental Flow"],status:"LIVE DEMO",accent:"orange",live:"https://heavy-rent-go.lovable.app/",section:"heavy-rent-go",logo:"/projects/heavy-rent-go.svg"},
  {id:"partybox",no:"03",type:"WEB + API · BUILD",title:"PartyBox",short:"Discover. Decide. Book. Experience.",detail:"An event discovery and booking platform for parties, concerts, comedy shows and live experiences, rebuilt with a Next.js frontend and Express/MongoDB backend.",stack:["Next.js","Tailwind","Express","MongoDB"],status:"IN BUILD",accent:"violet",section:"partybox",logo:"/projects/partybox.jpeg"},
];

const skills = ["React Native","Expo","Flutter","Next.js","React","TypeScript","JavaScript","HTML5","CSS","Tailwind CSS","Firebase","AWS","Express","MongoDB","MySQL","Python","C","Windows"];

export default function Home() {
  const [active, setActive] = useState("home");
  const [cursor, setCursor] = useState({x:-100,y:-100});
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => filter === "ALL" ? projects : projects.filter(p => p.type.includes(filter)), [filter]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({x:e.clientX,y:e.clientY});
    const onScroll = () => {
      const ids = ["home","work","about","journey","contact"];
      let current = "home";
      for (const id of ids) { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 180) current = id; }
      setActive(current);
    };
    window.addEventListener("mousemove", onMove); window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); };
  }, []);

  const copyEmail = async () => { await navigator.clipboard?.writeText("subhash4321733856@gmail.com"); setCopied(true); setTimeout(()=>setCopied(false),1800); };

  return (
    <main>
      <div className="cursor" style={{transform:`translate3d(${cursor.x}px,${cursor.y}px,0)`}} />
      <div className="noise" />
      <header className="nav">
        <a href="#home" className="brand"><span>S</span> SUBHASH <small>02.0</small></a>
        <nav className="desktop-nav">{["home","work","about","journey","contact"].map(id=><a key={id} className={active===id?"active":""} href={`#${id}`}>{id}</a>)}</nav>
        <div className="nav-actions"><a href="/Subhash-Resume.pdf" target="_blank" className="resume-mini">RESUME ↗</a><button aria-label="menu" className="menu-btn" onClick={()=>setMenu(!menu)}>☰</button></div>
      </header>
      {menu && <div className="mobile-menu">{["home","work","about","journey","contact"].map(id=><a onClick={()=>setMenu(false)} key={id} href={`#${id}`}>{id}</a>)}</div>}

      <section id="home" className="hero section-shell">
        <div className="hero-bg"><span/><span/><span/><span/></div>
        <div className="hero-copy">
          <div className="eyebrow"><i/> INFORMATION SCIENCE ENGINEER · BENGALURU</div>
          <h1>BUILDING <em>USEFUL</em><br/><span>DIGITAL</span> THINGS.</h1>
          <p className="hero-lead">I&apos;m <b>Subhash M</b> — a developer who turns practical problems into mobile and web products.</p>
          <div className="hero-buttons"><a className="btn primary" href="#work">EXPLORE WORK <span>↓</span></a><a className="btn" href="/Subhash-Resume.pdf" target="_blank">VIEW RESUME ↗</a></div>
          <div className="hero-meta"><span>AVAILABLE FOR<br/><b>OPPORTUNITIES</b></span><span>BASED IN<br/><b>BENGALURU, INDIA</b></span><span>01 — 03<br/><b>SELECTED BUILDS</b></span></div>
        </div>
        <div className="portrait-wrap">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
          <div className="portrait-glow"/>
          <Image className="portrait" src="/subhash-profile.jpeg" alt="Subhash M" width={650} height={800} priority />
          <div className="portrait-label"><span>SUBHASH M</span><small>DEVELOPER / BUILDER</small></div>
          <div className="floating-card card-one"><b>03</b><span>PRODUCTS<br/>IN FOCUS</span></div>
          <div className="floating-card card-two"><b>01</b><span>AWS CLOUD<br/>CERTIFICATION</span></div>
        </div>
        <div className="scroll-cue">SCROLL <span>↓</span></div>
      </section>

      <section className="manifesto"><div className="manifesto-index">01 / MINDSET</div><h2>Great products aren&apos;t just <i>designed.</i><br/>They&apos;re <span>engineered</span><br/>from the experience down.</h2><p>Product thinking · interface craft · practical engineering · continuous learning</p></section>

      <section id="work" className="work section-shell">
        <div className="section-top"><div><div className="eyebrow">SELECTED WORK</div><h2>Things I&apos;ve <i>built.</i></h2></div><div className="filter-row">{["ALL","MOBILE","WEB","BUILD"].map(f=><button className={filter===f?"selected":""} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
        <div className="project-grid">
          {filtered.map(p=><article key={p.id} className={`project ${p.accent}`} onClick={()=>p.live ? window.open(p.live,"_blank","noopener,noreferrer") : setSelected(p)}>
            <div className="project-no">{p.no}<span>{p.status}</span></div>
            <div className={`project-art logo-art ${p.accent}`}><div className="art-grid"/><div className="logo-orbit"/><div className="project-logo-frame">{p.logo?.endsWith(".svg") ? <img src={p.logo} alt={`${p.title} logo`} className="project-logo"/> : <Image src={p.logo || ""} alt={`${p.title} logo`} width={420} height={420} className="project-logo"/>}</div><div className="logo-number">{p.no}</div></div>
            <div className="project-body"><div className="project-type">{p.type}</div><h3>{p.title}<sup>↗</sup></h3><p>{p.short}</p><div className="tag-row">{p.stack.slice(0,4).map(s=><span key={s}>{s}</span>)}</div></div>
          </article>)}
        </div>
        <div className="work-footer"><span>MORE CASE STUDIES COMING AS THEY SHIP</span><span>03 / 03</span></div>
      </section>

      <section id="digital-house-rents" className="feature feature-dark section-shell">
        <div className="feature-head"><div><div className="eyebrow">CASE STUDY · 01</div><h2>Digital House<br/><i>Rents.</i></h2></div><span className="case-no">01</span></div>
        <div className="feature-sub"><p>Rental operations turned into one connected product for landlords, tenants and admins.</p><div className="flow"><b>ADMIN</b><span>→</span><b>LANDLORD</b><span>→</span><b>TENANT</b></div></div>
        <div className="feature-stats"><div><small>STATUS</small><b>WORKING MVP</b></div><div><small>PLATFORM</small><b>REACT NATIVE / EXPO</b></div><div><small>BACKEND</small><b>FIREBASE + EXPRESS</b></div><div><small>PAYMENTS</small><b>RAZORPAY FLOW</b></div></div>
        <div className="feature-grid"><div><span>01</span><h3>Property control</h3><p>Manage properties, occupancy, images and tenant assignments.</p></div><div><span>02</span><h3>Billing engine</h3><p>Generate bills, track history and produce reports for rental operations.</p></div><div><span>03</span><h3>Complaints</h3><p>Tenants raise maintenance requests while landlords track status.</p></div><div><span>04</span><h3>Communication</h3><p>Role-based dashboards with chat and notification structures.</p></div></div>
        <div className="engineering-note"><strong>ENGINEERING HONESTY</strong><p>This is a working MVP/demo. Before public production, authentication, payment verification, privacy, security rules, accessibility and scale still need hardening.</p></div>
      </section>

      <section id="heavy-rent-go" className="feature-light section-shell"><div className="split-heading"><div><div className="eyebrow">LIVE PROJECT · 02</div><h2>Heavy <i>Rent Go.</i></h2></div><a className="live-pill" href="https://heavy-rent-go.lovable.app/" target="_blank" rel="noreferrer">OPEN LIVE DEMO ↗</a></div><div className="machinery-scene"><div className="sun"/><div className="machine machine-a">▰</div><div className="machine machine-b">▰</div><div className="road"/></div><div className="light-details"><div><small>PROBLEM</small><h3>Finding the right machine shouldn&apos;t feel like a construction-site scavenger hunt.</h3></div><div><small>PRODUCT IDEA</small><p>Make heavy machinery rental feel familiar: discover equipment, compare options and move toward booking with confidence.</p></div><div><small>FOCUS</small><p>Clarity · trust · availability · rental journey</p></div></div></section>

      <section id="partybox" className="partybox section-shell"><div className="party-top"><div><div className="eyebrow">CASE STUDY · 03</div><h2>Party<span>Box.</span></h2><p>Discover. Decide. Book. Experience.</p></div><div className="ticket">NEXT<br/><b>EVENT</b><strong>→</strong></div></div><div className="party-flow"><div><b>01</b><h3>DISCOVER</h3><p>Search by city, category and keyword.</p></div><div><b>02</b><h3>DECIDE</h3><p>Venue, gallery, date, time and ticket details.</p></div><div><b>03</b><h3>BOOK</h3><p>Move from intent to a clear ticket journey.</p></div></div><div className="code-strip"><span>FRONTEND</span><b>NEXT.JS + TAILWIND</b><span>API</span><b>EXPRESS + MONGODB</b><span>STATUS</span><b>IN BUILD</b></div></section>

      <section id="about" className="about section-shell"><div className="about-photo"><Image src="/subhash-profile.jpeg" alt="Subhash M portrait" width={520} height={650}/><span>ALWAYS LEARNING / ALWAYS BUILDING</span></div><div className="about-copy"><div className="eyebrow">ABOUT THE BUILDER</div><h2>Curious enough to start.<br/><i>Stubborn enough to finish.</i></h2><p>I&apos;m Subhash, a B.E. Information Science &amp; Engineering graduate. I like building practical products where software can remove friction from everyday work.</p><p>My projects sit across mobile apps, web products, backend APIs and cloud-connected workflows. I&apos;m still growing — and I&apos;d rather show the work, the trade-offs and the next iteration than pretend everything is finished.</p><div className="signature">SUBHASH M<span>·</span></div></div></section>

      <section className="skills section-shell"><div className="section-top"><div><div className="eyebrow">TOOLBOX</div><h2>My technical <i>range.</i></h2></div><span className="section-note">I learn by building.</span></div><div className="skill-cloud">{skills.map((s,i)=><span style={{"--i":i} as React.CSSProperties} key={s}>{s}</span>)}</div></section>

      <section id="journey" className="journey section-shell"><div className="eyebrow">JOURNEY</div><h2>Where the <i>foundation</i> came from.</h2><div className="timeline"><article><time>2024 — 2025</time><div><span className="timeline-dot"/><h3>Rooman Technologies</h3><p>Intern · Web &amp; Mobile App Development</p><ul><li>165 hours of full-stack training.</li><li>90 hours of IBM-led real-time projects.</li><li>Hands-on work with HTML, CSS, JavaScript, Flutter and React Native.</li><li>Exposure to Firebase, AWS, OAuth2 and JWT.</li></ul></div></article><article><time>2025</time><div><span className="timeline-dot"/><h3>B.E. Information Science &amp; Engineering</h3><p>Jyothy Institute of Technology · VTU</p><strong>CGPA 7.2 · Graduated July 2025</strong></div></article><article><time>2024</time><div><span className="timeline-dot"/><h3>AWS Academy Cloud Foundations</h3><p>Certification · Cloud fundamentals</p></div></article><article><time>ACADEMIC</time><div><span className="timeline-dot"/><h3>Projects that started the habit</h3><p>Resort Management System · MySQL / PHP / DBMS</p><p>Real-Time Sign Language Detection · CNN / DBN / OpenCV / Flask</p></div></article></div></section>

      <section className="proof section-shell"><div className="proof-card"><span>01</span><b>REAL-WORLD PROBLEMS</b><p>Rental management</p></div><div className="proof-card"><span>02</span><b>PRODUCT TYPES</b><p>Mobile · Web · API</p></div><div className="proof-card"><span>03</span><b>CORE HABIT</b><p>Build → test → improve</p></div><div className="proof-card"><span>04</span><b>CREATIVE SIDE</b><p>Video editing</p></div></section>

      <section id="contact" className="contact section-shell"><div className="contact-top"><div className="eyebrow">HAVE A PROJECT / ROLE / IDEA?</div><span>LET&apos;S CONNECT</span></div><h2>Let&apos;s build<br/><i>something useful.</i></h2><div className="contact-bottom"><a href="mailto:subhash4321733856@gmail.com">subhash4321733856@gmail.com ↗</a><div className="contact-actions"><button onClick={copyEmail}>{copied?"COPIED ✓":"COPY EMAIL"}</button><a href="https://www.linkedin.com/in/subhash-m-662168235" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></div><footer><span>© 2026 SUBHASH M</span><span>BUILT WITH NEXT.JS</span><a href="#home">BACK TO TOP ↑</a></footer></section>

      {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><div className="eyebrow">{selected.type}</div><h2>{selected.title}</h2><p>{selected.detail}</p><div className="modal-grid"><div><small>STATUS</small><b>{selected.status}</b></div><div><small>STACK</small><b>{selected.stack.join(" · ")}</b></div></div><a className="btn primary" href={`#${selected.section}`} onClick={()=>setSelected(null)}>VIEW CASE STUDY ↓</a></div></div>}
    </main>
  );
}
