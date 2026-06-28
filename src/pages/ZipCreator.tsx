import { useState, useCallback, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileArchive, Upload, X, Download, File as FileIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const faqs = [
  {
    question: "Are my files uploaded to a server?",
    answer: "No, all zipping is done locally in your browser using JavaScript. Your files are entirely safe and never leave your device."
  },
  {
    question: "Is there a limit to how many files I can zip?",
    answer: "While there is no hard limit on the number of files, extremely large files or thousands of files might cause your browser to slow down or run out of memory since all processing is done client-side."
  },
  {
    question: "What is a ZIP file?",
    answer: "A ZIP file is a compressed archive that holds one or more files. It makes it easier to share large amounts of data or multiple files at once."
  }
];

const ZipCreator = () => {
  const [files, setFiles] = useState<File[]>([]);
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
    // Reset input so the same files can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
  };

  const createZip = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    const toastId = toast.loading("Creating ZIP archive...");
    
    try {
      const zip = new JSZip();
      
      files.forEach((file) => {
        zip.file(file.name, file);
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "archive.zip");
      
      toast.success("ZIP file created successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create ZIP file.", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <>
      <Helmet>
        <title>Create ZIP File | CaseConvert</title>
        <meta name="description" content="Free online tool to create ZIP archives. Compress multiple files into a single ZIP file entirely in your browser securely." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Create <span className="text-gradient">ZIP</span> File
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Securely compress and bundle multiple files into a single ZIP archive. 
                Everything happens locally in your browser—no uploads required.
              </p>
            </div>

            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl animate-fade-in-delay-1 relative z-10">
              
              {/* Drop Zone */}
              <div 
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[250px] cursor-pointer mb-6 ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 bg-background/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Drag & Drop files here</h3>
                <p className="text-muted-foreground">or click to browse your files</p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <h4 className="font-semibold">{files.length} files ({formatBytes(totalSize)})</h4>
                    <Button variant="ghost" size="sm" onClick={clearFiles} className="text-destructive hover:text-destructive/80">
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                    {files.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex justify-between items-center bg-background/50 border border-border/30 p-3 rounded-xl">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileIcon className="w-5 h-5 text-primary flex-shrink-0" />
                          <div className="truncate">
                            <div className="text-sm font-medium truncate">{file.name}</div>
                            <div className="text-xs text-muted-foreground">{formatBytes(file.size)}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => removeFile(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-center">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto px-12 rounded-full gap-2 text-md h-12" 
                      onClick={createZip}
                      disabled={isProcessing}
                    >
                      <FileArchive className="w-5 h-5" />
                      {isProcessing ? "Creating ZIP..." : "Create ZIP Archive"}
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            <FAQSection faqs={faqs} toolName="ZIP Creator" />
            
            <RelatedTools currentPath="/zip-creator" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ZipCreator;
