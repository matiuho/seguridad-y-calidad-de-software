import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluarRiesgo } from '../src/app.js';

test('clasifica como bajo un puntaje de 2', () => {
  assert.deepEqual(evaluarRiesgo(1, 2), { puntaje: 2, nivel: 'BAJO' });
});

test('clasifica como medio un puntaje de 4', () => {
  assert.deepEqual(evaluarRiesgo(2, 2), { puntaje: 4, nivel: 'MEDIO' });
});

test('clasifica como alto un puntaje de 6', () => {
  assert.deepEqual(evaluarRiesgo(3, 2), { puntaje: 6, nivel: 'ALTO' });
});

test('clasifica como alto el puntaje máximo', () => {
  assert.deepEqual(evaluarRiesgo(3, 3), { puntaje: 9, nivel: 'ALTO' });
});

test('rechaza entradas que no pertenecen a la escala', () => {
  assert.throws(() => evaluarRiesgo(0, 2), RangeError);
  assert.throws(() => evaluarRiesgo(4, 1), RangeError);
  assert.throws(() => evaluarRiesgo(2, 1.5), RangeError);
});
