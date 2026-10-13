import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prevent showing during headless prerendering or automated bot crawling
    if (typeof navigator !== "undefined" && /HeadlessChrome|bot|crawl|spider/i.test(navigator.userAgent)) {
      return;
    }

    try {
      const consent = localStorage.getItem("caseconvert_cookie_consent");
      if (!consent) {
        // Small delay so it smoothly animates in after page content mounts
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage access restrictions
    }
  }, []);

  const handleConsent = (type: "essential" | "all") => {
    try {
      localStorage.setItem("caseconvert_cookie_consent", type);
    } catch {
      // Ignore localStorage write restrictions
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies & privacy consent"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 p-6 rounded-2xl bg-card/95 border border-border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
        Cookies & privacy
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        CaseConvert uses essential cookies for sign-in and preferences, and may
        use analytics or advertising cookies (including Google AdSense) to keep the
        directory free. See our{" "}
        <Link
          to="/privacy"
          className="text-foreground underline underline-offset-4 font-medium hover:text-primary transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleConsent("essential")}
          className="rounded-full border border-border bg-background hover:bg-muted text-foreground text-sm font-medium px-5 py-2 transition-colors cursor-pointer shadow-sm active:scale-95"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={() => handleConsent("all")}
          className="rounded-full bg-[#181512] hover:bg-black text-white dark:bg-primary dark:text-primary-foreground text-sm font-semibold px-6 py-2 transition-colors cursor-pointer shadow-sm active:scale-95"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
