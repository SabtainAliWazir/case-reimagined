import { useState, useCallback, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon, Upload, Download, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";
import { toast } from "sonner";

const faqs = [
  {
    question: "Is this tool safe to use with private images?",
    answer: "Yes. All image conversion happens entirely within your web browser using HTML5 Canvas. No images are uploaded to our servers, ensuring your data remains completely private."
  },
  {
    question: "Does conversion reduce image quality?",
    answer: "Converting between formats can sometimes affect quality (e.g., converting PNG to JPEG). However, we aim to preserve as much quality as possible during the conversion."
  }
];

const ImageConverter = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file.");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFile(e.target.files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearFile = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const convertAndDownload = () => {
    if (!imagePreview || !imageFile) return;

    setIsProcessing(true);
    const toastId = toast.loading("Converting image...");

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        toast.error("Failed to convert image.", { id: toastId });
        setIsProcessing(false);
        return;
      }

      // Fill white background for transparent to JPG conversions
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to convert image.", { id: toastId });
          setIsProcessing(false);
          return;
        }

        const extension = targetFormat.split('/')[1];
        const newFileName = imageFile.name.substring(0, imageFile.name.lastIndexOf('.')) + `.${extension}`;
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success("Image converted and downloaded!", { id: toastId });
        setIsProcessing(false);
      }, targetFormat, 0.92); // 0.92 quality for formats that support it
    };
    img.onerror = () => {
      toast.error("Failed to load image for conversion.", { id: toastId });
      setIsProcessing(false);
    };
    img.src = imagePreview;
  };

  return (
    <>
      <Helmet>
        <title>Image Converter | CaseConvert</title>
        <meta name="description" content="Free online image converter. Convert PNG, JPEG, WebP images instantly in your browser without uploading to a server." />
        <link rel="canonical" href="https://caseconvert.online/image-converter" />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Image <span className="text-gradient">Converter</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Securely convert images between PNG, JPEG, and WebP formats. 
                Everything happens locally in your browser for maximum privacy and speed.
              </p>
            </div>

            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl animate-fade-in-delay-1 relative z-10">
              
              {!imageFile && (
                <div 
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[250px] cursor-pointer ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 bg-background/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Drag & Drop an image here</h3>
                  <p className="text-muted-foreground">or click to browse</p>
                </div>
              )}

              {imageFile && imagePreview && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-border/50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/10 flex-shrink-0">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-semibold text-lg truncate" title={imageFile.name}>{imageFile.name}</h4>
                        <p className="text-sm text-muted-foreground uppercase">{imageFile.type.split('/')[1]} • {(imageFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={clearFile}>
                      Upload Another
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-background/50 p-6 rounded-2xl border border-border/50">
                    <div className="w-full sm:w-1/3">
                      <label className="text-sm font-semibold mb-2 block">Convert To:</label>
                      <Select value={targetFormat} onValueChange={setTargetFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image/jpeg">JPEG (.jpg)</SelectItem>
                          <SelectItem value="image/png">PNG (.png)</SelectItem>
                          <SelectItem value="image/webp">WebP (.webp)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="hidden sm:flex text-muted-foreground pt-6">
                      <ArrowRight className="w-6 h-6" />
                    </div>

                    <div className="w-full sm:w-auto sm:flex-1 flex justify-end pt-0 sm:pt-6">
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto px-8 rounded-full gap-2 text-md h-12" 
                        onClick={convertAndDownload}
                        disabled={isProcessing || targetFormat === imageFile.type}
                      >
                        <Download className="w-5 h-5" />
                        {isProcessing ? "Converting..." : "Convert & Download"}
                      </Button>
                    </div>
                  </div>
                  
                  {targetFormat === imageFile.type && (
                    <p className="text-sm text-amber-500 text-center">
                      The target format is the same as the original format. Please select a different format.
                    </p>
                  )}
                </div>
              )}
            </Card>

            <FAQSection faqs={faqs} toolName="Image Converter" />
            
            <RelatedTools currentPath="/image-converter" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ImageConverter;
