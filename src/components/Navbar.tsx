import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "/#home", label: "Home", match: "home" },
  { href: "/#work", label: "Work", match: "work" },
  { href: "/#about", label: "About", match: "about" },
  { href: "/#education", label: "Education", match: "education" },
  { href: "/#contact", label: "Contact", match: "contact" }
];

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const hashId = location.hash.replace("#", "");
    if (hashId) {
      setActiveSection(hashId);
    } else {
      setActiveSection("home");
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const sectionIds = links.map((link) => link.match);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          visibleRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let topSection = "home";
        let topRatio = 0;

        for (const [id, ratio] of visibleRatios.entries()) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topSection = id;
          }
        }

        if (topRatio > 0) {
          setActiveSection((prev) => (prev === topSection ? prev : topSection));
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-20% 0px -35% 0px"
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [location.pathname]);

  const inWork = location.pathname.startsWith("/work/");

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${compact ? "py-3" : "py-5"}`}>
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between border px-6 ${
          compact
            ? "bg-bg/80 border-border backdrop-blur-md"
            : "border-border bg-bg/78 backdrop-blur-md md:border-transparent md:bg-transparent md:backdrop-blur-0"
        }`}
      >
        <Link to="/" className="font-mono text-label text-text2" data-cursor="interactive">
          RABIUL HASAN
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((item) => {
            const active = inWork ? item.match === "work" : activeSection === item.match;
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
          className="font-mono text-label text-text1 md:hidden"
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
