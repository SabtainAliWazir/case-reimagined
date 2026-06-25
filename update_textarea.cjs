const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const replaceTextarea = (content) => {
    // Find Textarea classes that look like this: className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
    // and replace them with just "min-h-[250px] font-mono text-sm resize-y" to let the global textarea.tsx handle the colors.
    let result = content;
    result = result.replace(/className="min-h-\[200px\] font-mono text-sm bg-background\/50 border-border\/50 focus:border-primary\/50 resize-none"/g, 
                            'className="min-h-[250px] font-mono text-base resize-y"');
                            
    // Also update any <textarea that isn't using the component (just in case)
    result = result.replace(/className="w-full min-h-\[200px\] p-4 rounded-xl bg-background\/50 border border-border\/50 focus:border-primary\/50 focus:ring-1 focus:ring-primary\/50 font-mono text-sm resize-y"/g,
                            'className="w-full min-h-[250px] p-6 rounded-2xl bg-card dark:bg-black/40 border border-border shadow-sm font-mono text-base resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"');
    
    // Also fix some common bad inputs:
    result = result.replace(/className="bg-background\/50 border-border\/50 focus:border-primary\/50"/g, 
                            'className="font-mono text-base"');
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
