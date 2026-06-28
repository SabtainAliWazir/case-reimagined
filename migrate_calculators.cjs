const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'calculators');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const componentName = file.replace('.tsx', '');
    
    // We need the slug id. The slug is typically the kebab-case version of the component name.
    // e.g. TvmCalculator -> tvm-calculator
    const slug = componentName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()
      .replace('-calculator', '') 
      // some fixes
      .replace('contribution401k', 'contribution401k')
      .replace('ira-vs-roth', 'ira-vs-roth')
      .replace('rmd', 'rmd')
      .replace('us-inflation', 'us-inflation')
      .replace('salary-increase', 'salary-increase');

    // To be perfectly safe, I will extract the slug from the existing file's CalculatorLayout
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const slugMatch = content.match(/slug="([^"]+)"/);
    if (slugMatch) {
      const realSlug = slugMatch[1];
      
      const newContent = `import { DynamicCalculator } from "@/components/DynamicCalculator";

const ${componentName} = () => {
  return <DynamicCalculator id="${realSlug}" />;
};

export default ${componentName};
`;
      fs.writeFileSync(path.join(dir, file), newContent);
      console.log(`Migrated ${file} to use DynamicCalculator (slug: ${realSlug})`);
    }
  }
});
