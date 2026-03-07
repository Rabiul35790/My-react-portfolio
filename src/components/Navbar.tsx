import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "/#home", label: "Home", match: "home" },
  { href: "/#work", label: "Work", match: "work" },
  { href: "/#about", label: "About", match: "about" },
  { href: "/#contact", label: "Contact", match: "contact" }
];

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inWork = location.pathname.startsWith("/work/");

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${compact ? "py-3" : "py-5"}`}>
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between border border-transparent px-6 ${compact ? "bg-bg/80 border-border backdrop-blur-md" : "bg-transparent"}`}
      >
        <Link to="/" className="font-mono text-label text-text2" data-cursor="interactive">
          RABIUL HASAN
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((item) => {
            const active = inWork ? item.match === "work" : location.hash.includes(item.match) || (location.pathname === "/" && item.match === "home" && !location.hash);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link font-mono text-label ${active ? "text-primary" : "text-text2"}`}
                data-cursor="interactive"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="font-mono text-label text-text2 md:hidden"
          data-cursor="interactive"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          MENU
        </button>
      </div>

      <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}>
        <div className="flex h-full flex-col items-center justify-center gap-7">
          {links.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-5xl text-text1"
              data-cursor="interactive"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
