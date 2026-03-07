import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { useLenis } from "./hooks/useLenis";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

function routeLabel(pathname: string) {
  if (pathname.startsWith("/work/")) {
    return "WORK";
  }
  if (pathname === "/") {
    return "HOME";
  }
  return "PAGE";
}

export default function App() {
  const location = useLocation();
  useLenis(location.pathname);

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
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${location.pathname}-curtain`}
          className="route-curtain"
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "-100%"] }}
          transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], times: [0, 0.5, 1] }}
        >
          <span className="route-label">{routeLabel(location.pathname)}</span>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
