import express from 'express';
import cors from 'cors';
import obrasRoutes from './routes/obras.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', obrasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend de galería de arte funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend ejecutándose en http://localhost:${PORT}`);
});