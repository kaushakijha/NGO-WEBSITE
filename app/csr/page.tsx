"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const csrServices = [
  { emoji: "🌳", title: "CSR Tree Plantation", desc: "End-to-end plantation initiatives with transparent tracking, GPS tagging, and audit-ready reports.", features: ["Geo-tagged trees", "Quarterly reports", "Tax benefits under 80G"] },
  { emoji: "🛍️", title: "D2C Sustainability", desc: "Empower your D2C brand with carbon-neutral operations and eco-first packaging solutions.", features: ["Carbon-neutral shipping", "Green brand stories", "Consumer trust badges"] },
  { emoji: "👥", title: "Employee Engagement", desc: "Team plantation drives that build culture, create ESG value, and genuinely improve the environment.", features: ["Virtual plantation events", "Individual certificates", "Impact dashboards"] },
];

export default function CSR() {
  const [formData, setFormData] = useState({ company: "", email: "", phone: "", trees: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/partners", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setPartners(json.data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ company: "", email: "", phone: "", trees: "", message: "" });
  };

  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section className="p-5 md:p-8 max-w-[1440px] mx-auto">
        <div className="relative flex min-h-[450px] flex-col overflow-hidden rounded-3xl bg-cover bg-center items-start justify-end px-8 pb-14 pt-32 md:px-14 shadow-2xl shadow-forest/15" style={{backgroundImage: "linear-gradient(rgba(12,46,26,0.3) 0%, rgba(12,46,26,0.85) 100%), url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80')"}}>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent backdrop-blur-md border border-accent/20 mb-5">
            For Startups & Corporates
          </span>
          <h1 className="heading-serif text-white text-4xl md:text-5xl font-black leading-tight mb-3">Corporate CSR Solutions</h1>
          <p className="text-white/60 text-base max-w-xl mb-6">Partner with Renukiran to achieve ESG goals through impactful, transparent plantation initiatives.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="h-12 px-8 flex items-center rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all">Get Started →</a>
            <a href="#services" className="h-12 px-8 flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-semibold hover:bg-white/15 transition-all">Explore Services</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "🏢", stat: "100+", label: "Corporate Partners" },
            { emoji: "🌳", stat: "5L+", label: "CSR Trees Planted" },
            { emoji: "💰", stat: "₹2Cr+", label: "Funds Deployed" },
            { emoji: "📍", stat: "50+", label: "Cities Covered" },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-surface border border-sand shadow-sm hover:shadow-lg hover:border-primary/15 transition-all group hover:-translate-y-1">
              <span className="text-2xl mb-2 inline-block group-hover:scale-110 transition-transform">{item.emoji}</span>
              <p className="text-2xl md:text-3xl font-black text-primary heading-serif">{item.stat}</p>
              <p className="text-xs text-earth font-semibold mt-1 uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Partners Dynamic Section */}
      {partners.length > 0 && (
        <section className="py-12 border-t border-b border-sand bg-white">
          <div className="max-w-[1280px] mx-auto px-5 text-center">
            <p className="text-xs font-bold text-earth uppercase tracking-[0.15em] mb-8">Trusted by industry leaders in sustainability</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
              {partners.map((p) => (
                <div key={p._id} className="flex flex-col items-center gap-2 group cursor-default transition-all hover:scale-105 hover:opacity-100 grayscale hover:grayscale-0">
                  <img src={p.logoUrl} alt={p.companyName} className="h-10 md:h-14 object-contain max-w-[140px]" />
                  <span className="text-[10px] font-bold text-accent px-2 py-0.5 bg-accent/10 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                    {(p.treesSponsored || 0).toLocaleString()} Trees
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Partner */}
      <section className="py-16 bg-surface">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-bold tracking-[0.15em] uppercase text-xs mb-4">Partnership Benefits</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Why partner with Renukiran?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { emoji: "🌍", title: "Carbon Offsetting", desc: "Offset your company's carbon footprint with verified, GPS-tagged tree plantations across India." },
              { emoji: "📊", title: "ESG Compliance", desc: "Receive audit-ready, quarterly impact reports that meet all ESG compliance requirements." },
              { emoji: "🤝", title: "Community Impact", desc: "Create rural livelihoods while restoring degraded landscapes — real social and environmental ROI." },
            ].map((item, i) => (
              <div key={i} className="group flex flex-col gap-5 rounded-2xl border border-sand bg-cream p-8 hover:shadow-xl hover:border-primary/15 hover:bg-surface transition-all duration-300 hover:-translate-y-1">
                <span className="text-3xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <h3 className="text-xl font-bold text-forest">{item.title}</h3>
                <p className="text-earth leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-cream">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4">Our Services</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Tailored solutions for your CSR goals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {csrServices.map((s, i) => (
              <div key={i} className="flex flex-col gap-5 rounded-2xl bg-surface p-8 border border-sand shadow-sm hover:shadow-xl hover:border-primary/15 transition-all duration-300 group hover:-translate-y-1">
                <span className="text-3xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                <h3 className="text-xl font-bold text-forest">{s.title}</h3>
                <p className="text-earth text-sm leading-relaxed">{s.desc}</p>
                <ul className="space-y-2 mt-auto pt-4 border-t border-cream-dark">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-earth">
                      <span className="text-primary text-xs">●</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-surface">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl font-black text-forest">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: "01", emoji: "📞", title: "Connect", desc: "Share your CSR goals and budget with our team." },
              { step: "02", emoji: "📋", title: "Plan", desc: "We design a customized plantation strategy." },
              { step: "03", emoji: "🌱", title: "Execute", desc: "Trees planted with full documentation & geo-tagging." },
              { step: "04", emoji: "📈", title: "Report", desc: "ESG-compliant impact reports delivered quarterly." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-cream border border-transparent hover:border-primary/10 transition-all">
                <span className="text-4xl font-black text-primary/10 heading-serif">{item.step}</span>
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="text-lg font-bold text-forest">{item.title}</h3>
                <p className="text-sm text-earth">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="inline-block text-primary font-bold tracking-[0.15em] uppercase text-xs mb-4">Get Started</span>
            <h2 className="heading-serif text-3xl font-black text-forest mb-2">Partner with Renukiran</h2>
            <p className="text-earth text-sm">Our CSR team will respond within 24 hours.</p>
          </div>
          {submitted ? (
            <div className="text-center p-12 rounded-2xl bg-primary/5 border border-primary/15">
              <span className="text-5xl mb-4 inline-block">✅</span>
              <h3 className="heading-serif text-2xl font-bold text-forest mb-2">Thank You!</h3>
              <p className="text-earth">Our team will reach out within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-surface rounded-2xl p-8 border border-sand shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-forest mb-2">Company Name *</label>
                  <input type="text" required className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors" placeholder="Your company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-forest mb-2">Work Email *</label>
                  <input type="email" required className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-forest mb-2">Phone</label>
                  <input type="tel" className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-forest mb-2">Number of Trees</label>
                  <select className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors" value={formData.trees} onChange={(e) => setFormData({...formData, trees: e.target.value})}>
                    <option value="">Select range</option>
                    <option>100 – 500</option>
                    <option>500 – 1,000</option>
                    <option>1,000 – 5,000</option>
                    <option>5,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-forest mb-2">Message</label>
                <textarea rows={4} className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors resize-none" placeholder="Tell us about your CSR goals..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button type="submit" className="w-full md:w-auto md:self-end h-12 px-10 rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all">
                Submit Enquiry →
              </button>
            </form>
          )}
        </div>
      </section>
      <div className="h-0 bg-cream"></div>
    </main>
  );
}
