"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ── tiny inline SVG icons ── */
const TreeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L6 10H9L5 18H19L15 10H18L12 2Z" fill="currentColor" opacity="0.9"/>
    <rect x="11" y="18" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.6"/>
  </svg>
);
const LeafIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.16 20C12.04 20 15.42 16.4 17 8Z" fill="currentColor" opacity="0.85"/>
    <path d="M17 8C12 8 8 12 8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
);
const HeartIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
  </svg>
);
const OxygenIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">O₂</text>
  </svg>
);

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const testimonials = [
  { name: "Priya Sharma", location: "Mumbai", text: "Planted 10 trees for my daughter's birthday. Received GPS coordinates and beautiful certificates! Truly transparent.", rating: 5 },
  { name: "Rahul Verma", location: "Delhi", text: "Our company partnered with Renukiran for CSR. The audit-ready reports and real impact tracking are exceptional.", rating: 5 },
  { name: "Anita Krishnan", location: "Bangalore", text: "Gifted trees to memorialize my grandmother. The team was compassionate, and I can see the trees growing through updates.", rating: 5 },
  { name: "Vikram Singh", location: "Jaipur", text: "The geo-tagging feature is incredible. I can pinpoint exactly where each of my 50 trees stands. Amazing transparency!", rating: 5 },
];

const focusAreas = [
  { title: "Agroforestry", desc: "Empowering farmers with sustainable agriculture and tree planting.", emoji: "🌾" },
  { title: "Miyawaki Forests", desc: "Dense, native forests in urban areas — 30x denser, 10x faster.", emoji: "🌳" },
  { title: "Mangrove Restoration", desc: "Protecting coastal ecosystems and marine biodiversity.", emoji: "🌊" },
  { title: "Rural Reforestation", desc: "Revitalizing rural landscapes for biodiversity & local economies.", emoji: "🏡" },
  { title: "Urban Green Spaces", desc: "Transforming cities to improve air quality and reduce heat.", emoji: "🏙️" },
  { title: "Food Forests", desc: "Self-sustaining ecosystems that provide continuous edible harvests.", emoji: "🍎" },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-x-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-forest/15 min-h-[560px] flex items-center">
            <div className="absolute inset-0 z-0 bg-cover bg-center scale-105 transition-transform duration-[15s] hover:scale-110" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80")'}}></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-forest/95 via-forest/70 to-transparent"></div>

            {/* Decorative floating leaves */}
            <div className="absolute top-20 right-20 z-10 opacity-20 anim-leaf">
              <LeafIcon size={48} className="text-leaf" />
            </div>
            <div className="absolute bottom-32 right-40 z-10 opacity-15 anim-leaf delay-300">
              <LeafIcon size={32} className="text-accent" />
            </div>

            <div className="relative z-20 max-w-2xl px-8 md:px-14 py-14 flex flex-col gap-7">
              <span className="anim-fade-up inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent backdrop-blur-md border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent anim-pulse-dot"></span>
                Mission 2030
              </span>
              <h1 className="anim-fade-up delay-100 heading-serif text-4xl font-black leading-[1.1] text-white md:text-[56px]">
                Every tree you plant<br/>
                <span className="text-gradient-gold">is a breath of life</span>
              </h1>
              <p className="anim-fade-up delay-200 text-base text-white/70 md:text-lg leading-relaxed max-w-lg">
                Join 25,000+ Indians who are restoring our planet through Renukiran Foundation. Plant a tree with GPS tracking, 3-year care guarantee, and a digital certificate.
              </p>
              <div className="anim-fade-up delay-300 flex flex-col sm:flex-row gap-4 mt-1">
                <Link href="/marketplace" className="h-13 px-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white text-[15px] font-bold hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-105 active:scale-95">
                  🌿 Plant a Tree — ₹299
                </Link>
                <Link href="/tracking" className="h-13 px-8 flex items-center justify-center gap-2 rounded-full bg-white/8 backdrop-blur-md border border-white/15 text-white text-[15px] font-semibold hover:bg-white/15 transition-all">
                  View Our Impact →
                </Link>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="relative z-30 mx-4 md:mx-10 -mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { emoji: "🌳", value: 12, suffix: "L+", label: "Trees Planted" },
              { emoji: "🌍", value: 50, suffix: "k Tons", label: "CO₂ Offset" },
              { emoji: "👥", value: 25, suffix: "k+", label: "Happy Donors" },
              { emoji: "📍", value: 150, suffix: "+", label: "Locations" },
            ].map((stat, i) => (
              <div key={i} className="glass flex flex-col items-center justify-center gap-1 rounded-2xl p-5 text-center border border-primary/8 shadow-lg shadow-forest/5 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <span className="text-2xl mb-1 group-hover:scale-125 transition-transform">{stat.emoji}</span>
                <p className="text-xl sm:text-2xl font-black text-forest">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-earth uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ THE PROBLEM ═══════════ */}
      <section className="py-20 md:py-28 bg-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.03]"></div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4">The Crisis</span>
            <h2 className="heading-serif text-3xl md:text-5xl font-black leading-tight mb-4">
              Our forests are<br className="hidden md:block"/> <span className="text-accent">disappearing</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">The data is alarming. But every crisis is also an opportunity to act.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "💀", stat: "7M", label: "deaths from pollution per year" },
              { emoji: "🦁", stat: "83%", label: "wildlife lost to habitat destruction" },
              { emoji: "🌡️", stat: "1.5°C", label: "global warming target at risk" },
              { emoji: "🏜️", stat: "40%", label: "of Earth's land is degraded" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/8 hover:border-accent/30 hover:bg-white/8 transition-all duration-300 group backdrop-blur-sm">
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.emoji}</span>
                <p className="text-4xl font-black text-accent mb-2 heading-serif">{item.stat}</p>
                <p className="text-white/50 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ONE TREE CAN ═══════════ */}
      <section className="py-20 md:py-28 bg-cream relative">
        <div className="absolute inset-0 line-pattern"></div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-bold tracking-[0.15em] uppercase text-xs mb-4">The Solution</span>
            <h2 className="heading-serif text-3xl md:text-5xl font-black text-forest leading-tight mb-4">
              One tree planted by <span className="text-gradient-green">you</span> can
            </h2>
            <p className="text-earth text-base max-w-xl mx-auto">You may not have the time to plant hundreds of trees. That&apos;s where Renukiran comes in.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "🫁", title: "Generate Oxygen", desc: "Sufficient for one person for an entire year" },
              { emoji: "🌿", title: "Offset Carbon", desc: "Offset your carbon footprint for 2 full weeks" },
              { emoji: "💰", title: "Economic Value", desc: "Provide ₹75,000 in ecological value per year" },
              { emoji: "🐦", title: "Support Wildlife", desc: "Habitat & food for 32+ birds and animals" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-surface border border-sand hover:shadow-xl hover:shadow-primary/5 hover:border-primary/15 transition-all duration-300 group hover:-translate-y-1">
                <span className="text-4xl mb-5 group-hover:scale-110 transition-transform">{item.emoji}</span>
                <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                <p className="text-earth text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/marketplace" className="inline-flex h-13 px-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white text-[15px] font-bold hover:shadow-xl hover:shadow-accent/25 transition-all hover:scale-105 active:scale-95">
              🌿 Plant Your Tree — ₹299
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block text-primary font-bold tracking-[0.15em] uppercase text-xs mb-4">How It Works</span>
              <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest leading-tight mb-3">
                Plant a tree in <span className="text-gradient-green">4 simple steps</span>
              </h2>
              <p className="text-earth text-base">🌳 4ft Tree + 3 Years Care + GeoTag — starting at just ₹299</p>
            </div>
            <Link href="/mission" className="hidden md:flex items-center gap-2 text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">
              See our full process →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "01", emoji: "🛒", title: "Choose & Pay", desc: "Select a tree species or gift occasion. Pay securely via UPI, card, or net banking." },
              { step: "02", emoji: "🌱", title: "We Plant", desc: "Our team plants the sapling at a verified location within 15 days of your order." },
              { step: "03", emoji: "📸", title: "Get Proof", desc: "Receive geo-tagged photos, GPS coordinates, and a personalized digital certificate." },
              { step: "04", emoji: "📈", title: "Track Growth", desc: "Monitor your tree's growth through periodic photo updates for 3 continuous years." },
            ].map((item, i) => (
              <div key={i} className="group relative flex flex-col gap-5 rounded-2xl bg-cream p-8 hover:bg-surface transition-all duration-300 border border-transparent hover:border-primary/10 hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-1">
                <span className="text-5xl font-black text-primary/10 heading-serif">{item.step}</span>
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="text-lg font-bold text-forest">{item.title}</h3>
                <p className="text-earth text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GIFT OCCASIONS ═══════════ */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4">Gift a Living Legacy</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest leading-tight mb-3">
              Plant a tree for every occasion
            </h2>
            <p className="text-earth max-w-xl mx-auto">Create eternal memories with a tree planted in their name. Each comes with a beautiful digital certificate.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: "🎂", label: "Birthday" },
              { emoji: "💐", label: "Mother" },
              { emoji: "🎁", label: "Gift" },
              { emoji: "🕯️", label: "Memorial" },
              { emoji: "👩", label: "Women's Day" },
              { emoji: "💍", label: "Anniversary" },
            ].map((item, i) => (
              <Link key={i} href="/marketplace" className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-surface border border-sand hover:shadow-xl hover:border-accent/20 transition-all duration-300 hover:-translate-y-2">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                <p className="text-sm font-bold text-forest">{item.label}</p>
                <p className="text-xs text-accent font-semibold">From ₹299</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FOCUS AREAS ═══════════ */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-bold tracking-[0.15em] uppercase text-xs mb-4">Where We Work</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Our Focus Areas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((area, i) => (
              <div key={i} className="group flex flex-col gap-4 rounded-2xl bg-cream p-8 border border-transparent hover:border-primary/10 hover:shadow-lg hover:bg-surface transition-all duration-300 hover:-translate-y-1">
                <span className="text-3xl">{area.emoji}</span>
                <h3 className="text-lg font-bold text-forest">{area.title}</h3>
                <p className="text-earth text-sm leading-relaxed">{area.desc}</p>
                <Link href="/tracking" className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:gap-2 transition-all mt-auto">
                  View Projects →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4">4.5★ Average Rating</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">What our donors say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-2xl bg-surface p-6 border border-sand transition-all duration-500 hover:border-accent hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-accent text-base">★</span>
                  ))}
                </div>
                <p className="text-earth text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-cream-dark">
                  <div className="size-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-forest">{t.name}</p>
                    <p className="text-xs text-earth">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CSR SECTION ═══════════ */}
      <section className="py-20 bg-surface relative overflow-hidden">
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex flex-col gap-6 md:w-1/2">
              <span className="text-accent font-bold tracking-[0.15em] uppercase text-xs">For Startups & Corporates</span>
              <h2 className="heading-serif text-3xl md:text-5xl font-black text-forest leading-tight">
                CSR Partnerships that <span className="text-gradient-gold">create impact</span>
              </h2>
              <p className="text-earth text-base leading-relaxed">
                Engage effortlessly in impactful CSR with streamlined, transparent tree plantation initiatives. Get audit-ready ESG reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="/csr" className="w-fit h-12 flex items-center justify-center px-8 rounded-full bg-forest text-white text-sm font-bold hover:bg-forest-light transition-all shadow-lg hover:shadow-xl">
                  Partner With Us →
                </Link>
                <a href="/brochure.pdf" download className="w-fit h-12 flex items-center justify-center px-8 rounded-full border-2 border-sand text-forest text-sm font-bold hover:border-primary hover:text-primary transition-all">
                  📄 Download Brochure
                </a>
              </div>
            </div>
            <div className="md:w-1/2 rounded-3xl overflow-hidden h-80 w-full bg-cover bg-center shadow-2xl shadow-forest/15 hover:shadow-3xl transition-shadow" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80")'}}></div>
          </div>
        </div>
      </section>

      {/* Bottom spacer for footer CTA overlap */}
      <div className="h-0 bg-surface"></div>
    </div>
  );
}
