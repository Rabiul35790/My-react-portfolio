import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const siteUrl = "https://rabiul.pro";

const blogPages = [
  {
    slug: "building-a-self-hosted-background-removal-api",
    title: "Building a Self-Hosted Background Removal API - What I Learned the Hard Way | Blog by Rabiul Hasan",
    description:
      "How I moved from paid image APIs to a self-hosted rembg + FastAPI service, handled deployment failures, and integrated it with Laravel.",
    image: "/images/blog.png"
  }
];

function replaceTagContent(html, pattern, nextValue) {
  return html.replace(pattern, nextValue);
}

async function main() {
  const baseHtml = await readFile(indexPath, "utf8");

  await Promise.all(
    blogPages.map(async (post) => {
      const url = `${siteUrl}/blog/${post.slug}`;

      let pageHtml = baseHtml;
      pageHtml = replaceTagContent(pageHtml, /<title>[\s\S]*?<\/title>/i, `<title>${post.title}</title>`);
      pageHtml = replaceTagContent(
        pageHtml,
        /<meta name="description" content="[^"]*"\s*\/>/i,
        `<meta name="description" content="${post.description}" />`
      );
      pageHtml = replaceTagContent(
        pageHtml,
        /<meta property="og:title" content="[^"]*"\s*\/>/i,
        `<meta property="og:title" content="${post.title}" />`
      );
      pageHtml = replaceTagContent(
        pageHtml,
        /<meta property="og:description" content="[^"]*"\s*\/>/i,
        `<meta property="og:description" content="${post.description}" />`
      );
      pageHtml = replaceTagContent(pageHtml, /<meta property="og:type" content="[^"]*"\s*\/>/i, `<meta property="og:type" content="article" />`);
      pageHtml = replaceTagContent(pageHtml, /<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${url}" />`);
      pageHtml = replaceTagContent(pageHtml, /<meta property="og:image" content="[^"]*"\s*\/>/i, `<meta property="og:image" content="${post.image}" />`);
      pageHtml = replaceTagContent(pageHtml, /<meta name="twitter:url" content="[^"]*"\s*\/>/i, `<meta name="twitter:url" content="${url}" />`);
      pageHtml = replaceTagContent(pageHtml, /<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${post.title}" />`);
      pageHtml = replaceTagContent(
        pageHtml,
        /<meta name="twitter:description" content="[^"]*"\s*\/>/i,
        `<meta name="twitter:description" content="${post.description}" />`
      );
      pageHtml = replaceTagContent(pageHtml, /<meta name="twitter:image" content="[^"]*"\s*\/>/i, `<meta name="twitter:image" content="${post.image}" />`);
      pageHtml = replaceTagContent(pageHtml, /<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${url}" />`);

      const targetDir = path.join(distDir, "blog", post.slug);
      const targetPath = path.join(targetDir, "index.html");
      await mkdir(targetDir, { recursive: true });
      await writeFile(targetPath, pageHtml, "utf8");
    })
  );
}

main().catch((error) => {
  console.error("Failed to generate blog route meta pages:", error);
  process.exit(1);
});
