import fs from "fs";
import path from "path";

// 1. Extract all registered routes in App.tsx
const appCode = fs.readFileSync("src/App.tsx", "utf-8");
const appRoutes = new Set();
for (const m of appCode.matchAll(/path=["']([^"']+)["']/g)) {
  appRoutes.add(m[1]);
}
console.log(`\n✅ Registered Routes in App.tsx: ${appRoutes.size}`);

// 2. Extract all URLs in public/sitemap.xml
const sitemapCode = fs.readFileSync("public/sitemap.xml", "utf-8");
const sitemapUrls = [];
for (const m of sitemapCode.matchAll(/<loc>https:\/\/caseconvert\.online([^<]*)<\/loc>/g)) {
  sitemapUrls.push(m[1] || "/");
}
console.log(`✅ URLs in sitemap.xml: ${sitemapUrls.length}`);

// 3. Extract all routes in prerender.js
const prerenderCode = fs.readFileSync("prerender.js", "utf-8");
const prerenderRoutes = [];
for (const m of prerenderCode.matchAll(/['"](\/[a-zA-Z0-9_\-/:*]*)['"]/g)) {
  if (!m[1].includes(".")) prerenderRoutes.push(m[1]);
}

// 4. Scan all .ts/.tsx files in src/ for internal links (both relative and absolute caseconvert.online)
function scanLinks(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".git" && entry.name !== "dist") {
      results = results.concat(scanLinks(full));
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      const content = fs.readFileSync(full, "utf-8");
      
      // Look for href: "/...", to: "/...", or markdown [text](/...) or [text](https://caseconvert.online/...)
      const regexes = [
        /(?:to|href|link)\s*[:=]\s*["'](\/[a-zA-Z0-9_\-\/]+)["']/g,
        /\[[^\]]+\]\((\/[a-zA-Z0-9_\-\/]+)\)/g,
        /\[[^\]]+\]\(https:\/\/caseconvert\.online(\/[a-zA-Z0-9_\-\/]*)\)/g,
        /href=["'](\/[a-zA-Z0-9_\-\/]+)["']/g
      ];

      for (const reg of regexes) {
        for (const m of content.matchAll(reg)) {
          results.push({ url: m[1], file: full });
        }
      }
    }
  }
  return results;
}

const allLinks = scanLinks("src");
console.log(`✅ Total links extracted from source files: ${allLinks.length}`);

// 5. Check every link against App.tsx
function isRouteValid(url) {
  if (url === "/" || url === "" || url.startsWith("/#")) return true;
  if (appRoutes.has(url)) return true;
  
  // Dynamic route check like /blog/:slug
  for (const r of appRoutes) {
    if (r.includes(":")) {
      const pattern = new RegExp("^" + r.replace(/:[^/]+/g, "[^/]+") + "$");
      if (pattern.test(url)) return true;
    }
  }
  return false;
}

const invalidLinks = [];
for (const item of allLinks) {
  if (!isRouteValid(item.url)) {
    invalidLinks.push(item);
  }
}

console.log(`\n--- AUDIT RESULTS ---`);
if (invalidLinks.length === 0) {
  console.log("✅ All internal links match valid routes in App.tsx!");
} else {
  console.log(`❌ Found ${invalidLinks.length} invalid internal links:`);
  invalidLinks.forEach(b => console.log(`   ${b.url} in ${b.file}`));
}

// 6. Check sitemap URLs against App.tsx
const invalidSitemap = sitemapUrls.filter(u => !isRouteValid(u));
if (invalidSitemap.length === 0) {
  console.log("✅ All sitemap.xml URLs match valid routes in App.tsx!");
} else {
  console.log(`❌ Found ${invalidSitemap.length} invalid sitemap URLs:`, invalidSitemap);
}
