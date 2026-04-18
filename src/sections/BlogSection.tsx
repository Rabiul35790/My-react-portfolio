import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "../data/blogPosts";

gsap.registerPlugin(ScrollTrigger);

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}

export function BlogSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".blog-item", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
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
    <section id="blog" ref={ref} className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-label text-primary">Blog</p>
          <p className="font-mono text-label text-text3">( {blogPosts.length.toString().padStart(2, "0")} )</p>
        </div>
        <h2 className="font-display text-section leading-tight text-text1">Engineering Notes on Web Product Development</h2>
        <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-text2">
          Practical writing on frontend engineering, backend architecture, and product-quality software delivery.
        </p>
      </div>

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-item border border-border bg-surface p-6 md:p-7">
            <div className="flex flex-wrap items-center gap-3 font-mono text-label text-text3">
              <span>{formatDate(post.publishedAt)}</span>
              <span aria-hidden>|</span>
              <span>{post.readTime}</span>
              <span aria-hidden>|</span>
              <span className="text-primary">{post.category}</span>
            </div>

            <h3 className="mt-4 font-display text-3xl leading-tight text-text1">
              <Link to={`/blog/${post.slug}`} data-cursor="interactive" className="nav-link inline-flex">
                {post.title}
              </Link>
            </h3>

            <p className="mt-4 max-w-4xl font-body text-base leading-relaxed text-text2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
