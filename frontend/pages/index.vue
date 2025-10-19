<template>
  <div class="container">
    <h1>Welcome to FrontBack</h1>
    <p>Nuxt + Express + PostgreSQL</p>

    <div class="health-check">
      <h2>Backend Health Check</h2>
      <button @click="checkHealth" :disabled="loading">
        {{ loading ? 'Checking...' : 'Check Backend Health' }}
      </button>

      <div v-if="healthData" class="status" :class="healthData.status">
        <p><strong>Status:</strong> {{ healthData.status }}</p>
        <p><strong>Database:</strong> {{ healthData.database }}</p>
        <p><strong>Timestamp:</strong> {{ healthData.timestamp }}</p>
      </div>

      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const config = useRuntimeConfig()
const loading = ref(false)
const healthData = ref<any>(null)
const error = ref<string | null>(null)

const checkHealth = async () => {
  loading.value = true
  error.value = null
  healthData.value = null

  try {
    const response = await fetch(`${config.public.apiBase}/health`)
    const data = await response.json()

    if (data.success) {
      healthData.value = data.data
    } else {
      error.value = data.error?.message || 'Health check failed'
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to connect to backend'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  color: #00DC82;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 30px;
}

.health-check {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

button {
  background: #00DC82;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #00c774;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
  background: white;
  border: 2px solid #00DC82;
}

.status p {
  margin: 5px 0;
  color: #333;
}

.error {
  margin-top: 20px;
  padding: 15px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #c33;
}
</style>
