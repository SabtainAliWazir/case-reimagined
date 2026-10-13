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
    excerpt: "Understand when to use camelCase, snake_case, PascalCase, and kebab-case across JavaScript, Python, SQL, and REST APIs with syntax rules, readability benchmarks, and trade-offs.",
    content: `
# camelCase vs snake_case: The Definitive Guide to Naming Conventions

In software engineering, few topics spark as much debate across code reviews as variable naming conventions. While syntax parsers don't care how you capitalize an identifier, human developers spend over 70% of their time reading and debugging existing code rather than writing new logic.

Choosing between **camelCase**, **snake_case**, **PascalCase**, and **kebab-case** isn't just an aesthetic preference—it affects team velocity, cross-language serialization, API maintainability, and code clarity.

In this deep-dive guide, we compare the primary naming conventions, examine empirical readability research, map out language-specific standards, and explore how to solve the classic frontend-to-backend casing friction.

---

## 1. The Anatomy of Identifier Casing Styles

Because programming languages forbid spaces in identifier names, developers developed compounding strategies to join multiple words into a single semantic token:

### A. camelCase (Lower Camel Case)
* **Rule**: First word is strictly lowercase; each subsequent concatenated word begins with a capitalized letter.
* **Format**: \`userProfileSettings\`, \`calculateMonthlyInterest\`, \`isAuthenticated\`
* **Ecosystems**: JavaScript, TypeScript, Java, Dart, Swift, Kotlin.

### B. snake_case (Pothole Case)
* **Rule**: All letters are lowercase, with individual words separated by a single underscore (\`_\`).
* **Format**: \`user_profile_settings\`, \`calculate_monthly_interest\`, \`is_authenticated\`
* **Ecosystems**: Python (PEP 8), Rust, Ruby, C, C++, SQL column names.

### C. PascalCase (Upper Camel Case)
* **Rule**: Every single word begins with an uppercase letter, with no delimiters.
* **Format**: \`UserProfileSettings\`, \`CalculateMonthlyInterest\`, \`UserResponse\`
* **Ecosystems**: React and Vue component names, C# classes, TypeScript types/interfaces, Java classes.

### D. kebab-case (Lisp Case / Dash Case)
* **Rule**: All letters are lowercase, with words joined by a hyphen (\`-\`).
* **Format**: \`user-profile-settings\`, \`monthly-interest-rate\`
* **Ecosystems**: REST API URL endpoints, CSS class names, HTML attributes, package names (npm/cargo).

### E. SCREAMING_SNAKE_CASE (Macro Case)
* **Rule**: All uppercase letters separated by underscores.
* **Format**: \`MAX_RETRY_COUNT\`, \`DEFAULT_TIMEOUT_MS\`, \`API_BASE_URL\`
* **Ecosystems**: Constants, environment variables, configuration flags across almost all programming languages.

---

## 2. Language-by-Language Convention Matrix

Following standard community conventions ensures your code integrates seamlessly with third-party libraries and linters (ESLint, Flake8, Clippy):

| Language | Variables & Functions | Classes & Types | Constants | Database Columns |
| :--- | :--- | :--- | :--- | :--- |
| **JavaScript / TypeScript** | \`camelCase\` | \`PascalCase\` | \`SCREAMING_SNAKE\` | N/A |
| **Python** | \`snake_case\` | \`PascalCase\` | \`SCREAMING_SNAKE\` | \`snake_case\` |
| **SQL** | \`snake_case\` | \`snake_case\` (Tables) | N/A | \`snake_case\` |
| **C# / .NET** | \`camelCase\` (local) / \`PascalCase\` (methods) | \`PascalCase\` | \`PascalCase\` | N/A |
| **Go (Golang)** | \`camelCase\` (private) / \`PascalCase\` (public) | \`PascalCase\` | \`PascalCase\` / \`SCREAMING\` | N/A |
| **Rust** | \`snake_case\` | \`PascalCase\` | \`SCREAMING_SNAKE\` | N/A |

---

## 3. Which Is More Readable? The Scientific Research

Does the choice between underscores and uppercase letters actually impact human comprehension speed?

An influential empirical study conducted by researchers Dave Binkley et al. (*"To CamelCase or Under_score: An Eye-Tracking Study"*) measured visual tracking speeds across hundreds of software developers:

* **Finding 1**: Subjects trained in snake_case recognized visual word boundaries **20% faster** in snake_case than camelCase, because underscores create distinct whitespace gaps similar to natural written language.
* **Finding 2**: However, developers read camelCase with **higher visual retention** for short identifier sequences (2 to 3 words) because the compact footprint requires less horizontal saccadic eye movement across wide terminal screens.
* **Conclusion**: Both conventions perform exceptionally well once a developer adapts to a language's idiom. The true performance penalty occurs when a single codebase inconsistently mixes styles.

---

## 4. The Full-Stack Problem: Python Backends vs TypeScript Frontends

The most common architectural friction in modern web development occurs between backend services and frontend applications:

1. **Python/Django or FastAPI Backend**: Serializes database models using standard Python \`snake_case\` (\`user_id\`, \`created_at\`, \`first_name\`).
2. **React/Vue TypeScript Frontend**: Expects \`camelCase\` properties (\`userId\`, \`createdAt\`, \`firstName\`) to satisfy strict linter rules.

### How Teams Handle the Discrepancy:
* **Option A: Runtime Key Mappers** (e.g., camelcase-keys libraries). Adds CPU overhead and serialization latency on large JSON arrays.
* **Option B: Manual DTO Transformation**. Verbose boilerplate code in every API handler.
* **Option C: In-Browser Pre-Conversion Tools**. Converting payload schemas, mock data, and test fixtures before writing integration specs.

---

## 5. Handling Acronyms: The Universal Headache

What happens when an identifier contains an acronym like \`HTTP\`, \`XML\`, \`URL\`, or \`ID\`? Different style guides enforce conflicting rules:

* **The Strict CamelCase Rule** (Google Style Guide): Treat acronyms as regular words.
  * \`loadHttpUrl()\`
  * \`userId\`
  * \`parseXmlDocument()\`
* **The Uppercase Preservation Rule** (Microsoft / Legacy Java): Keep acronyms in all-caps.
  * \`loadHTTPURL()\`
  * \`userID\`
  * \`parseXMLDocument()\`

> **Recommendation**: Follow the Google Style Guide. Treating acronyms as regular capitalized words avoids awkward letter collisions like \`getXMLHTTPRequest()\` vs \`getXmlHttpRequest()\`.

---

## 6. Convert Variable Casing Instantly

Converting hundreds of database columns, JSON keys, or code identifiers by hand is tedious and error-prone. 

CaseConvert provides instant, client-side developer conversion utilities that format your code entirely inside your browser without sending sensitive data to external servers:

* **[camelCase to snake_case Converter](https://caseconvert.online/camelcase-to-snake-case)**: Transform frontend JavaScript keys into database-ready SQL and Python identifiers.
* **[snake_case to camelCase Converter](https://caseconvert.online/snake-case-to-camelcase)**: Convert API responses and database exports into TypeScript objects.
* **[PascalCase to camelCase Converter](https://caseconvert.online/pascalcase-to-camelcase)**: Standardize class names and interfaces into variable instances.
* **[kebab-case to camelCase Converter](https://caseconvert.online/kebab-case-to-camelcase)**: Clean up CSS variables, URL segments, and configuration keys.
* **[All-in-One Case Converter](https://caseconvert.online/)**: Full suite of 10+ text transforms including UPPERCASE, Title Case, and Sentence Case.
    `,
    category: "Development",
    cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    read_time: "7 min",
    published: true,
    created_at: "2026-10-10T12:00:00Z"
  },
  {
    id: "2",
    slug: "how-to-create-seo-friendly-url-slugs",
    title: "How to Create Clean, High-Ranking SEO URL Slugs in 2026",
    excerpt: "The definitive guide to crafting search-engine-optimized URL slugs that rank on Google SERPs. Master stop-word pruning, hyphenation rules, and length optimization.",
    content: `
# How to Create Clean, High-Ranking SEO URL Slugs in 2026

When planning an SEO strategy, content teams spend hours optimizing H1 tags, meta descriptions, and keyword density. Yet one of the most visible and influential on-page ranking factors is frequently neglected: **the URL slug**.

Your URL slug is one of the very first data points search engine spiders evaluate to understand page hierarchy. More importantly, it is displayed prominently on Google's Search Engine Results Pages (SERPs) and social media cards, directly influencing user trust and Organic Click-Through Rates (CTR).

In this tactical guide, we break down Google's official URL guidelines, explain which characters penalize your rankings, and provide a 5-step checklist for generating perfect permalinks.

---

## 1. What Is a URL Slug?

A **URL slug** is the exact alphanumeric string at the end of a web address that identifies a specific page on a website in human-readable terms.

For example, in the URL:
\`https://caseconvert.online/blog/how-to-create-seo-friendly-url-slugs\`

* **Protocol**: \`https://\`
* **Domain Name**: \`caseconvert.online\`
* **Subdirectory**: \`/blog/\`
* **URL Slug**: \`how-to-create-seo-friendly-url-slugs\`

A clean slug instantly tells both humans and web crawlers what the page is about before the content even loads.

---

## 2. The 5 Golden Rules of SEO-Friendly Slugs

### Rule 1: Always Use Hyphens, Never Underscores
This is the single most common technical mistake on digital platforms.

* **Google's Official Stance**: Google Search Central documentation explicitly confirms that Googlebot treats hyphens (\`-\`) as **word separators**, but treats underscores (\`_\`) as **character connectors**.
* **Why It Matters**:
  * \`best-credit-card\` &rarr; Google parses as: \`best\` + \`credit\` + \`card\` (3 indexable keywords).
  * \`best_credit_card\` &rarr; Google parses as: \`best_credit_card\` (1 single unfamiliar token).

> **Verdict**: Always enforce hyphens (\`-\`) across all permalinks and routing structures.

---

### Rule 2: Eliminate Filler Stop Words Aggressively
Stop words are grammatical glue words that add zero contextual search value. Leaving them in dilutes keyword prominence and causes unnecessary character bloat.

Common stop words to purge before publishing:
* **Articles**: *a, an, the*
* **Prepositions**: *in, on, at, to, from, by, with, about*
* **Conjunctions**: *and, but, or, for, nor*

#### Example Transformation:
* **Messy Blog Title**: *"The Ultimate Guide on How to Create the Best SEO Slugs for Beginners"*
* **Poor URL Slug**: \`/the-ultimate-guide-on-how-to-create-the-best-seo-slugs-for-beginners\` (76 characters)
* **Optimized SEO Slug**: \`/create-seo-slugs\` or \`/best-seo-slugs-guide\` (17–21 characters)

---

### Rule 3: Keep URLs Under 60 Characters
Research by Backlinko analyzing over 11 million Google search results found a clear correlation: **shorter URLs rank significantly higher on Google SERPs than longer URLs**.

* **SERP Truncation**: Mobile and desktop search results truncate long URLs with ellipses, hiding critical keywords from prospective searchers.
* **Anchor Text Usability**: Short URLs are easier for other bloggers and journalists to link to as raw anchors in forums, Reddit, Twitter, and documentation.
* **Target Metric**: Aim for **3 to 5 words** in your slug, capturing only your primary target keyword phrase.

---

### Rule 4: Strictly Enforce Lowercase Characters
Unix and Linux web servers (Apache, Nginx, Caddy) treat URLs as **case-sensitive**.

* \`https://example.com/My-Blog-Post\`
* \`https://example.com/my-blog-post\`

To a Linux server, these are two entirely different resource requests. If external sites link to both variations without canonical redirects, Google can index both versions, splitting your PageRank authority in half and triggering duplicate content warnings in Google Search Console.

> **Best Practice**: Automatically lowercase all URL generation scripts at build time.

---

### Rule 5: Strip Diacritics, Accents, and Special Symbols
Punctuation symbols and accented characters (like \`é\`, \`ñ\`, \`ü\`, \`&\`, \`?\`, \`%\`) get converted into ugly percent-encoded strings in web browsers:

* **Raw Input**: \`/café-&-bistró\`
* **Percent-Encoded Output**: \`/caf%C3%A9-%26-bistr%C3%B3\`

Percent-encoded strings look suspicious to visitors, reduce social share click-through rates, and can break web analytics tracking. Always transliterate international accents into standard ASCII equivalents (\`cafe-and-bistro\`).

---

## 3. SEO Slug Comparison Matrix

| Target Headline | Bad Slug (Do Not Use) | Optimized SEO Slug | Why It Wins |
| :--- | :--- | :--- | :--- |
| **"10 Best Laptops for College Students in 2026"** | \`/10_best_laptops_for_college_students_2026\` | \`/best-college-laptops\` | Prunes underscores, numbers, and stop words. |
| **"How to Clean Your PC Keyboard Without Damaging It"** | \`/how-to-clean-your-pc-keyboard-without-damaging-it\` | \`/clean-pc-keyboard\` | Laser-focused on primary search intent. |
| **"Compound Interest vs Simple Interest: What's the Difference?"** | \`/compound_vs_simple_interest_whats_the_difference\` | \`/compound-vs-simple-interest\` | Hyphenated, under 30 characters, clean keywords. |

---

## 4. Should You Include Dates or Years in Slugs?

Many blogs publish slugs containing dates: \`/best-seo-tools-2024\`. 

**Avoid this practice.** When you update that article in 2025 or 2026 to keep information fresh, you are forced to choose between two bad options:
1. Leave the old date in the URL (which makes your article look outdated on Google search results).
2. Change the URL slug and set up a 301 redirect (which causes a minor temporary drop in search equity).

Instead, include the year in your **H1 title tag** and **meta title**, but keep the URL slug evergreen: \`/best-seo-tools\`.

---

## 5. Generate Perfect SEO Slugs Instantly

Manually removing stop words, replacing special characters, and hyphenating text across large publishing workflows takes valuable time.

CaseConvert provides free, client-side tools designed for content marketers, copywriters, and developers:

* **[SEO Slug Generator](https://caseconvert.online/slug-generator)**: Automatically removes stop words, strips accents, normalizes to lowercase, and generates clean URL permalinks.
* **[Word & Character Counter](https://caseconvert.online/word-counter)**: Measures exact character counts, word density, and reading time for SEO metadata.
* **[Text Cleaner](https://caseconvert.online/text-cleaner)**: Strips duplicate spaces, trailing line breaks, and hidden characters from draft copy.
* **[Title Case Converter](https://caseconvert.online/title-case-converter)**: Formats your headlines to match AP and Chicago editorial standards.
    `,
    category: "SEO & Content",
    cover_image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
    read_time: "6 min",
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
