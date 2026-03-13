const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Backgrounds
    content = content.replace(/\bbg-white\b/g, 'glass-card');
    content = content.replace(/\bbg-\[\#F8F8F8\]\b/g, 'glass-card');
    content = content.replace(/\bbg-\[\#F2F2F2\]\b/g, 'glass-card');
    content = content.replace(/\bbg-gray-50\b/g, 'glass-card');
    
    // Specific elements
    content = content.replace(/glass-card border-b border-gray-200 sticky/g, 'glass-header sticky');
    content = content.replace(/glass-card border-b border-gray-200/g, 'glass-header');
    
    // Text colors (removing them makes them inherit text-main, which handles dark mode cleanly)
    content = content.replace(/\btext-\[\#1B1B1B\]\b/g, 'text-[var(--text-main)]');
    content = content.replace(/\btext-\[\#0F172A\]\b/g, 'text-[var(--text-main)]');
    content = content.replace(/\btext-gray-900\b/g, 'text-[var(--text-main)]');
    content = content.replace(/\btext-gray-600\b/g, 'text-[var(--text-muted)]');
    content = content.replace(/\btext-gray-500\b/g, 'text-[var(--text-muted)]');
    
    // Borders
    content = content.replace(/\bborder-gray-200\b/g, 'border-white/10');
    content = content.replace(/\bborder-gray-100\b/g, 'border-white/5');
    content = content.replace(/\bborder-\[\#e8e8e8\]\b/g, 'border-white/10');
    
    fs.writeFileSync(file, content);
});

console.log('HTML files refactored');
