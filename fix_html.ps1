$files = Get-ChildItem -Path '.' -Filter '*.html'
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Backgrounds
    $content = $content -replace '\bbg-white\b', 'glass-card'
    $content = $content -replace 'bg-\[\#F8F8F8\]', 'glass-card'
    $content = $content -replace 'bg-\[\#F2F2F2\]', 'glass-card'
    $content = $content -replace '\bbg-gray-50\b', 'glass-card'
    $content = $content -replace '\bbg-gray-100\b', 'glass-card'
    
    # Specific elements
    $content = $content -replace 'glass-card border-b border-gray-200 sticky', 'glass-header sticky'
    $content = $content -replace 'glass-card border-b border-gray-200', 'glass-header'
    
    $content = $content -replace 'bg-\[\#1B1B1B\] text-white', 'glass-card text-white'
    
    # Text colors
    $content = $content -replace 'text-\[\#1B1B1B\]', ''
    $content = $content -replace 'text-\[\#0F172A\]', ''
    $content = $content -replace '\btext-gray-900\b', ''
    $content = $content -replace '\btext-gray-800\b', ''
    
    # Text muted
    $content = $content -replace '\btext-gray-600\b', 'text-[#94A3B8]'
    $content = $content -replace '\btext-gray-500\b', 'text-[#94A3B8]'
    
    # Borders
    $content = $content -replace '\bborder-gray-200\b', 'border-white/10'
    $content = $content -replace '\bborder-gray-100\b', 'border-white/5'
    $content = $content -replace 'border-\[\#e8e8e8\]', 'border-white/10'
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
Write-Output 'HTML files fixed via PS1'
