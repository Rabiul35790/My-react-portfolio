import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { useLenis } from "./hooks/useLenis";
import { bootstrapPortfolioAutoplay, getPortfolioAudio, tryPlayPortfolioAudio } from "./lib/portfolioAudio";
import HomePage from "./pages/HomePage";

const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));

function routeLabel(pathname: string) {
  if (pathname.startsWith("/work/")) {
    return "WORK";
  }
  if (pathname.startsWith("/blog/")) {
    return "BLOG";
  }
  if (pathname === "/") {
    return "HOME";
  }
  return "PAGE";
}

export default function App() {
  const location = useLocation();
  useLenis(location.pathname);
  const previousPathRef = useRef(location.pathname);
  const [showCurtain, setShowCurtain] = useState(false);
  const [curtainKey, setCurtainKey] = useState(0);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    if (!location.hash) {
      return;
    }

    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (previousPathRef.current === location.pathname) {
      return;
    }

    previousPathRef.current = location.pathname;
    setCurtainKey((prev) => prev + 1);
    setShowCurtain(true);
  }, [location.pathname]);

  useEffect(() => {
    if (!showCurtain) {
      return;
    }

    // Failsafe: never allow the fullscreen overlay to stay stuck.
    const timeout = window.setTimeout(() => {
      setShowCurtain(false);
    }, 1300);

    return () => window.clearTimeout(timeout);
  }, [showCurtain]);

  useEffect(() => {
    const audio = getPortfolioAudio();
    if (!audio) {
      return;
    }

    bootstrapPortfolioAutoplay();
    tryPlayPortfolioAudio();

    const unlock = () => {
      tryPlayPortfolioAudio();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="pt-32 text-center font-mono text-text2">Loading...</div>}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/work/:id" element={<ProjectDetailPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showCurtain ? (
          <motion.div
            key={curtainKey}
            className="route-curtain"
            initial={{ y: "100%" }}
            animate={{ y: ["100%", "0%", "-100%"] }}
            transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], times: [0, 0.5, 1] }}
            onAnimationComplete={() => setShowCurtain(false)}
          >
            <span className="route-label">{routeLabel(location.pathname)}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
