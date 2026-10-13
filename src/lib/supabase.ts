import { createClient } from "@supabase/supabase-js";

// Read Supabase credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create Supabase client (only if credentials provided)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image?: string;
  read_time: string;
  published: boolean;
  created_at: string;
}

// Built-in initial articles so the blog works immediately out-of-the-box
export const samplePosts: BlogPost[] = [
  {
    id: "1",
    slug: "camelcase-vs-snake-case-naming-conventions",
    title: "camelCase vs snake_case: The Definitive Guide to Naming Conventions",
    excerpt: "Understand when to use camelCase, snake_case, PascalCase, and kebab-case across JavaScript, Python, SQL, and REST APIs with syntax rules and trade-offs.",
    content: `
# camelCase vs snake_case: The Definitive Guide

In software development, consistent naming conventions are critical for readability, team collaboration, and avoiding syntax bugs.

## Why Case Conventions Matter

Compilers and interpreters treat variable names as unique identifiers. Without conventions, large codebases become difficult to maintain:

- **camelCase**: First letter lowercase, each subsequent concatenated word capitalized (\`userProfileData\`). Standard in JavaScript, TypeScript, and Java.
- **snake_case**: All lowercase, words separated by an underscore (\`user_profile_data\`). Standard in Python, SQL, and Rust.
- **PascalCase**: Every word capitalized (\`UserProfileData\`). Standard for React component names and C# classes.
- **kebab-case**: All lowercase, words separated by a hyphen (\`user-profile-data\`). Standard for URLs and CSS classes.

## When to Use Which

| Language / Context | Recommended Convention | Example |
| :--- | :--- | :--- |
| **JavaScript / TypeScript** | camelCase | \`const totalAmount = 100;\` |
| **Python** | snake_case | \`def fetch_user_data():\` |
| **Database Columns (SQL)** | snake_case | \`SELECT first_name FROM users;\` |
| **React Components** | PascalCase | \`<UserProfileCard />\` |
| **REST API URL Slugs** | kebab-case | \`/api/user-profiles\` |

## Converting Between Cases Instantly

Rather than manually renaming dozens of JSON keys or database columns, browser-based utilities allow you to convert entire payloads instantly without copying files to external servers.
    `,
    category: "Development",
    cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    read_time: "5 min",
    published: true,
    created_at: "2026-10-10T12:00:00Z"
  },
  {
    id: "2",
    slug: "how-to-create-seo-friendly-url-slugs",
    title: "How to Create Clean, High-Ranking SEO URL Slugs in 2026",
    excerpt: "Practical guide to crafting clean URL slugs that search engines reward. Learn character removal rules, stop word optimization, and readability principles.",
    content: `
# How to Create Clean, High-Ranking SEO URL Slugs in 2026

Your URL slug is one of the first signals Google and human readers evaluate when deciding whether to click on your webpage.

## What is a URL Slug?

A URL slug is the final portion of a URL path that identifies a specific page on a website in human-readable terms. For example, in:
\`https://example.com/blog/how-to-create-seo-slugs\`
The slug is **how-to-create-seo-slugs**.

## 4 Golden Rules for High-Ranking Slugs

### 1. Keep It Short and Focused
Include your target primary keyword without stuffing. Research shows short URLs rank higher and have higher click-through rates (CTR) on SERPs.

### 2. Use Hyphens, Never Underscores
Google's official webmaster guidelines explicitly state that hyphens (\`-\`) are treated as word separators, whereas underscores (\`_\`) are joined together as a single word.

### 3. Eliminate Stop Words and Special Characters
Remove unnecessary filler words like "a", "an", "the", and punctuation symbols like commas, quotes, and exclamation marks.

### 4. Always Lowercase
URLs are case-sensitive on Linux/Unix web servers. Using mixed case can create duplicate content issues or 404 errors.
    `,
    category: "SEO & Content",
    cover_image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
    read_time: "4 min",
    published: true,
    created_at: "2026-10-08T10:00:00Z"
  },
  {
    id: "3",
    slug: "client-side-privacy-why-browser-first-tools-matter",
    title: "Client-Side Privacy: Why Browser-First Tools Are the Future",
    excerpt: "Why sending sensitive text, client documents, and financial figures to remote cloud servers is unnecessary when modern browsers can compute everything locally.",
    content: `
# Client-Side Privacy: Why Browser-First Tools Are the Future

Every time you paste confidential code, corporate memos, or customer data into an online tool, you risk exposing your data to remote logging, training datasets, and telemetry trackers.

## How Client-Side Processing Works

Modern web browsers powered by V8 and WebAssembly are capable of executing complex parsing, cryptographic hashing, and data transformation in microseconds directly on your CPU.

### Benefits of Zero-Upload Tools:
1. **Zero Data Leakage**: Your text stays in your browser tab's sandbox memory.
2. **Instant Performance**: No round-trip server latency or upload queuing.
3. **Offline Capability**: Once the assets are cached, tools function even without an internet connection.
4. **GDPR & Compliance**: No personal data is stored, processed, or transferred across international borders.
    `,
    category: "Privacy & Tech",
    cover_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    read_time: "6 min",
    published: true,
    created_at: "2026-10-05T09:30:00Z"
  }
];

// Fetch all published posts
export async function getPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    return samplePosts;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Using sample blog posts (Supabase table empty or error):", error);
      return samplePosts;
    }

    return data as BlogPost[];
  } catch (err) {
    console.error("Error fetching posts from Supabase:", err);
    return samplePosts;
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) {
    return samplePosts.find(p => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return samplePosts.find(p => p.slug === slug) || null;
    }

    return data as BlogPost;
  } catch (err) {
    console.error("Error fetching post from Supabase:", err);
    return samplePosts.find(p => p.slug === slug) || null;
  }
}
