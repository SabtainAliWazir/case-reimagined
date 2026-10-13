import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { marked } from "marked";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPostBySlug, BlogPost, samplePosts } from "@/lib/supabase";
import { Calendar, Clock, ArrowLeft, Share2, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const initialPost = slug ? samplePosts.find(p => p.slug === slug) || null : null;
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      if (slug) {
        const data = await getPostBySlug(slug);
        setPost(data);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  const contentHtml = useMemo(() => {
    if (!post?.content) return "";
    // Remove duplicate top H1 if already displayed by page header
    const body = post.content.replace(/^#\s+[^\n]*\n+/, "").trim();
    return marked.parse(body, { async: false, breaks: true, gfm: true }) as string;
  }, [post?.content]);

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="h-8 bg-muted rounded-lg w-1/3 mb-6 animate-pulse" />
          <div className="h-14 bg-muted rounded-lg mb-6 animate-pulse" />
          <div className="h-64 bg-muted rounded-2xl mb-8 animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-3">Article not found</h1>
          <p className="text-muted-foreground mb-6">The requested article could not be located.</p>
          <Button asChild variant="default">
            <Link to="/blog">← Back to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} - CaseConvert Guide`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://caseconvert.online/blog/${post.slug}`} />

        {/* OpenGraph Article Metadata */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CaseConvert" />
        <meta property="og:title" content={`${post.title} - CaseConvert Guide`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://caseconvert.online/blog/${post.slug}`} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:section" content={post.category} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - CaseConvert Guide`} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.cover_image && <meta name="twitter:image" content={post.cover_image} />}

        {/* Schema.org BlogPosting Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.cover_image ? [post.cover_image] : ["https://caseconvert.online/og-image.png"],
            "datePublished": post.created_at,
            "dateModified": post.created_at,
            "articleSection": post.category,
            "author": {
              "@type": "Organization",
              "name": "CaseConvert",
              "url": "https://caseconvert.online"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CaseConvert",
              "logo": {
                "@type": "ImageObject",
                "url": "https://caseconvert.online/text.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://caseconvert.online/blog/${post.slug}`
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <Header />

        <main className="max-w-3xl mx-auto px-4 pt-10 pb-24 animate-fade-in">
          {/* Breadcrumb & Back */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All articles
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1 bg-card transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3" />}
              {copied ? "Copied" : "Share"}
            </button>
          </div>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-full bg-primary/10 text-primary px-3 py-0.5 text-xs font-mono uppercase tracking-wider font-semibold">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pb-6 border-b border-border">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.read_time} read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {post.cover_image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-border shadow-card bg-muted">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}



          {/* Article Body Content */}
          <article
            className="prose prose-neutral dark:prose-invert max-w-none text-foreground font-sans leading-relaxed
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-2.5
              prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-base prose-p:leading-8 prose-p:text-muted-foreground prose-p:my-5
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-5 prose-ul:list-disc prose-ul:pl-6 prose-li:my-1.5 prose-li:text-muted-foreground
              prose-table:my-8 prose-table:w-full prose-table:border-collapse prose-table:text-sm
              prose-th:border-b prose-th:border-border prose-th:py-3 prose-th:px-4 prose-th:font-semibold prose-th:text-foreground prose-th:bg-muted/40 prose-th:text-left
              prose-td:border-b prose-td:border-border/50 prose-td:py-3 prose-td:px-4 prose-td:text-muted-foreground
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-2xl prose-blockquote:py-3.5 prose-blockquote:px-5 prose-blockquote:my-6 prose-blockquote:not-italic prose-blockquote:text-foreground
              prose-hr:my-10 prose-hr:border-border
              prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:font-medium hover:prose-a:text-primary/80
              prose-code:text-primary prose-code:bg-muted/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-xs"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />



          {/* Bottom Interactive CTA */}
          <div className="mt-14 p-8 rounded-3xl bg-card border border-border shadow-card text-center">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Need to convert text right now?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Use our free, client-side case converter to format code variables, change case styles, or calculate finances instantly.
            </p>
            <Button asChild size="default">
              <Link to="/#converter">Launch Case Converter →</Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
