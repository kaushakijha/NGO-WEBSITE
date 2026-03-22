"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Plant a Tree" },
  { href: "/tracking", label: "Our Impact" },
  { href: "/csr", label: "CSR Partners" },
  { href: "/mission", label: "About Us" },
];

// Inline SVG leaf icon for branding
const LeafLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C16 2 6 8 6 18C6 23.5228 10.4772 28 16 28C21.5228 28 26 23.5228 26 18C26 8 16 2 16 2Z" fill="#047857" opacity="0.9"/>
    <path d="M16 8C16 8 11 13 11 19C11 21.7614 13.2386 24 16 24C18.7614 24 21 21.7614 21 19C21 13 16 8 16 8Z" fill="#34d399" opacity="0.6"/>
    <path d="M16 28V12" stroke="#faf8f3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    <path d="M16 18L12 14" stroke="#faf8f3" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <path d="M16 15L19 12" stroke="#faf8f3" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

import { useCart } from "./CartProvider";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/me").then(r => r.json()).then(d => {
      if (d.user) setUser(d.user);
      else setUser(null);
    }).catch(() => setUser(null));
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-forest/5 border-b border-primary/10"
          : "bg-cream/80 backdrop-blur-sm border-b border-sand"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <LeafLogo />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[17px] font-heading font-bold text-forest tracking-tight">Renukiran</h1>
            <span className="text-[9px] text-earth font-semibold tracking-[0.2em] uppercase">Foundation</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-bark/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center size-10 rounded-full bg-sand text-forest hover:bg-[#eae5d8] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Auth Button */}
          {user ? (
            <Link 
              href={user.role === "admin" ? "/admin" : "/dashboard"}
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-forest text-sm font-bold hover:bg-primary/20 transition-colors shadow-sm"
            >
              <span className="text-primary text-lg">👤</span> {user.role === "admin" ? "Admin Panel" : "My Dashboard"}
            </Link>
          ) : (
            <Link 
              href="/login"
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-sand text-forest text-sm font-bold hover:bg-cream transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}

          {/* Gold accent donate button */}
          <Link
            href="/marketplace"
            className="hidden lg:flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light px-6 text-[13px] font-bold text-white shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1C8 1 3 4 3 9C3 11.7614 5.23858 14 8 14C10.7614 14 13 11.7614 13 9C13 4 8 1 8 1Z" fill="white" opacity="0.9"/>
            </svg>
            Plant a Tree
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-bark hover:text-primary rounded-xl hover:bg-primary/5 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="16" y2="12" />
                  <line x1="4" y1="17" x2="12" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 pb-5 pt-2 bg-cream border-t border-sand">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-semibold px-4 py-3.5 rounded-xl transition-all ${
                  isActive
                    ? "text-primary bg-primary/8 font-bold"
                    : "text-bark/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => setIsCartOpen(true)}
            className="mt-2 text-[14px] font-semibold px-4 py-3.5 rounded-xl transition-all text-left text-bark/70 hover:text-primary hover:bg-primary/5 flex items-center gap-2"
          >
            🛒 View Cart {totalItems > 0 ? `(${totalItems} items)` : ""}
          </button>
          
          <Link
            href={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login"}
            className="text-[14px] font-semibold px-4 py-3.5 rounded-xl transition-all text-left text-bark/70 hover:text-primary hover:bg-primary/5 flex items-center gap-2"
          >
            👤 {user ? "My Dashboard" : "Sign In"}
          </Link>
          
          <Link
            href="/marketplace"
            className="mt-3 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-[14px] font-bold text-white shadow-md"
          >
            🌿 Plant a Tree — ₹299
          </Link>
        </nav>
      </div>
    </header>
  );
}
