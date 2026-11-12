const LIMITES = Object.freeze({
  bajo: 2,
  medio: 4
});

/** Calcula una clasificación sencilla para una matriz de riesgo 3x3. */
export function evaluarRiesgo(impacto, probabilidad) {
  const valoresValidos = [impacto, probabilidad].every((valor) =>
    Number.isInteger(valor) && valor >= 1 && valor <= 3
  );

  if (!valoresValidos) {
    throw new RangeError('Impacto y probabilidad deben ser enteros entre 1 y 3.');
  }

  const puntaje = impacto * probabilidad;
  const nivel = puntaje <= LIMITES.bajo
    ? 'BAJO'
    : puntaje <= LIMITES.medio ? 'MEDIO' : 'ALTO';

  return { puntaje, nivel };
}
