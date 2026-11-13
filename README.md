# QuickTap TPV

TPV para bazares, pensado para tablet: cobro por departamento, artículos rápidos y una calculadora de estilo Casio. Se puede instalar como una app y funciona sin conexión. Tiene cuatro temas de color Material 3 y permite añadir el chino como segundo idioma.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | La app completa |
| `manifest.webmanifest` | Nombre, icono y colores de la app instalada |
| `sw.js` | Permite abrirla sin conexión |
| `icons/` | Iconos para Android, iPad, ordenador y navegador |
| `.nojekyll` | Indica a GitHub Pages que publique los archivos tal cual |

## Publicar en GitHub Pages

1. Entra en GitHub y crea un repositorio nuevo, por ejemplo `quicktap`. Hazlo **público**: con una cuenta gratuita, GitHub Pages solo funciona en repositorios públicos.
2. En el repositorio, pulsa **Add file › Upload files**.
3. Arrastra **el contenido** de esta carpeta, no la carpeta: `index.html` tiene que quedar en la raíz del repositorio. Pulsa **Commit changes**.
   - El archivo `.nojekyll` está oculto en algunos ordenadores. Si no aparece al arrastrar, no pasa nada: la app funciona igual.
4. Ve a **Settings › Pages**.
5. En **Build and deployment › Source**, elige **Deploy from a branch**.
6. En **Branch**, elige `main` y la carpeta `/ (root)`. Pulsa **Save**.
7. Espera uno o dos minutos y recarga la página. Arriba aparecerá la dirección de la app:
   `https://TU-USUARIO.github.io/quicktap/`

## Instalar en cada dispositivo

Abre la dirección **con conexión a internet** la primera vez. Así quedan guardados la app, los iconos y las fuentes, y después funciona sin conexión.

| Dispositivo | Cómo instalarla |
| --- | --- |
| Tablet o móvil Android (Chrome) | Pulsa **Instalar** si aparece el aviso, o ve al menú ⋮ › **Instalar aplicación**. También desde la app: **Ajustes › Instalar en este dispositivo**. |
| iPad o iPhone (Safari) | Toca **Compartir** y después **Añadir a pantalla de inicio**. |
| Ordenador (Chrome o Edge) | Pulsa el icono de instalar en la barra de direcciones, o ve al menú › **Instalar QuickTap**. |

## Publicar una versión nueva

1. Sube el nuevo `index.html` al repositorio para sustituir al anterior.
2. Abre `sw.js` y cambia `CACHE_VERSION`, por ejemplo de `'quicktap-v1'` a `'quicktap-v2'`.
3. Las tablets reciben la versión nueva la próxima vez que abran la app con conexión. Si alguna no se actualiza, ciérrala del todo y vuelve a abrirla.

## Importante

- **Cada dispositivo guarda sus propios datos.** Las ventas, los tickets en espera y los ajustes no se comparten entre tablets.
- **Haz copia cada día** con **Cierre de caja › Exportar CSV**. Si se borran los datos del navegador o se desinstala la app, se pierden las ventas guardadas.
- **En iPad, la app instalada y Safari no comparten datos.** Usa siempre la app instalada en caja.
- **Impresión:** el diálogo de impresión del sistema funciona en todos los dispositivos. El Bluetooth directo solo funciona en Chrome para Android. RawBT es una app de Android.
- **Repositorio público:** el código de la app queda a la vista de cualquiera. Las ventas no, porque nunca salen de la tablet.
