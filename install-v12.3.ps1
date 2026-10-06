$ROOT="C:\Users\Kohsari Computer\English Vocabulary App"
Set-Location -LiteralPath $ROOT
$stamp=Get-Date -Format "yyyyMMdd-HHmmss"
$backup=Join-Path $ROOT "WordUp-before-V12.3-$stamp"
New-Item -ItemType Directory -Path $backup -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $ROOT "index.html") -Destination (Join-Path $backup "index.html") -Force
$index=Join-Path $ROOT "index.html"
$required=@(
"v12\engine\content-model.js",
"v12\engine\question-engine.js",
"v12\content\levels\foundation.js",
"v12\content\levels\a1.js",
"v12\content\levels\a2.js",
"v12\content\levels\b1.js",
"v12\content\levels\b2.js",
"v12\content\levels\c1.js",
"v12\content\levels\c2.js",
"v12\content\levels\academic.js",
"v12\content\content-registry.js",
"v12\engine\progress-engine.js",
"v12\engine\content-validator.js",
"v12\engine\v12-runtime.js"
)
$missing=@($required|Where-Object{!(Test-Path -LiteralPath (Join-Path $ROOT $_))})
if($missing.Count -gt 0){Write-Host "STOPPED: Missing V12 files" -ForegroundColor Red;$missing|ForEach-Object{Write-Host $_ -ForegroundColor Red};exit 1}
$html=Get-Content -LiteralPath $index -Raw
$marker="<!-- WORDUP-V12.3-LOAD-ORDER -->"
$scripts=@"
$marker
<script src="./v12/engine/content-model.js"></script>
<script src="./v12/engine/question-engine.js"></script>
<script src="./v12/content/levels/foundation.js"></script>
<script src="./v12/content/levels/a1.js"></script>
<script src="./v12/content/levels/a2.js"></script>
<script src="./v12/content/levels/b1.js"></script>
<script src="./v12/content/levels/b2.js"></script>
<script src="./v12/content/levels/c1.js"></script>
<script src="./v12/content/levels/c2.js"></script>
<script src="./v12/content/levels/academic.js"></script>
<script src="./v12/content/content-registry.js"></script>
<script src="./v12/engine/progress-engine.js"></script>
<script src="./v12/engine/content-validator.js"></script>
<script src="./v12/engine/v12-runtime.js"></script>
"@
$pattern='(?s)<!-- WORDUP-V12\.3-LOAD-ORDER -->.*?<script src="\.\/v12\/engine\/v12-runtime\.js"></script>'
if($html -match $pattern){$html=[regex]::Replace($html,$pattern,$scripts)}elseif($html.Contains('<script src="v12/engine/v12-runtime.js"></script>')){$html=$html.Replace('<script src="v12/engine/v12-runtime.js"></script>',$scripts)}else{$html=$html.Replace('</body>',$scripts+"`r`n</body>")}
Set-Content -LiteralPath $index -Value $html -Encoding UTF8
$failed=0
foreach($file in $required){node --check (Join-Path $ROOT $file) 2>$null;if($LASTEXITCODE -eq 0){Write-Host "PASS $file" -ForegroundColor Green}else{Write-Host "FAIL $file" -ForegroundColor Red;$failed++}}
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "WORDUP V12.3 LOADER" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backup: $backup"
Write-Host "Verified files: $($required.Count)"
Write-Host "Syntax failures: $failed"
if($failed -eq 0){Write-Host "V12.3 INSTALLATION SUCCESSFUL" -ForegroundColor Green}else{Write-Host "V12.3 INSTALLATION HAS ERRORS" -ForegroundColor Red}
