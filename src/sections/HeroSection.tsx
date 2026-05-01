import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, MousePointerClick, Pause, Play, Volume2 } from "lucide-react";
import { bootstrapPortfolioAutoplay, getPortfolioAudio, tryPlayPortfolioAudio } from "../lib/portfolioAudio";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: "BUILDING", stroke: true },
  { text: "DIGITAL", stroke: false },
  { text: "EXPERIENCES", stroke: true }
];

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current || !bgRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const audio = getPortfolioAudio();
    if (!audio) {
      return;
    }

    const syncFromAudio = () => {
      setIsPlaying(!audio.paused);
    };

    bootstrapPortfolioAutoplay();
    tryPlayPortfolioAudio();
    syncFromAudio();

    audio.addEventListener("play", syncFromAudio);
    audio.addEventListener("pause", syncFromAudio);

    return () => {
      audio.removeEventListener("play", syncFromAudio);
      audio.removeEventListener("pause", syncFromAudio);
    };
  }, []);

  const togglePlayback = () => {
    const audio = getPortfolioAudio();
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      void audio.play();
    }
  };

  const renderMusicPlayer = () => (
    <div className={`hero-music-player ${isPlaying ? "is-playing" : "needs-attention"}`} aria-label="Portfolio music player">
      <span className="hero-music-ripple hero-music-ripple-one" aria-hidden />
      <span className="hero-music-ripple hero-music-ripple-two" aria-hidden />
      <span className="hero-music-ring" aria-hidden />
      <span className="hero-music-arm" aria-hidden />
      <span className="hero-music-click-cue" aria-hidden>
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <MousePointerClick className="h-4 w-4" />}
      </span>
      <span className="hero-music-eq" aria-hidden>
        <span />
        <span />
        <span />
      </span>
      <button
        type="button"
        onClick={togglePlayback}
        className="hero-music-toggle"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
    </div>
  );

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-end overflow-hidden pt-16 md:pt-28">
      <div ref={bgRef} className="hero-glow pointer-events-none" aria-hidden />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 pb-14">
        <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_200px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="min-w-0">
            {lines.map((line, idx) => (
              <motion.h1
                key={line.text}
                className={`font-display text-[clamp(2.7rem,12vw,9rem)] leading-none md:text-hero ${line.stroke ? "hero-stroke text-transparent" : "text-primary"}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.text.split("").map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: idx * 0.15 + i * 0.014, duration: 0.45 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            ))}
          </div>

          <div className="hero-music-wrap hidden md:flex md:justify-self-end">
            {renderMusicPlayer()}
          </div>
        </div>

        <p className="max-w-3xl font-body text-lg tracking-wide text-text2">
          Full-Stack Software Developer | Problem Solver | Computer Science Graduate
        </p>

        <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="scroll-line" />
            <span className="font-mono text-label text-text2">SCROLL</span>
          </div>

          <div className="hero-mobile-social-player">
            <div className="flex flex-col items-start gap-4 font-mono text-label text-text2 sm:items-end">
              <a
                className="flex gap-1"
                href="https://github.com/Rabiul35790/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                className="flex gap-1"
                href="https://www.linkedin.com/in/mohammad-rabiul-hasan-173481209/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>

            <div className="hero-music-wrap hero-music-wrap-mobile md:hidden">
              {renderMusicPlayer()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
