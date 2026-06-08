"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { services } from "@/data/projects";
import { profile } from "@/data/profile";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#reel" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: `mailto:${profile.email}` },
];

function isExternalLink(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      setIsScrolled(currentScrollY > 32);
      setIsVisible(scrollingUp || currentScrollY < 120);

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          className={`mx-auto flex h-[4.5rem] w-full items-center justify-between px-5 transition md:h-[6.25rem] md:px-12 ${
            isScrolled || isMenuOpen
              ? "border-b border-white/10 bg-[#141414]/92 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "bg-[#141414]"
          }`}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="brand-gradient-text text-2xl font-black uppercase tracking-[-0.06em] transition md:text-3xl"
          >
            EMANUEL
          </Link>

          <div className="hidden items-center gap-10 xl:flex">
            <Link
              href="/"
              className="text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-[#FF4D5A]"
            >
              Home
            </Link>

            <div className="group relative">
              <Link
                href="/#services"
                className="text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-[#FF4D5A]"
              >
                Services
              </Link>

              <div className="pointer-events-none absolute left-1/2 top-full w-72 -translate-x-1/2 pt-6 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="rounded-3xl border border-white/10 bg-[#141414]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.href}
                      className="group/service flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition hover:bg-white/5"
                    >
                      <span className="text-sm font-black uppercase tracking-[0.08em] text-zinc-200 transition group-hover/service:text-[#FF4D5A]">
                        {service.shortTitle}
                      </span>
                      <span className="text-xs font-black text-[#FF4D5A] opacity-0 transition group-hover/service:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item) =>
              isExternalLink(item.href) ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-[#FF4D5A]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-[#FF4D5A]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-5 md:gap-7">
            <Link
              href="/#services"
              onClick={closeMenu}
              className="hidden text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-white md:block xl:hidden"
            >
              Services
            </Link>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="group flex h-10 w-12 flex-col justify-center gap-1.5 xl:hidden"
            >
              <span
                className={`block h-px w-12 bg-zinc-300 transition group-hover:bg-[#FF4D5A] ${
                  isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`ml-auto block h-px bg-zinc-300 transition group-hover:bg-[#FF4D5A] ${
                  isMenuOpen ? "w-12 -translate-y-[3.5px] -rotate-45" : "w-8"
                }`}
              />
            </button>

            <div className="hidden h-9 w-px bg-white/40 md:block" />

            <Link
              href="/#services"
              onClick={closeMenu}
              className="hidden text-2xl font-black leading-none text-zinc-300 transition hover:text-[#FF4D5A] sm:block"
              aria-label="View work"
            >
              ⌕
            </Link>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-xl transition xl:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-[26rem] overflow-y-auto border-l border-white/10 bg-[#141414] px-5 pb-8 pt-24 shadow-2xl shadow-black/60 transition-transform duration-300 xl:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF4D5A]">
            Navigation
          </p>

          <button
            type="button"
            onClick={closeMenu}
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
          >
            Close
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-2">
          <Link
            href="/"
            onClick={closeMenu}
            className="rounded-2xl border border-white/10 px-5 py-4 text-lg font-black uppercase tracking-[-0.03em] text-white transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
          >
            Home
          </Link>

          <div className="rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setIsServicesOpen((current) => !current)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-black uppercase tracking-[-0.03em] text-white"
            >
              <span>Services</span>
              <span className="text-sm text-[#FF4D5A]">
                {isServicesOpen ? "−" : "+"}
              </span>
            </button>

            {isServicesOpen && (
              <div className="border-t border-white/10 p-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={service.href}
                    onClick={closeMenu}
                    className="group/service flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5"
                  >
                    <span className="text-sm font-black uppercase tracking-[0.08em] text-zinc-200 transition group-hover/service:text-[#FF4D5A]">
                      {service.shortTitle}
                    </span>
                    <span className="text-xs font-black text-[#FF4D5A] opacity-0 transition group-hover/service:opacity-100">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navItems.slice(1).map((item) =>
            isExternalLink(item.href) ? (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl border border-white/10 px-5 py-4 text-lg font-black uppercase tracking-[-0.03em] text-white transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl border border-white/10 px-5 py-4 text-lg font-black uppercase tracking-[-0.03em] text-white transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </aside>
    </>
  );
}
