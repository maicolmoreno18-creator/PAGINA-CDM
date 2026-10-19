<#
    convert-to-webp.ps1
    -------------------
    Convierte las imágenes de assets/images a formato WebP (más livianas),
    SIN borrar los originales. Genera por cada "foto.jpeg" un "foto.webp" al lado.

    Requisito: tener instalado "cwebp" (conversor oficial de Google).
      - Opción 1 (recomendada): descargar libwebp desde
        https://developers.google.com/speed/webp/download
        y agregar la carpeta /bin al PATH.
      - Opción 2 (si tienes Chocolatey):   choco install webp
      - Opción 3 (si tienes Scoop):         scoop install libwebp

    Uso (desde la raíz del proyecto):
      powershell -ExecutionPolicy Bypass -File tools/convert-to-webp.ps1

    Parámetros opcionales:
      -Quality 82     calidad 0-100 (por defecto 82, buen balance)
      -Overwrite      regenera los .webp aunque ya existan
#>

param(
    [int]$Quality = 82,
    [switch]$Overwrite
)

$ErrorActionPreference = 'Stop'

# Verifica que cwebp esté disponible
$cwebp = Get-Command cwebp -ErrorAction SilentlyContinue
if (-not $cwebp) {
    Write-Host "ERROR: no se encontró 'cwebp' en el PATH." -ForegroundColor Red
    Write-Host "Instálalo desde https://developers.google.com/speed/webp/download y vuelve a intentar." -ForegroundColor Yellow
    exit 1
}

# Carpeta de imágenes (relativa a la raíz del proyecto)
$imagesDir = Join-Path $PSScriptRoot '..\assets\images'
$imagesDir = (Resolve-Path $imagesDir).Path

Write-Host "Convirtiendo imágenes en: $imagesDir" -ForegroundColor Cyan
Write-Host "Calidad: $Quality   Sobrescribir: $Overwrite`n"

$exts = @('*.jpeg', '*.jpg', '*.png')
$converted = 0
$skipped = 0
$savedBytes = 0

foreach ($ext in $exts) {
    Get-ChildItem -Path $imagesDir -Filter $ext -File | ForEach-Object {
        $src = $_.FullName
        $dst = [System.IO.Path]::ChangeExtension($src, '.webp')

        if ((Test-Path $dst) -and (-not $Overwrite)) {
            $skipped++
            return
        }

        & cwebp -quiet -q $Quality "$src" -o "$dst"

        if (Test-Path $dst) {
            $origSize = $_.Length
            $newSize  = (Get-Item $dst).Length
            $savedBytes += ($origSize - $newSize)
            $converted++
            $pct = [math]::Round((1 - ($newSize / $origSize)) * 100, 1)
            Write-Host ("  {0}  ->  {1}  (-{2}%)" -f $_.Name, [System.IO.Path]::GetFileName($dst), $pct)
        }
    }
}

Write-Host ""
Write-Host "Listo." -ForegroundColor Green
Write-Host "  Convertidas: $converted"
Write-Host "  Omitidas (ya existían): $skipped"
Write-Host ("  Espacio ahorrado: {0:N1} MB" -f ($savedBytes / 1MB))
Write-Host ""
Write-Host "Los archivos originales NO se tocaron. Ahora tienes .webp al lado de cada imagen." -ForegroundColor Cyan
