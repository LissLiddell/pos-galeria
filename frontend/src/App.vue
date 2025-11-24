<template>
  <div class="app">
    <header>
      <h1>🎨 Galería de Arte</h1>
      <p>Bienvenido a nuestra galería virtual</p>
    </header>
    
    <main>
      <div class="status">
        <p>✅ Frontend funcionando en: http://localhost:3000</p>
        <p>✅ Backend funcionando en: http://localhost:5000</p>
      </div>
      
      <div class="actions">
        <button @click="fetchObras">Cargar Obras</button>
        <div v-if="obras.length" class="obras-list">
          <h3>Obras de Arte:</h3>
          <div v-for="obra in obras" :key="obra.id" class="obra-item">
            <strong>{{ obra.titulo }}</strong> - {{ obra.artista }} - ${{ obra.precio }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      obras: []
    }
  },
  methods: {
    async fetchObras() {
      try {
        const response = await fetch('http://localhost:5000/api/obras')
        this.obras = await response.json()
      } catch (error) {
        console.error('Error cargando obras:', error)
      }
    }
  }
}
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
header {
  text-align: center;
  margin-bottom: 30px;
}
.status {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.actions button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.obra-item {
  background: white;
  padding: 10px;
  margin: 5px 0;
  border-left: 4px solid #007bff;
}
</style>