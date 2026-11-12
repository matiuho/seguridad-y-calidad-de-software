import { evaluarRiesgo } from './app.js';

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

function mostrarResultado(evento) {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const impacto = Number(datos.get('impacto'));
  const probabilidad = Number(datos.get('probabilidad'));
  const { puntaje, nivel } = evaluarRiesgo(impacto, probabilidad);

  resultado.textContent = `Puntaje obtenido: ${puntaje} de 9 | Clasificación: ${nivel}`;
}

formulario.addEventListener('submit', mostrarResultado);
