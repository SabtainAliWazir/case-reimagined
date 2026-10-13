import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase, isSupabaseConfigured, BlogPost, getPosts } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  PlusCircle, 
  Trash2, 
  ExternalLink, 
  Database, 
  Lock, 
  KeyRound, 
  LogOut, 
  ShieldCheck,
  Eye,
  EyeOff
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Guide");
  const [readTime, setReadTime] = useState("5 min");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // Check if session is already unlocked
  useEffect(() => {
    const session = sessionStorage.getItem("caseconvert_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
      loadPosts();
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPass = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    if (adminPass === correctPass) {
      sessionStorage.setItem("caseconvert_admin_auth", "true");
      setIsAuthenticated(true);
      toast.success("Welcome, Admin! Access granted.");
      loadPosts();
    } else {
      toast.error("Incorrect password. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("caseconvert_admin_auth");
    setIsAuthenticated(false);
    setAdminPass("");
    toast.info("Logged out from admin panel.");
  };

  const loadPosts = async () => {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !content) {
      toast.error("Please fill in Title, Slug, and Content");
      return;
    }

    if (!supabase) {
      toast.error("Supabase credentials not configured in .env");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("posts").insert([
        {
          title,
          slug,
          category,
          read_time: readTime,
          cover_image: coverImage || null,
          excerpt,
          content,
          published: true,
        },
      ]);

      if (error) {
        toast.error(`Error saving post: ${error.message}`);
      } else {
        toast.success("Post published successfully to Supabase!");
        setTitle("");
        setSlug("");
        setExcerpt("");
        setContent("");
        setCoverImage("");
        loadPosts();
      }
    } catch (err) {
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) {
      toast.error("Supabase not connected");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this article?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      toast.error(`Delete failed: ${error.message}`);
    } else {
      toast.success("Article deleted");
      loadPosts();
    }
  };

  // If NOT authenticated, show the Motionix Lock Gate
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login - CaseConvert</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between">
          <Header />

          <main className="max-w-md mx-auto px-4 py-20 w-full animate-fade-in">
            <div className="bg-card rounded-3xl border border-border p-8 shadow-card text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>

              <h1 className="text-2xl font-bold mb-2">Admin Portal Locked</h1>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                This area is restricted to site administrators. Please enter your secret admin password to write or manage articles.
              </p>

              <form onSubmit={handleUnlock} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="Enter admin password..."
                      className="w-full h-11 px-4 pr-10 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 font-medium">
                  <KeyRound className="w-4 h-4 mr-1.5" /> Unlock Admin Panel
                </Button>
              </form>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  // Once unlocked, display full CMS
  return (
    <>
      <Helmet>
        <title>Blog CMS Admin - CaseConvert</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans">
        <Header />

        <main className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
          {/* Admin Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border gap-4">
            <div>
              <p className="eyebrow-mono text-primary mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> AUTHENTICATED ADMINISTRATOR
              </p>
              <h1 className="text-3xl font-bold">Blog Article Publisher</h1>
            </div>

            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
                isSupabaseConfigured 
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" 
                  : "bg-amber-500/10 text-amber-600 border-amber-500/30"
              }`}>
                <Database className="w-3 h-3" />
                {isSupabaseConfigured ? "Supabase Live Connected" : "Local Demo Mode"}
              </span>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs text-muted-foreground hover:text-destructive">
                <LogOut className="w-3.5 h-3.5 mr-1" /> Lock & Logout
              </Button>
            </div>
          </div>

          {/* New Article Form */}
          <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-card mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary" /> Create New Article
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Article Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. How to Format Clean SEO Slugs"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="how-to-format-clean-seo-slugs"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Development, SEO, Privacy"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Cover Image URL</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Short Excerpt (Meta Description for SEO)</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short 1-2 sentence preview of the article for Google search and social cards..."
                  rows={2}
                  className="w-full p-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Content (Markdown / Text)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article in Markdown..."
                  rows={10}
                  className="w-full p-4 rounded-xl bg-background border border-border text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={saving} className="px-8">
                  {saving ? "Publishing to Supabase..." : "Publish Article to Supabase"}
                </Button>
              </div>
            </form>
          </div>

          {/* Existing Articles Table */}
          <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-card">
            <h2 className="text-xl font-bold mb-6">Published Articles ({posts.length})</h2>

            {loading ? (
              <div className="h-32 bg-muted rounded-xl animate-pulse" />
            ) : posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No articles found in Supabase.</p>
            ) : (
              <div className="divide-y divide-border/60">
                {posts.map((post) => (
                  <div key={post.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm truncate">{post.title}</h4>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">/blog/{post.slug}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/blog/${post.slug}`} target="_blank">
                          <ExternalLink className="w-3.5 h-3.5 mr-1" /> View Live
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
