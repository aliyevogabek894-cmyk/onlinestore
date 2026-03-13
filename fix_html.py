import os
import re

files = [f for f in os.listdir('.') if f.endswith('.html')]
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Backgrounds
    content = re.sub(r'\bbg-white\b', 'glass-card', content)
    content = re.sub(r'bg-\[\#F8F8F8\]', 'glass-card', content)
    content = re.sub(r'bg-\[\#F2F2F2\]', 'glass-card', content)
    content = re.sub(r'\bbg-gray-50\b', 'glass-card', content)

    # Specific elements
    content = content.replace('glass-card border-b border-gray-200 sticky', 'glass-header sticky')
    content = content.replace('glass-card border-b border-gray-200', 'glass-header')

    # Text colors
    content = re.sub(r'text-\[\#1B1B1B\]', 'text-[var(--text-main)]', content)
    content = re.sub(r'text-\[\#0F172A\]', 'text-[var(--text-main)]', content)
    content = re.sub(r'\btext-gray-900\b', 'text-[var(--text-main)]', content)
    content = re.sub(r'\btext-gray-600\b', 'text-[var(--text-muted)]', content)
    content = re.sub(r'\btext-gray-500\b', 'text-[var(--text-muted)]', content)

    # Borders
    content = re.sub(r'\bborder-gray-200\b', 'border-white/10', content)
    content = re.sub(r'\bborder-gray-100\b', 'border-white/5', content)
    content = re.sub(r'border-\[\#e8e8e8\]', 'border-white/10', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('HTML files fixed')
