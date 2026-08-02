import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock, RefreshCw, CalendarDays, Timer } from "lucide-react";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";

const EpochConverter = () => {
  // Live Clock State
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  
  // Timestamp to Date State
  const [inputTimestamp, setInputTimestamp] = useState("");
  const [convertedDate, setConvertedDate] = useState<{ gmt: string; local: string; relative: string } | null>(null);
  
  // Date to Timestamp State
  const d = new Date();
  const [inputYear, setInputYear] = useState(d.getFullYear().toString());
  const [inputMonth, setInputMonth] = useState((d.getMonth() + 1).toString());
  const [inputDay, setInputDay] = useState(d.getDate().toString());
  const [inputHour, setInputHour] = useState(d.getHours().toString());
  const [inputMinute, setInputMinute] = useState(d.getMinutes().toString());
  const [inputSecond, setInputSecond] = useState(d.getSeconds().toString());
  const [inputTimezone, setInputTimezone] = useState<"local" | "gmt">("local");
  const [convertedTimestamp, setConvertedTimestamp] = useState<number | null>(null);

  // Update live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Timestamp to Date
  const handleTimestampToDate = () => {
    if (!inputTimestamp) return;
    
    let ts = parseInt(inputTimestamp, 10);
    if (isNaN(ts)) return;

    // Auto-detect seconds vs milliseconds (heuristic: if it's longer than 11 digits, it's probably milliseconds)
    const isMilliseconds = inputTimestamp.length > 11;
    const date = isMilliseconds ? new Date(ts) : new Date(ts * 1000);

    // Calculate relative time
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
    
    let relative = "";
    const absDiff = Math.abs(diffInSeconds);
    if (absDiff < 60) relative = rtf.format(Math.floor(diffInSeconds), 'second');
    else if (absDiff < 3600) relative = rtf.format(Math.floor(diffInSeconds / 60), 'minute');
    else if (absDiff < 86400) relative = rtf.format(Math.floor(diffInSeconds / 3600), 'hour');
    else if (absDiff < 2592000) relative = rtf.format(Math.floor(diffInSeconds / 86400), 'day');
    else if (absDiff < 31536000) relative = rtf.format(Math.floor(diffInSeconds / 2592000), 'month');
    else relative = rtf.format(Math.floor(diffInSeconds / 31536000), 'year');

    setConvertedDate({
      gmt: date.toUTCString(),
      local: date.toString(),
      relative
    });
  };

  // Handle Date to Timestamp
  const handleDateToTimestamp = () => {
    const yr = parseInt(inputYear, 10);
    const mo = parseInt(inputMonth, 10) - 1; // JS months are 0-indexed
    const dy = parseInt(inputDay, 10);
    const hr = parseInt(inputHour, 10);
    const mi = parseInt(inputMinute, 10);
    const se = parseInt(inputSecond, 10);

    let date;
    if (inputTimezone === "local") {
      date = new Date(yr, mo, dy, hr, mi, se);
    } else {
      date = new Date(Date.UTC(yr, mo, dy, hr, mi, se));
    }
    
    setConvertedTimestamp(Math.floor(date.getTime() / 1000));
  };

  // SEO Configurations
  const title = "Free Online Epoch Converter - Unix Timestamp to Date (2026)";
  const description = "Convert Unix epoch timestamps to human-readable dates, and dates to epoch timestamps. Fast, free, ad-free online developer utility.";
  const url = "https://caseconvert.online/epoch-converter";

  const faqs = [
    {
      question: "What is an Epoch Timestamp?",
      answer: "The Unix epoch (or Unix time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds. It is widely used in computing and programming to track and sort dates efficiently."
    },
    {
      question: "How do I convert an Epoch Timestamp to a Date?",
      answer: "Simply paste your timestamp (either in seconds or milliseconds) into the converter above and click 'Convert'. It will instantly show you the exact date in both GMT and your local timezone."
    },
    {
      question: "Why is my timestamp showing the year 1970?",
      answer: "If you input a very small number, or if you provide a timestamp in seconds but the system expects milliseconds, the resulting date will be very close to the Unix epoch start date (January 1, 1970). Our converter automatically detects whether you've entered seconds or milliseconds to prevent this error."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://caseconvert.online/" },
      { "@type": "ListItem", "position": 2, "name": "Epoch Converter", "item": url }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Epoch Converter",
            "description": description,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading tracking-tight">
                Epoch <span className="text-gradient">Converter</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Convert Unix timestamps to human-readable dates, and vice versa.
              </p>
            </div>

            {/* Live Clock */}
            <div className="mb-12 animate-fade-in-delay-1 flex justify-center">
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl inline-block text-center min-w-[300px]">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Current Unix Timestamp</h2>
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary tabular-nums">
                  {currentEpoch}
                </div>
                <p className="text-sm text-muted-foreground mt-3">Seconds since Jan 1, 1970</p>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in-delay-2">
              {/* Timestamp to Date */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                    <Timer className="w-6 h-6 text-primary" />
                    Timestamp to Date
                  </h2>
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="timestamp-input">Unix Timestamp</Label>
                      <Input 
                        id="timestamp-input"
                        placeholder="e.g. 1719562911" 
                        value={inputTimestamp} 
                        onChange={(e) => setInputTimestamp(e.target.value)}
                        className="font-mono bg-background/50 h-12"
                      />
                      <p className="text-xs text-muted-foreground">Supports both seconds and milliseconds.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Button onClick={handleTimestampToDate} className="w-full h-12 rounded-xl font-semibold gap-2">
                    <RefreshCw className="w-4 h-4" /> Convert to Date
                  </Button>
                  
                  {convertedDate && (
                    <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase">GMT Time</span>
                        <div className="font-medium">{convertedDate.gmt}</div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase">Your Time Zone</span>
                        <div className="font-medium">{convertedDate.local}</div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase">Relative Time</span>
                        <div className="font-medium text-primary">{convertedDate.relative}</div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Date to Timestamp */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                    <CalendarDays className="w-6 h-6 text-primary" />
                    Date to Timestamp
                  </h2>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="space-y-1">
                      <Label className="text-xs">Yr</Label>
                      <Input value={inputYear} onChange={(e) => setInputYear(e.target.value)} className="bg-background/50 font-mono text-center" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Mo</Label>
                      <Input value={inputMonth} onChange={(e) => setInputMonth(e.target.value)} className="bg-background/50 font-mono text-center" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Day</Label>
                      <Input value={inputDay} onChange={(e) => setInputDay(e.target.value)} className="bg-background/50 font-mono text-center" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Hr</Label>
                      <Input value={inputHour} onChange={(e) => setInputHour(e.target.value)} className="bg-background/50 font-mono text-center" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Min</Label>
                      <Input value={inputMinute} onChange={(e) => setInputMinute(e.target.value)} className="bg-background/50 font-mono text-center" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Sec</Label>
                      <Input value={inputSecond} onChange={(e) => setInputSecond(e.target.value)} className="bg-background/50 font-mono text-center" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-8">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input type="radio" checked={inputTimezone === "local"} onChange={() => setInputTimezone("local")} className="accent-primary" />
                      Local Time
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input type="radio" checked={inputTimezone === "gmt"} onChange={() => setInputTimezone("gmt")} className="accent-primary" />
                      GMT
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  <Button onClick={handleDateToTimestamp} variant="outline" className="w-full h-12 rounded-xl font-semibold gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
                    <RefreshCw className="w-4 h-4" /> Convert to Timestamp
                  </Button>
                  
                  {convertedTimestamp !== null && (
                    <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                      <span className="text-xs font-semibold text-muted-foreground uppercase block mb-1">Epoch Timestamp</span>
                      <div className="text-3xl font-heading font-bold text-primary tabular-nums">
                        {convertedTimestamp}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* FAQs */}
            <div className="animate-fade-in-delay-3">
              <FAQSection faqs={faqs} toolName="Epoch Converter" />
            </div>
            
            {/* Related Tools */}
            <div className="animate-fade-in-delay-3 mt-16">
              <RelatedTools currentPath="/epoch-converter" />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default EpochConverter;
