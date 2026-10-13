-- Run this script inside your Supabase Project -> SQL Editor

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Guide',
  cover_image TEXT,
  read_time TEXT DEFAULT '5 min',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 1. Allow public read access to published posts
CREATE POLICY "Public posts are viewable by everyone" 
ON posts FOR SELECT 
USING (published = true);

-- 2. Allow insert, update, and delete from the admin publisher
CREATE POLICY "Allow manage posts" 
ON posts FOR ALL 
USING (true) 
WITH CHECK (true);

-- Optional: Insert sample posts to kickstart the blog
INSERT INTO posts (slug, title, excerpt, content, category, cover_image, read_time, published)
VALUES
(
  'title-case-vs-sentence-case-formatting-guide',
  'Title Case vs Sentence Case: The Complete Formatting Guide for High-Converting Content',
  'Master the differences between Title Case, Sentence Case, Chicago, and AP Style. Learn how headline capitalization impacts click-through rates, SEO readability, and user trust.',
  '# Title Case vs Sentence Case: The Complete Formatting Guide\n\nWhether you are writing a landing page headline...',
  'Content & SEO',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  '6 min',
  true
),
(
  'camelcase-vs-snake-case-naming-conventions',
  'camelCase vs snake_case: The Definitive Guide to Naming Conventions',
  'Understand when to use camelCase, snake_case, PascalCase, and kebab-case across JavaScript, Python, SQL, and REST APIs.',
  '# camelCase vs snake_case\n\nIn software development, consistent naming conventions are critical for readability...',
  'Development',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  '5 min',
  true
),
(
  'how-to-create-seo-friendly-url-slugs',
  'How to Create Clean, High-Ranking SEO URL Slugs in 2026',
  'Practical guide to crafting clean URL slugs that search engines reward. Learn character removal rules and stop words.',
  '# How to Create Clean, High-Ranking SEO URL Slugs in 2026\n\nYour URL slug is one of the first signals search engines evaluate...',
  'SEO & Content',
  'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
  '4 min',
  true
)
ON CONFLICT (slug) DO NOTHING;
