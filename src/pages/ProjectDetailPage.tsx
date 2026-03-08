import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const projectIndex = projects.findIndex((project) => project.id === id);
  const project = projectIndex >= 0 ? projects[projectIndex] : null;

  if (!project) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 pt-24">
        <div className="text-center">
          <p className="font-display text-5xl text-text1">Project Not Found</p>
          <Link to="/" className="mt-6 inline-block font-mono text-label text-primary" data-cursor="interactive">
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-20 pt-32">
      <header>
        <p className="font-mono text-label text-primary">Project Detail</p>
        <h1 className="mt-4 font-display text-section leading-none text-text1">{project.title}</h1>
        <div className="mt-6 flex flex-wrap gap-4 border-y border-border py-4 font-mono text-label text-text2">
          <span>Year: {project.year}</span>
          <span>Role: {project.role}</span>
          <span>Stack: {project.stack.join(" / ")}</span>
        </div>

        <div className="mt-5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe btn-wipe-solid inline-flex"
            data-cursor="interactive"
          >
            <span>Live Preview</span>
          </a>
        </div>
      </header>

      <img src={project.gallery[0]} alt={`${project.title} hero`} className="project-hero-image" loading="lazy" />

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <article>
          <p className="font-mono text-label text-text2">Problem</p>
          <p className="mt-3 font-body text-base leading-relaxed text-text1">{project.problem}</p>
        </article>
        <article>
          <p className="font-mono text-label text-text2">Solution</p>
          <p className="mt-3 font-body text-base leading-relaxed text-text1">{project.solution}</p>
        </article>
      </section>

      <section className="mt-12">
        <p className="font-mono text-label text-text2">Gallery</p>
        <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-4">
          {project.gallery.map((image, index) => (
            <img
              key={`${project.id}-gallery-${index}`}
              src={image}
              alt={`${project.title} screenshot ${index + 1}`}
              className="gallery-image snap-start"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <div className="mt-16 border-t border-border pt-8">
        <Link to={`/work/${nextProject.id}`} className="font-display text-4xl text-text1" data-cursor="interactive">
          NEXT PROJECT →
        </Link>
      </div>
    </main>
  );
}
