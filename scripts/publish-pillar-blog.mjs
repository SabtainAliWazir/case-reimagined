import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

let supabaseUrl = "";
let supabaseAnonKey = "";

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    if (line.startsWith("VITE_SUPABASE_URL=")) {
      supabaseUrl = line.split("=")[1].trim();
    }
    if (line.startsWith("VITE_SUPABASE_ANON_KEY=")) {
      supabaseAnonKey = line.split("=")[1].trim();
    }
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const newPillarPost = {
  slug: "title-case-vs-sentence-case-formatting-guide",
  title: "Title Case vs Sentence Case: The Complete Formatting Guide for High-Converting Content",
  excerpt: "Master the differences between Title Case, Sentence Case, Chicago, and AP Style. Learn how headline capitalization impacts click-through rates, SEO readability, and user trust.",
  category: "Content & SEO",
  read_time: "6 min",
  cover_image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
  published: true,
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
* **for**
* **and**
* **nor**
* **but**
* **or**
* **yet**
* **so**

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
  `
};

async function publish() {
  console.log("Publishing SEO Pillar article to Supabase...");
  
  // Upsert by slug so this script is idempotent
  const { data, error } = await supabase
    .from("posts")
    .upsert(newPillarPost, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Failed to publish post:", error.message);
    process.exit(1);
  }

  console.log("Successfully published article!");
  console.log("ID:", data[0]?.id);
  console.log("Slug:", data[0]?.slug);
  console.log("Title:", data[0]?.title);
}

publish();
