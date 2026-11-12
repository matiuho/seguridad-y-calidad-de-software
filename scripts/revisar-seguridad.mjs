import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const reglas = [
  { etiqueta: 'Uso de eval()', expresion: /\beval\s*\(/ },
  { etiqueta: 'Uso de document.write()', expresion: /\bdocument\.write\s*\(/ },
  { etiqueta: 'Asignación a innerHTML', expresion: /\.innerHTML\s*=/ },
  {
    etiqueta: 'Posible secreto incrustado',
    expresion: /\b(?:api_key|password|secret|access_token)\b\s*[:=]\s*['"`][^'"`]{4,}['"`]/i
  }
];

const carpetaFuente = path.resolve('src');
const archivos = (await readdir(carpetaFuente))
  .filter((nombre) => /\.(html|js|mjs)$/i.test(nombre));
let hallazgos = 0;

for (const archivo of archivos) {
  const contenido = await readFile(path.join(carpetaFuente, archivo), 'utf8');
  const lineas = contenido.split(/\r?\n/);
  lineas.forEach((linea, numero) => {
    if (linea.trimStart().startsWith('//')) return;

    reglas.forEach(({ etiqueta, expresion }) => {
      if (expresion.test(linea)) {
        hallazgos += 1;
        console.error(`RIESGO: ${archivo}:${numero + 1} - ${etiqueta}`);
      }
    });
  });
}

if (hallazgos > 0) {
  console.error(`SECURITY FAIL: ${hallazgos} hallazgo(s); se detiene el pipeline.`);
  process.exitCode = 1;
} else {
  console.log('SECURITY OK: no se encontraron patrones inseguros configurados.');
}
