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
    id: "70f5b030-397f-4f8e-bddd-864ef71cf6aa",
    slug: "title-case-vs-sentence-case-formatting-guide",
    title: "Title Case vs Sentence Case: The Complete Formatting Guide for High-Converting Content",
    excerpt: "Master the differences between Title Case, Sentence Case, Chicago, and AP Style. Learn how headline capitalization impacts click-through rates, SEO readability, and user trust.",
    content: `
# Title Case vs Sentence Case: The Complete Formatting Guide

Whether you are writing a landing page headline, drafting a blog title, or designing button copy in a software application, the capitalization style you choose directly shapes how readers perceive your credibility, authority, and professionalism.

Yet across marketing teams and engineering departments, one question causes endless debate: **Should you use Title Case or Sentence Case?**

In this comprehensive guide, we break down the grammatical rules of the major style guides, analyze how headline capitalization impacts click-through rates (CTR) and SEO, and provide a practical cheat sheet you can reference for every project.

---

## 1. Defining the Core Styles

### What Is Title Case?
In **Title Case**, the first letter of almost every word is capitalized, with exceptions made for short grammatical particles such as articles (*a, an, the*), coordinating conjunctions (*and, but, for*), and short prepositions (*in, on, with*).

> **Example**: *The Ultimate Guide to In-Browser Text Transformation*

Title Case conveys formal authority, editorial polish, and prominence. It has been the traditional standard for books, magazine features, newspaper front pages, and high-impact marketing hero sections for decades.

### What Is Sentence Case?
In **Sentence Case**, only the very first word and proper nouns (names of people, places, and brands) are capitalized, exactly as you would write a standard English sentence.

> **Example**: *The ultimate guide to in-browser text transformation*

Sentence Case feels conversational, approachable, modern, and effortless to read. Over the last decade, tech giants including Google, Apple (in iOS Human Interface Guidelines), and Microsoft have migrated much of their software UI, settings menus, and digital documentation to Sentence Case.

---

## 2. Head-to-Head Comparison: The 4 Major Style Guides

Different editorial bodies follow different rules for what counts as a capitalized word. Here is how the four most influential style guides handle headlines:

| Style Guide | Target Context | Preposition Rule | Example |
| :--- | :--- | :--- | :--- |
| **Chicago Manual of Style** | Books, academic essays, formal publishing | Lowercase prepositions regardless of length (*with, through, between*) | *A River Runs Through It* |
| **Associated Press (AP) Style** | Journalism, PR releases, online news | Capitalize prepositions of **4 or more letters** (*With, From, Into*) | *A River Runs With the Current* |
| **APA Style (7th Edition)** | Scientific journals, behavioral research | Capitalize words of **4 letters or longer** | *Effects of Noise on Human Focus* |
| **Sentence Case (Modern Tech)** | SaaS UI, microcopy, digital product design | Only capitalize first word and proper nouns | *Effects of noise on human focus* |

---

## 3. Which Words NEVER Get Capitalized in Title Case?

One of the most common errors in digital writing is capitalizing every single word indiscriminately. Correct, professional Title Case follows specific grammatical exclusions:

### A. Articles
Always keep lowercase (unless they are the first or last word of the title):
* **a**
* **an**
* **the**

### B. Coordinating Conjunctions (FANBOYS)
* **for, and, nor, but, or, yet, so**

### C. Short Prepositions (Under 4 Letters)
* **as, at, by, for, in, of, off, on, per, to, up, via**

### The Golden Rule of First & Last Words
No matter which style guide you follow, **the very first word and the very last word of a headline are ALWAYS capitalized**, even if they happen to be an article or preposition.

> **Incorrect**: *What We Are Waiting for*  
> **Correct**: *What We Are Waiting For*

---

## 4. Does Capitalization Impact SEO and Click-Through Rate?

Search engine algorithms like Google do not explicitly penalize or boost a page based solely on whether your title tag uses Title Case or Sentence Case. Google's crawler evaluates the underlying semantic meaning of the words.

However, capitalization has a proven, direct impact on **Click-Through Rate (CTR)**, which is one of the strongest indirect ranking signals in organic search.

### Key SEO Considerations:
1. **Visual Prominence on SERPs**: Eye-tracking studies demonstrate that Title Case headlines create higher visual contrast in desktop and mobile search engine results pages, making them 8% to 14% more likely to be clicked by searchers looking for an authoritative guide or tool.
2. **Pixel Width Constraints**: Google truncates titles that exceed approximately 600 pixels (roughly 55 to 60 characters). Because uppercase letters take up slightly more horizontal pixel width than lowercase letters, an overly long Title Case heading may get truncated sooner with an ellipsis (...).
3. **The Sentence Case Exception for Informational Intent**: For highly technical, documentation-focused queries (e.g., *"how to install docker on ubuntu 24.04"*), Sentence Case often performs better because searchers perceive it as unbiased, direct technical documentation rather than sales copy.

---

## 5. Best Practices for Product Teams and Developers

If you manage a multi-author blog, an e-commerce catalog, or a developer-facing web application, maintaining consistent capitalization manually is nearly impossible. Different writers, copywriters, and developers will inevitably introduce conflicting styles.

### Strategies to Automate Quality:
* **Establish a Single House Standard**: Decide early whether your brand uses Title Case for marketing and Sentence Case for product UI. Document this in your style guide.
* **Preserve Brand Names & Code Variables**: Automated scripts often break words like \`iPhone\`, \`eBay\`, \`GraphQL\`, \`PostgreSQL\`, or \`camelCase\`. Always verify that your tools respect case-sensitive technical nomenclature.
* **Use Browser-First Formatting Tools**: When formatting large tables of product names, blog drafts, or code variables, rely on client-side formatters that run instantly without sending your confidential text across remote servers.

---

## 6. Convert Your Text Instantly

Need to format your headline, clean up inconsistent team drafts, or convert a technical variable right now? 

CaseConvert provides free, 100% private in-browser text transformers that process your data locally on your device without cookies or uploads:

* **[Title Case Converter](https://caseconvert.online/title-case-converter)**: Automatically formats headlines following Chicago and AP grammatical capitalization rules.
* **[Sentence Case Converter](https://caseconvert.online/sentence-case-converter)**: Cleans up all-caps text into clean, readable sentence formatting.
* **[SEO Slug Generator](https://caseconvert.online/slug-generator)**: Transforms any headline into a URL-friendly, search-engine-optimized permalink.
* **[Text Cleaner](https://caseconvert.online/text-cleaner)**: Strips duplicate spaces, invisible unicode characters, and messy formatting in one click.
    `,
    category: "Content & SEO",
    cover_image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    read_time: "6 min",
    published: true,
    created_at: "2026-10-13T09:50:00Z"
  },
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
