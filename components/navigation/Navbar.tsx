"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#reel" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "mailto:13.ms.emanuel@gmail.com" },
];

function isExternalLink(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          className={`mx-auto flex h-[4.75rem] w-full items-center justify-between px-5 transition md:h-[6.25rem] md:px-12 ${
            isScrolled || isMenuOpen
              ? "border-b border-white/10 bg-[#141414]/92 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "bg-[#141414]"
          }`}
        >
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-black uppercase tracking-[-0.06em] text-white transition hover:text-[#45C7C5] md:text-3xl"
          >
            EMANUEL
          </Link>

          <div className="hidden items-center gap-12 xl:flex">
            {navItems.map((item) =>
              isExternalLink(item.href) ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-5 md:gap-7">
            <Link
              href="/#services"
              onClick={() => setIsMenuOpen(false)}
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
                className={`block h-px w-12 bg-zinc-300 transition group-hover:bg-[#45C7C5] ${
                  isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`ml-auto block h-px bg-zinc-300 transition group-hover:bg-[#45C7C5] ${
                  isMenuOpen ? "w-12 -translate-y-[3.5px] -rotate-45" : "w-8"
                }`}
              />
            </button>

            <div className="hidden h-9 w-px bg-white/40 md:block" />

            <Link
              href="/#services"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-black leading-none text-zinc-300 transition hover:text-[#45C7C5]"
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
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-sm border-l border-white/10 bg-[#141414] px-6 pb-8 pt-28 shadow-2xl shadow-black/60 transition-transform duration-300 xl:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#45C7C5]">
          Navigation
        </p>

        <div className="mt-8 flex flex-col gap-2">
          {navItems.map((item) =>
            isExternalLink(item.href) ? (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl border border-white/10 px-5 py-4 text-lg font-black uppercase tracking-[-0.03em] text-white transition hover:border-[#45C7C5] hover:text-[#45C7C5]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl border border-white/10 px-5 py-4 text-lg font-black uppercase tracking-[-0.03em] text-white transition hover:border-[#45C7C5] hover:text-[#45C7C5]"
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
