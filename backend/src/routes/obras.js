import express from 'express';
const router = express.Router();

// Ruta de ejemplo para obras
router.get('/', (req, res) => {
  res.json({ message: 'API de obras funcionando' });
});

// Obtener todas las obras
router.get('/obras', (req, res) => {
  res.json([
    { id: 1, titulo: 'Obra 1', artista: 'Artista 1', precio: 100 },
    { id: 2, titulo: 'Obra 2', artista: 'Artista 2', precio: 200 }
  ]);
});

// Obtener obra por ID
router.get('/obras/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, titulo: `Obra ${id}`, artista: 'Artista', precio: 150 });
});

export default router;