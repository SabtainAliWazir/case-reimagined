import { useState, useCallback, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderArchive, Upload, Download, File as FileIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const faqs = [
  {
    question: "Is this tool safe to use with sensitive files?",
    answer: "Yes. All extraction happens entirely within your web browser. No files are uploaded to our servers, ensuring your data remains completely private."
  },
  {
    question: "Can I extract password-protected ZIP files?",
    answer: "Currently, this browser-based tool does not support extracting password-protected ZIP files."
  }
];

interface ZipEntry {
  name: string;
  dir: boolean;
  date: Date;
  async: (type: "blob") => Promise<Blob>;
}

const ZipExtractor = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<ZipEntry[]>([]);
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

  const processZipFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.zip')) {
      toast.error("Please upload a valid .zip file.");
      return;
    }

    setZipFile(file);
    setIsProcessing(true);
    const toastId = toast.loading("Reading ZIP file...");

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      
      const filesList: ZipEntry[] = [];
      contents.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir) {
          filesList.push(zipEntry);
        }
      });

      setExtractedFiles(filesList);
      toast.success("ZIP file loaded successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to read ZIP file. It might be corrupted.", { id: toastId });
      setZipFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processZipFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processZipFile(e.target.files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearFile = () => {
    setZipFile(null);
    setExtractedFiles([]);
  };

  const downloadFile = async (entry: ZipEntry) => {
    try {
      const blob = await entry.async("blob");
      // Use just the filename without the full path
      const filename = entry.name.split('/').pop() || entry.name;
      saveAs(blob, filename);
    } catch (error) {
      toast.error(`Failed to download ${entry.name}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Extract ZIP File | CaseConvert</title>
        <meta name="description" content="Free online tool to extract ZIP archives securely in your browser. Open ZIP files and download their contents without any software." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Extract <span className="text-gradient">ZIP</span> File
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Securely open and extract files from ZIP archives. 
                Everything happens locally in your browser for maximum privacy.
              </p>
            </div>

            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl animate-fade-in-delay-1 relative z-10">
              
              {!zipFile && (
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
                    accept=".zip"
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FolderArchive className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Drag & Drop a ZIP file here</h3>
                  <p className="text-muted-foreground">or click to browse</p>
                </div>
              )}

              {zipFile && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border/50 pb-4">
                    <div>
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        <FolderArchive className="w-5 h-5 text-primary" />
                        {zipFile.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{extractedFiles.length} files found</p>
                    </div>
                    <Button variant="outline" onClick={clearFile}>
                      Upload Another
                    </Button>
                  </div>
                  
                  {isProcessing ? (
                    <div className="py-12 text-center text-muted-foreground">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                      {extractedFiles.map((entry, index) => (
                        <div key={`${entry.name}-${index}`} className="flex justify-between items-center bg-background/50 border border-border/30 p-3 rounded-xl hover:border-primary/30 transition-colors">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileIcon className="w-5 h-5 text-primary/70 flex-shrink-0" />
                            <div className="text-sm font-medium truncate">{entry.name}</div>
                          </div>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="gap-2" 
                            onClick={() => downloadFile(entry)}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>

            <FAQSection faqs={faqs} toolName="ZIP Extractor" />
            
            <RelatedTools currentPath="/zip-extractor" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ZipExtractor;
