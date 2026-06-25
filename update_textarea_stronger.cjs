const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const replaceTextarea = (content) => {
    let result = content;
    // Use /gs to match across multiple lines
    result = result.replace(/<Textarea\s+([^>]*?)className="[^"]*?"([^>]*?)>/gs, (match, p1, p2) => {
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
