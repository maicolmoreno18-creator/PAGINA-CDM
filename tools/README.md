# Herramientas — Optimización de imágenes a WebP

WebP pesa entre 50% y 70% menos que JPEG/PNG con calidad visual casi idéntica.
Pasar las fotos a WebP acelera la carga del sitio (sobre todo en celular) y mejora
el posicionamiento en Google.

En este equipo no hay ninguna herramienta de imágenes instalada, así que la conversión
no se puede ejecutar automáticamente todavía. Aquí queda todo listo para cuando puedas.

## Paso 1 — Instalar el conversor (cwebp)

`cwebp` es el conversor oficial de Google. Elige **una** opción:

- **Descarga directa (sin instalar nada raro):**
  1. Entra a https://developers.google.com/speed/webp/download
  2. Descarga `libwebp` para Windows (archivo `.zip`).
  3. Descomprímelo y agrega su carpeta `\bin` al PATH del sistema
     (o copia `cwebp.exe` a una carpeta que ya esté en el PATH).
- **Con Chocolatey:** `choco install webp`
- **Con Scoop:** `scoop install libwebp`

Verifica que quedó bien con:

```powershell
cwebp -version
```

## Paso 2 — Convertir las imágenes

Desde la raíz del proyecto (`PAGINA-CDM/`):

```powershell
powershell -ExecutionPolicy Bypass -File tools/convert-to-webp.ps1
```

El script:
- Recorre `assets/images/` y crea un `.webp` al lado de cada `.jpeg/.jpg/.png`.
- **No borra ni modifica los originales.**
- Muestra cuánto espacio se ahorró.

Opciones:

```powershell
# Calidad distinta (0-100, por defecto 82)
powershell -ExecutionPolicy Bypass -File tools/convert-to-webp.ps1 -Quality 80

# Regenerar los .webp aunque ya existan
powershell -ExecutionPolicy Bypass -File tools/convert-to-webp.ps1 -Overwrite
```

## Paso 3 — Usar los WebP en la página (con respaldo)

Para no romper nada en navegadores viejos, se usa la etiqueta `<picture>`: el navegador
carga el WebP si puede, y si no, cae al JPEG/PNG original.

En lugar de:

```html
<img src="assets/images/modelo-1.jpeg" alt="Obra terminada">
```

usar:

```html
<picture>
  <source srcset="assets/images/modelo-1.webp" type="image/webp">
  <img src="assets/images/modelo-1.jpeg" alt="Obra terminada">
</picture>
```

> Nota: los sliders de `assets/js/main.js` cambian el `src` de un `<img>` por JavaScript,
> así que ahí la estrategia es distinta. Cuando tengas los `.webp` generados, avísame y
> adapto los sliders para que prefieran WebP con respaldo automático a JPEG/PNG; es un
> cambio pequeño en la clase `ImageSlider`.

## Resumen

1. Instalar `cwebp`.
2. Ejecutar `tools/convert-to-webp.ps1`.
3. Avisar para enganchar los `.webp` en el HTML y en los sliders.
