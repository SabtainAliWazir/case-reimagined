import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPosts, BlogPost, samplePosts } from "@/lib/supabase";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog & Technical Guides - CaseConvert</title>
        <meta name="description" content="Technical write-ups, naming convention guides, and SEO optimization tutorials from the CaseConvert engineering team." />
        <link rel="canonical" href="https://caseconvert.online/blog" />

        {/* OpenGraph Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CaseConvert" />
        <meta property="og:title" content="Blog & Technical Guides - CaseConvert" />
        <meta property="og:description" content="Technical write-ups, naming convention guides, and SEO optimization tutorials from the CaseConvert engineering team." />
        <meta property="og:url" content="https://caseconvert.online/blog" />
        <meta property="og:image" content="https://caseconvert.online/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog & Technical Guides - CaseConvert" />
        <meta name="twitter:description" content="Technical write-ups, naming convention guides, and SEO optimization tutorials from the CaseConvert engineering team." />
        <meta name="twitter:image" content="https://caseconvert.online/og-image.png" />

        {/* Schema.org CollectionPage / Blog Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "CaseConvert Blog",
            "url": "https://caseconvert.online/blog",
            "description": "Technical write-ups, naming convention guides, and browser-first utility guides.",
            "publisher": {
              "@type": "Organization",
              "name": "CaseConvert",
              "logo": {
                "@type": "ImageObject",
                "url": "https://caseconvert.online/text.svg"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <Header />

        <main className="max-w-6xl mx-auto px-4 pt-12 pb-24 animate-fade-in">
          {/* Header Banner */}
          <div className="border-b border-border pb-10 mb-12">
            <p className="eyebrow-mono text-primary mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              BLOG / PRACTICAL GUIDES
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Notes from the <span className="font-serif italic font-normal text-primary">team.</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              Engineering write-ups, programming case conventions, and browser-first utility guides. We publish when we have something useful to share.
            </p>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 h-80 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-3 opacity-60" />
              <h3 className="font-semibold text-lg mb-1">No articles published yet</h3>
              <p className="text-sm text-muted-foreground">Check back soon for new guides.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
                >
                  <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                    {post.cover_image && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-foreground shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.read_time}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors mb-2.5 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary pt-2 border-t border-border/50">
                        Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
