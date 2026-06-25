import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8081;
const DIST_DIR = path.resolve(__dirname, 'dist');

const routes = [
  "/",
  "/word-counter",
  "/binary-translator",
  "/morse-translator",
  "/text-formatter",
  "/text-cleaner",
  "/json-formatter",
  "/password-generator",
  "/lorem-ipsum",
  "/base64",
  "/url-encoder",
  "/hash-generator",
  "/privacy",
  "/about",
  "/contact"
];

async function prerender() {
  const app = express();
  
  // Serve static files from dist directory, fallback to index.html for CSR routes
  app.use(express.static(DIST_DIR));
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, async () => {
    console.log(`Static server listening on port ${PORT}`);
    
    try {
      const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      for (const route of routes) {
        const page = await browser.newPage();
        console.log(`Prerendering ${route}...`);
        
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded' });
        
        // Wait for React to render content inside #root
        try {
          await page.waitForSelector('#root > *', { timeout: 10000 });
        } catch (e) {
          console.log('Timeout waiting for root content, continuing...');
        }
        
        // Wait an extra second for animations/data to settle
        await new Promise(r => setTimeout(r, 1000));
        
        const html = await page.content();
        
        // Write the HTML file
        const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
        const filePath = path.join(DIST_DIR, routePath);
        
        // Ensure directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, html);
        
        console.log(`Saved ${filePath}`);
        await page.close();
      }
      
      await browser.close();
      console.log('Prerendering complete!');
    } catch (err) {
      console.error('Error during prerendering:', err);
      process.exit(1);
    } finally {
      server.close();
    }
  });
}

prerender();
