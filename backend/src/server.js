import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import obrasRoutes from './routes/obras.js';
import ventasRoutes from './routes/ventas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/obras', obrasRoutes);
app.use('/api/ventas', ventasRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'POS Galería API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});