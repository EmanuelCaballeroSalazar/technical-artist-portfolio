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

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className={`mx-auto flex h-[6.25rem] w-full items-center justify-between px-8 transition md:px-12 ${
          isScrolled
            ? "border-b border-white/10 bg-[#141414]/92 shadow-2xl shadow-black/40 backdrop-blur-xl"
            : "bg-[#141414]"
        }`}
      >
        <Link
          href="/"
          className="text-2xl font-black uppercase tracking-[-0.06em] text-white transition hover:text-[#45C7C5] md:text-3xl"
        >
          EMANUEL
        </Link>

        <div className="hidden items-center gap-12 xl:flex">
          {navItems.map((item) =>
            item.href.startsWith("mailto:") ? (
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

        <div className="flex items-center gap-7">
          <Link
            href="/#services"
            className="hidden text-[0.95rem] font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-white md:block xl:hidden"
          >
            Services
          </Link>

          <Link
            href="/#reel"
            aria-label="Open reel"
            className="group flex h-10 w-12 flex-col justify-center gap-1.5"
          >
            <span className="block h-px w-12 bg-zinc-300 transition group-hover:bg-[#45C7C5]" />
            <span className="ml-auto block h-px w-8 bg-zinc-300 transition group-hover:w-12 group-hover:bg-[#45C7C5]" />
          </Link>

          <div className="hidden h-9 w-px bg-white/40 md:block" />

          <Link
            href="/#services"
            className="text-2xl font-black leading-none text-zinc-300 transition hover:text-[#45C7C5]"
            aria-label="View work"
          >
            ⌕
          </Link>
        </div>
      </nav>
    </header>
  );
}
