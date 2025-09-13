<script setup>
import { ref } from 'vue'
import { errorAbsoluto, errorRelativo } from './funciones.js'

const valorReal = ref(null)
const valorAprox = ref(null)

const eAbsoluto = ref(null)
const eRelativo = ref(null)

const mostrarTabla = ref(null);
const mostrarAlerta = ref(null);

// función para calcular
function calcular() {
  if (Number.isFinite(valorReal.value) && Number.isFinite(valorAprox.value)) {
    eAbsoluto.value = errorAbsoluto(valorReal.value, valorAprox.value)
    eRelativo.value = errorRelativo(eAbsoluto.value, valorReal.value)
    mostrarTabla.value = true;
    mostrarAlerta.value = false;
  }else{
    mostrarAlerta.value = true;
    return;
  }
}

function bloquearTeclas(event) {  
  if(["e", "E", "+", "-"].includes(event.key)) {
    event.preventDefault()
    return
  }
}

function cerrarAlerta() {
  mostrarAlerta.value = false;
}
</script>

<template>
  
  <div class="contenedor">
    <h1 class="titulo">Calculadora de Errores</h1>

    <div v-if="mostrarAlerta" class="alerta">
      <div class="alerta-contenido">
        <span class="icono-alerta">⚠️</span>
        <span class="mensaje-alerta">Ingresa todos los datos</span>
        <button class="boton-cerrar" @click="cerrarAlerta">×</button>
      </div>
    </div>
    <div class="formulario">
      <label>
        Valor Real:
        <input v-model.number="valorReal" type="number" placeholder="Ingresa valor real" @keydown="bloquearTeclas" />
      </label>

      <label>
        Valor Aproximado:
        <input v-model.number="valorAprox" type="number" placeholder="Ingresa valor aproximado" @keydown="bloquearTeclas" />
      </label>

      <button @click="calcular">Calcular</button>
    </div>

    <div v-if="mostrarTabla" class="resultados">
      <h2>Resultados:</h2>
      <p><strong>Error Absoluto:</strong> {{ eAbsoluto }}</p>
      <p><strong>Error Relativo:</strong> {{ eRelativo.toFixed(4) }}</p>
      <p><strong>Error Relativo (%):</strong> {{ (eRelativo * 100).toFixed(2) }} %</p>
    </div>
  </div>
</template>

<style scoped>
.app-background {
  min-height: 100vh;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  max-width: 650px;
  margin: auto;
  padding: 2rem;
  background: #242424;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  font-family: system-ui, sans-serif;
  color: #f9fafb;
}

h1 {
  text-align: center;
  color: #60a5fa;
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  color: #d1d5db;
  text-align: center;
  margin-bottom: 1.5rem;
}

.inputs {
  margin-bottom: 1rem;
}

.inputs-numericos {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #e5e7eb;
  flex: 1;
  min-width: 200px;
}

input {
  padding: 0.4rem;
  border: 1px solid #444;
  border-radius: 0.5rem;
  margin-top: 0.3rem;
  background: #1f1f1f;
  color: #f9fafb;
}

input:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

input::placeholder {
  color: #9ca3af;
}

/* Quitar spinner de inputs numéricos */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

button {
  display: block;
  margin: 1rem auto;
  padding: 0.6rem 1.2rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease-in-out;
}

button:hover {
  background: #1d4ed8;
}

.resultados {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #1f1f1f;
  border-radius: 0.5rem;
  border: 1px solid #333;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.resultados h3 {
  margin: 0 0 1rem 0;
  color: #60a5fa;
  text-align: center;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid;
  text-align: center;
}

.stat-item.error-absoluto {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}

.stat-item.error-relativo {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.stat-item.error-porcentaje {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  grid-column: 1 / -1;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #d1d5db;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.error-absoluto .stat-value {
  color: #22c55e;
}

.error-relativo .stat-value {
  color: #3b82f6;
}

.error-porcentaje .stat-value {
  color: #ef4444;
}

/* Responsive */
@media (max-width: 480px) {
  .container {
    padding: 1.5rem;
  }
  
  .inputs-numericos {
    flex-direction: column;
  }
  
  label {
    min-width: auto;
  }
}
.alerta {
  margin-bottom: 1rem;
  animation: slideDown 0.3s ease-out;
}

.alerta-contenido {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #7c2d12;
  border: 1px solid #dc2626;
  border-radius: 0.5rem;
  color: #fef2f2;
  position: relative;
}

.icono-alerta {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.mensaje-alerta {
  flex: 1;
  font-weight: 500;
}

.boton-cerrar {
  background: none;
  border: none;
  color: #fef2f2;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.boton-cerrar:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>