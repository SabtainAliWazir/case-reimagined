const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const oldGlassClasses = [
    /className="glass shadow-card p-4/g,
    /className="glass shadow-card p-5/g,
    /className="glass shadow-card p-6/g,
    /className="glass shadow-card p-8/g,
    /className="glass rounded-xl p-4 shadow-card/g,
    /className="glass rounded-xl p-6 shadow-card/g,
];

const newGlassClass = 'className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl';

// specific replacements for padding
const replaceGlass = (content) => {
    let result = content;
    result = result.replace(/className="glass shadow-card p-4/g, `${newGlassClass} p-4`);
    result = result.replace(/className="glass shadow-card p-5/g, `${newGlassClass} p-5`);
    result = result.replace(/className="glass shadow-card p-6/g, `${newGlassClass} p-6 md:p-8`);
    result = result.replace(/className="glass shadow-card p-8/g, `${newGlassClass} p-8`);
    result = result.replace(/className="glass rounded-xl p-4 shadow-card/g, `${newGlassClass} p-4`);
    result = result.replace(/className="glass rounded-xl p-6 shadow-card/g, `${newGlassClass} p-6 md:p-8`);
    
    // Also fix the wrapper background
    result = result.replace(/<div className="min-h-screen bg-background">/g, `<div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">\n        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />`);
    
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
    const updated = replaceGlass(original);
    if (original !== updated) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log(`Updated ${file}`);
        changedCount++;
    }
});

console.log(`Successfully updated ${changedCount} files.`);
