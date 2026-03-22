"use client";

import Link from "next/link";

const timeline = [
  { year: "2015", title: "Foundation Born", desc: "Renukiran Welfare Foundation started with a vision to bridge social welfare and environmental action." },
  { year: "2017", title: "First 10,000 Trees", desc: "First milestone — 10,000 trees planted across Rajasthan's arid landscapes." },
  { year: "2019", title: "CSR Launch", desc: "Launched corporate partnerships. 15 companies joined as CSR plantation partners." },
  { year: "2021", title: "Digital Platform", desc: "Launched GPS tracking, digital certificates, and online tree sponsorship." },
  { year: "2023", title: "1 Million Trees", desc: "Crossed the historic milestone of 1 million trees planted across India." },
  { year: "2026", title: "Scaling to 10M", desc: "Targeting 10 million trees by 2030 with Miyawaki, mangrove, and agroforestry expansion." },
];

const values = [
  { emoji: "👁️", title: "Transparency", desc: "Every tree GPS-tagged with geo-tagged photos. Verify your impact in real-time." },
  { emoji: "♻️", title: "Sustainability", desc: "3 years of care for every tree. 92%+ survival rate across all projects." },
  { emoji: "🤝", title: "Community", desc: "Creating livelihoods for rural communities while restoring landscapes." },
  { emoji: "✅", title: "Accountability", desc: "Audit-ready reports, quarterly updates, and 100% fund utilization." },
];

const team = [
  { name: "Renu Sharma", role: "Founder & CEO", desc: "15+ years in social welfare and environmental activism.", emoji: "👩‍💼" },
  { name: "Amit Verma", role: "Head of Operations", desc: "Manages 150+ plantation locations across India.", emoji: "👨‍💻" },
  { name: "Priya Bose", role: "CSR Partnerships", desc: "Connects corporates with impactful plantation initiatives.", emoji: "🤝" },
  { name: "Dr. Ravi Kumar", role: "Chief Botanist", desc: "PhD in Forest Ecology. Designs species selection plans.", emoji: "🌿" },
];

export default function Mission() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <div className="w-full max-w-7xl px-5 py-8 md:px-8">
        <div className="relative flex min-h-[450px] flex-col overflow-hidden rounded-3xl bg-cover bg-center items-center justify-center p-8 text-center shadow-2xl shadow-forest/15" style={{backgroundImage: "linear-gradient(rgba(12,46,26,0.4) 0%, rgba(12,46,26,0.8) 100%), url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80')"}}>
          <span className="text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4">Our Story</span>
          <h1 className="heading-serif text-white text-4xl font-black leading-tight md:text-6xl mb-4">Rooted in honesty,<br/>growing with purpose</h1>
          <p className="text-white/60 text-base max-w-lg mx-auto mb-6">Every rupee planted is a seed of hope. Zero overheads — 100% impact.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace" className="h-12 px-8 flex items-center rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">🌿 Join the Mission</Link>
            <Link href="/tracking" className="h-12 px-8 flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-semibold hover:bg-white/15 transition-all">View Projects →</Link>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="w-full max-w-5xl px-5 py-16 flex flex-col gap-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-primary font-bold tracking-[0.15em] uppercase text-xs">From Slums to Saplings</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest leading-tight">Our journey began 11 years ago</h2>
            <p className="text-earth text-base leading-relaxed">
              Renukiran started in 2015 with a simple belief: the environment and society are deeply interconnected. What began as community welfare work has grown into India&apos;s most transparent tree plantation platform.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { stat: "11+", label: "Years" },
                { stat: "1.2M+", label: "Trees" },
                { stat: "150+", label: "Locations" },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-primary/5 border border-primary/8">
                  <p className="text-xl font-black text-primary heading-serif">{s.stat}</p>
                  <p className="text-[10px] text-earth font-semibold uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img className="rounded-2xl object-cover h-64 w-full translate-y-6 shadow-lg hover:shadow-xl transition-shadow" src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80" alt="Planting" />
            <img className="rounded-2xl object-cover h-64 w-full shadow-lg hover:shadow-xl transition-shadow" src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&q=80" alt="Forest" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-surface py-20">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4">What Drives Us</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-cream border border-transparent hover:border-primary/10 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <span className="text-4xl group-hover:scale-110 transition-transform">{v.emoji}</span>
                <h3 className="text-lg font-bold text-forest">{v.title}</h3>
                <p className="text-sm text-earth leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full bg-cream py-20">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-bold tracking-[0.15em] uppercase text-xs mb-4">Milestones</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/15"></div>
            {timeline.map((item, i) => (
              <div key={i} className="relative flex items-start gap-6 mb-10">
                <div className="relative z-10 flex-shrink-0 size-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white font-bold text-xs shadow-lg shadow-primary/20 heading-serif">
                  {item.year.slice(2)}
                </div>
                <div className="pt-1">
                  <p className="text-2xl font-black text-primary/20 heading-serif">{item.year}</p>
                  <h3 className="text-lg font-bold text-forest mt-0.5">{item.title}</h3>
                  <p className="text-sm text-earth mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full bg-surface py-20">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4">Leadership</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">The People Behind the Trees</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-cream border border-transparent hover:border-primary/10 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{p.emoji}</span>
                <h3 className="text-lg font-bold text-forest">{p.name}</h3>
                <p className="text-sm text-primary font-semibold mb-2">{p.role}</p>
                <p className="text-sm text-earth">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="w-full bg-cream py-16">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="heading-serif text-2xl font-black text-forest">Trust & Compliance</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["ISO 14001 Certified", "Section 80G", "FCRA Registered", "12A Registration", "CSR1 NGO"].map((cert, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-full bg-surface border border-sand shadow-sm hover:border-primary/15 hover:shadow-md transition-all">
                <span className="text-primary text-sm">✓</span>
                <span className="text-sm font-semibold text-forest">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-0 w-full bg-cream"></div>
    </main>
  );
}
