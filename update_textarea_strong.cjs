const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const replaceTextarea = (content) => {
    // We want to replace the massive inline class strings on <Textarea> 
    // with a clean, simple one that inherits the global component style.
    
    // For WordCounter, UrlEncoder, TextFormatter, etc.
    // They usually have: className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
    // Or similar variations.
    let result = content;
    result = result.replace(/<Textarea\s+([^>]*?)className="[^"]*?"([^>]*?)>/g, (match, p1, p2) => {
        // If it's the contact form, don't make it 250px high
        if (content.includes('ContactUs')) {
            return `<Textarea ${p1}className="min-h-[150px] resize-y"${p2}>`;
        }
        return `<Textarea ${p1}className="min-h-[250px] font-sans text-lg resize-y"${p2}>`;
    });
    
    return result;
};

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else if (filepath.endsWith('.tsx')) {
            filelist.push(filepath);
        }
    });
    return filelist;
};

const files = walkSync(pagesDir);
let changedCount = 0;

files.forEach(file => {
    const original = fs.readFileSync(file, 'utf8');
    const updated = replaceTextarea(original);
    if (original !== updated) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log(`Updated Textarea in ${file}`);
        changedCount++;
    }
});

console.log(`Successfully updated ${changedCount} files.`);
