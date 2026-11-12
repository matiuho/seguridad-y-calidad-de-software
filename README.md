# Laboratorio: matriz de criticidad con CI/CD

**Asignatura:** Seguridad y Calidad en el Desarrollo de Software (ISY1102)

Este proyecto incluye una aplicación web didáctica para clasificar riesgos y un pipeline con controles automatizados. La aplicación usa una matriz 3x3 y no requiere dependencias externas.

## Ruta de trabajo

1. Crear un repositorio **público y vacío** en GitHub, usando la rama principal `main`.
2. Descomprimir el proyecto y subir a la **raíz** del repositorio el contenido de la carpeta descomprimida, no el ZIP. Verificar que exista el archivo `.github/workflows/pipeline.yml`.
3. Guardar con **Commit changes** y abrir **Actions**. Buscar `Matriz de criticidad - Validación CI` y observar BUILD -> TEST -> SECURITY en verde.
4. Entrar a `src/app.js`, editar y agregar al final:

   ```js
   const pruebaInsegura = eval('2 + 2');
   ```

   Guardar con **Commit changes**. En **Actions**, verificar que SECURITY falle y revisar el mensaje `Uso de eval()`.
5. Eliminar esa única línea, guardar otro commit y verificar que las etapas vuelvan a estar en verde.
6. Preparar el informe con las capturas y respuestas solicitadas en la **guía Word** entregada por el docente.

## Qué significa cada etapa

- **BUILD:** genera una copia lista para publicar y guarda un artefacto descargable.
- **TEST:** ejecuta cinco pruebas automáticas de la matriz de criticidad.
- **SECURITY:** busca patrones inseguros específicos en los archivos fuente. Es un control educativo y limitado; no sustituye una revisión de seguridad real.
- **DEPLOY:** permite publicar la aplicación en GitHub Pages, **solo de forma opcional**. No necesitas habilitarlo ni ejecutarlo para completar esta actividad.

## Archivos relevantes

| Ruta | Función |
| --- | --- |
| `.github/workflows/pipeline.yml` | Define el pipeline y sus etapas. |
| `src/app.js` | Código que modificarás para la prueba. |
| `tests/app.test.mjs` | Cinco casos automatizados. |
| `scripts/revisar-seguridad.mjs` | Control didáctico de seguridad. |
| `scripts/build.mjs` | Construcción del sitio. |
| `package.json` | Comandos BUILD, TEST y SECURITY. |

**No subas contraseñas, tokens ni otros datos personales** al repositorio público. En esta actividad no se integra OWASP ZAP: ese vínculo se verá en un trabajo posterior.
