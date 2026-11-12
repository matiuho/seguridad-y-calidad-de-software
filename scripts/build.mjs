import { rm, cp, access, stat } from 'node:fs/promises';
import path from 'node:path';

const origen = path.resolve('src');
const salida = path.resolve('dist');
const entradaPrincipal = path.join(origen, 'index.html');

await access(entradaPrincipal);
await rm(salida, { recursive: true, force: true });
await cp(origen, salida, { recursive: true });

const paginaGenerada = await stat(path.join(salida, 'index.html'));
if (paginaGenerada.size === 0) {
  throw new Error('El archivo principal generado no contiene datos');
}

console.log('BUILD OK: sitio estático preparado en dist/.');
