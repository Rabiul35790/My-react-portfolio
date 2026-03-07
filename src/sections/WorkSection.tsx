import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".work-row", {
        opacity: 0,
        y: 60,
        rotateX: 8,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        transformPerspective: 1000,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={ref} className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-label text-primary">Selected Work</p>
        <p className="font-mono text-label text-text3">( 04 )</p>
      </div>

      <div className="border-t border-border">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/work/${project.id}`}
            className="work-row group grid grid-cols-12 gap-4 border-b border-border py-8 transition-colors duration-300 hover:bg-surface"
            data-cursor="project"
          >
            <div className="col-span-2 font-display text-6xl text-text3 transition-colors duration-300 group-hover:text-primary">
              {project.number}
            </div>
            <div className="col-span-6">
              <h3 className="font-display text-4xl leading-none text-text1">{project.title}</h3>
              <p className="mt-3 font-body text-base text-text2">{project.description}</p>
            </div>
            <div className="col-span-4 flex flex-wrap items-start justify-end gap-2">
              {project.stack.map((tag) => (
                <span key={tag} className="rounded-full border border-primary px-3 py-1 font-mono text-xs text-text2">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
