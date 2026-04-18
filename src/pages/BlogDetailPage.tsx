import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { removeJsonLd, setJsonLd, setPageSeo, toAbsoluteUrl } from "../utils/seo";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const postIndex = blogPosts.findIndex((post) => post.slug === slug);
  const post = postIndex >= 0 ? blogPosts[postIndex] : null;
  const socialImage = "/images/blog.png";

  useEffect(() => {
    if (!post) {
      setPageSeo({
        title: "Blog Not Found | Rabiul Hasan",
        description: "The requested blog article could not be found.",
        path: `/blog/${slug ?? ""}`,
        noindex: true
      });
      removeJsonLd("blog-post-schema");
      return;
    }

    setPageSeo({
      title: `${post.title} | Blog by Rabiul Hasan`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: socialImage,
      type: "article"
    });

    setJsonLd("blog-post-schema", {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      image: toAbsoluteUrl(socialImage),
      author: {
        "@type": "Person",
        name: "Rabiul Hasan"
      },
      publisher: {
        "@type": "Person",
        name: "Rabiul Hasan"
      },
      mainEntityOfPage: toAbsoluteUrl(`/blog/${post.slug}`)
    });

    return () => removeJsonLd("blog-post-schema");
  }, [post, slug]);

  if (!post) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 pt-24">
        <div className="text-center">
          <h1 className="font-display text-5xl text-text1">Article Not Found</h1>
          <Link to="/" className="mt-6 inline-block font-mono text-label text-primary" data-cursor="interactive">
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  const nextPost = blogPosts[(postIndex + 1) % blogPosts.length];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-32">
      <header>
        <p className="font-mono text-label text-primary">Blog Article</p>
        <h1 className="mt-4 font-display text-section leading-tight text-text1">{post.title}</h1>
        <div className="mt-6 flex flex-wrap gap-4 border-y border-border py-4 font-mono text-label text-text2">
          <span>{formatDate(post.publishedAt)}</span>
          <span>Read Time: {post.readTime}</span>
          <span>Category: {post.category}</span>
        </div>
      </header>

      <img src={socialImage} alt={post.title} className="blog-hero-image" loading="lazy" />

      <article className="mt-10 space-y-6">
        {post.content.map((block, index) => {
          const key = `${block.type}-${index}`;
          if (block.type === "heading") {
            return (
              <h2 key={key} className="pt-2 font-display text-4xl leading-tight text-text1">
                {block.text}
              </h2>
            );
          }

          if (block.type === "separator") {
            return <hr key={key} className="border-border" />;
          }

          if (block.type === "code") {
            return (
              <div key={key} className="overflow-x-auto border border-border bg-surface">
                <pre className="p-5 font-mono text-sm leading-relaxed text-text1">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          }

          if (block.type === "link") {
            return (
              <a
                key={key}
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wipe btn-wipe-solid inline-flex"
                data-cursor="interactive"
              >
                <span>{block.label}</span>
              </a>
            );
          }

          return (
            <p key={key} className="font-body text-lg leading-relaxed text-text1">
              {block.text}
            </p>
          );
        })}
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <Link to={`/blog/${nextPost.slug}`} className="font-display text-4xl text-text1" data-cursor="interactive">
          NEXT ARTICLE →
        </Link>
      </div>
    </main>
  );
}
