import fs from "node:fs/promises";
import path from "node:path";

const DIST_DIR = path.resolve("dist");
const INDEX_PATH = path.join(DIST_DIR, "index.html");
const SITE_URL = process.env.SITE_URL?.replace(/\/+$/, "") || "https://rabiul.pro";

const routes = [
  {
    route: "/",
    title: "Rabiul Hasan | Full-Stack Software Developer",
    description:
      "Premium portfolio of Rabiul Hasan, a full-stack software developer focused on product-quality web applications and refined user experiences.",
    image: "/images/profile.png",
    h1: "Rabiul Hasan - Full-Stack Software Developer",
    body: "I design and build modern web products that balance clean engineering, scalable backend architecture, and refined user experience. This portfolio showcases selected software projects, product thinking, and practical implementation details across React, TypeScript, Laravel, and API-driven systems. My focus is to solve real business problems with maintainable code, thoughtful interaction design, and reliable delivery. I work across frontend and backend, define clear technical direction, and care deeply about performance, accessibility, and long-term product quality so teams can ship confidently."
  },
  {
    route: "/work/ripplix",
    title: "Ripplix | Work by Rabiul Hasan",
    description:
      "Ripplix is a curated platform of UI animations and micro-interactions built to help designers and developers discover production-ready interaction patterns.",
    image: "https://www.ripplix.com/images/og/og-default.png",
    h1: "Ripplix Project Case Study",
    body: "Ripplix solves the problem of scattered UI animation inspiration by organizing high-quality interaction references into a single searchable platform. The product focuses on fast discovery, consistent categorization, and practical examples that teams can adapt in real software projects. I designed the information architecture, implemented a robust filtering experience, and built backend workflows for content management and subscriptions. The result is a practical library where designers and developers can find the right interaction pattern quickly, reduce research friction, and move from inspiration to implementation with clarity and speed."
  },
  {
    route: "/work/ripplix-figma-plugin",
    title: "Ripplix Figma Plugin | Work by Rabiul Hasan",
    description:
      "A Figma plugin that brings curated UI animations directly into design workflow for faster ideation and clearer developer handoff.",
    image: "https://www.ripplix.com/images/project3.png",
    h1: "Ripplix Figma Plugin Case Study",
    body: "The Ripplix Figma Plugin integrates animation references directly inside Figma so designers can attach interaction ideas without leaving the design tool. This improves collaboration, shortens feedback loops, and gives developers clearer context when implementing motion behavior in production. I built the plugin interface, data synchronization layer, and API integration so teams could browse curated examples and connect them to design components with minimal effort. The plugin improves handoff quality, preserves interaction intent, and helps product teams maintain consistency from design exploration to engineering execution."
  },
  {
    route: "/work/grocery-ecommerce",
    title: "Grocery E-commerce | Work by Rabiul Hasan",
    description:
      "A full-stack grocery e-commerce platform with customer storefront, order flow, and admin controls for managing catalog and operations.",
    image: "/images/project31.png",
    h1: "Grocery E-commerce Case Study",
    body: "This grocery e-commerce project helps local businesses manage products and accept online orders through a clean shopping interface and practical admin panel. The platform emphasizes speed, operational simplicity, and reliable order handling to support daily business workflows. I developed storefront browsing, cart and checkout flow, order processing, and administrative tools for catalog and inventory operations. The system was designed to be easy for non-technical store owners, while still providing strong control over daily operations, pricing updates, and order visibility for better customer service."
  },
  {
    route: "/work/software-company-website",
    title: "Software Company Website | Work by Rabiul Hasan",
    description:
      "A corporate website built to present software services, portfolio, and company identity with clear structure and professional storytelling.",
    image: "/images/project41.png",
    h1: "Software Company Website Case Study",
    body: "This website project was built to strengthen company positioning through clear messaging, service presentation, and trust-building content blocks. The implementation prioritizes responsive behavior, maintainable structure, and polished visual execution for business-facing communication. I translated brand direction into a clean digital experience, organized service pages for clarity, and implemented reusable sections that support future content growth. The final site improves credibility, communicates expertise to potential clients, and gives the business a stronger online presence with consistent design and reliable performance."
  }
];

function absoluteUrl(value) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function upsertMetaByName(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(`<meta\\s+name="${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`);
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

function upsertMetaByProperty(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(`<meta\\s+property="${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`);
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

function upsertCanonical(html, href) {
  const link = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const regex = /<link\s+rel="canonical"[^>]*>/;
  return regex.test(html) ? html.replace(regex, link) : html.replace("</head>", `  ${link}\n  </head>`);
}

function setTitle(html, title) {
  const safe = escapeHtml(title);
  if (/<title>.*<\/title>/.test(html)) {
    return html.replace(/<title>.*<\/title>/, `<title>${safe}</title>`);
  }
  return html.replace("</head>", `  <title>${safe}</title>\n  </head>`);
}

function injectSeoContent(html, h1, body) {
  const content = `<div id="root"><main><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(body)}</p></main></div>`;
  return html.replace(/<div id="root"><\/div>/, content);
}

function applyRouteSeo(html, routeConfig) {
  const canonical = absoluteUrl(routeConfig.route);
  const image = absoluteUrl(routeConfig.image);
  let output = html;

  output = setTitle(output, routeConfig.title);
  output = upsertMetaByName(output, "description", routeConfig.description);
  output = upsertMetaByName(output, "robots", "index,follow");
  output = upsertMetaByName(output, "twitter:card", "summary_large_image");
  output = upsertMetaByName(output, "twitter:url", canonical);
  output = upsertMetaByName(output, "twitter:title", routeConfig.title);
  output = upsertMetaByName(output, "twitter:description", routeConfig.description);
  output = upsertMetaByName(output, "twitter:image", image);

  output = upsertMetaByProperty(output, "og:site_name", "Rabiul Hasan Portfolio");
  output = upsertMetaByProperty(output, "og:type", routeConfig.route === "/" ? "website" : "article");
  output = upsertMetaByProperty(output, "og:url", canonical);
  output = upsertMetaByProperty(output, "og:title", routeConfig.title);
  output = upsertMetaByProperty(output, "og:description", routeConfig.description);
  output = upsertMetaByProperty(output, "og:image", image);

  output = upsertCanonical(output, canonical);
  output = injectSeoContent(output, routeConfig.h1, routeConfig.body);

  return output;
}

async function writeRoutePage(baseHtml, config) {
  const routePath =
    config.route === "/"
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, config.route.replace(/^\/+/, ""), "index.html");
  await fs.mkdir(path.dirname(routePath), { recursive: true });
  await fs.writeFile(routePath, applyRouteSeo(baseHtml, config), "utf8");
}

async function run() {
  const html = await fs.readFile(INDEX_PATH, "utf8");
  await Promise.all(routes.map((config) => writeRoutePage(html, config)));
  console.log(`Prerendered ${routes.length} routes with SEO metadata.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
