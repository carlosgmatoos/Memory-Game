const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');  // Importamos cors

const app = express();

// Habilitamos CORS
app.use(cors());
app.use(express.json());  // Middleware para parsear el body de las solicitudes

// Configuración del Pool de PostgreSQL utilizando las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Ruta de prueba para verificar la conexión con la base de datos
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Conexión exitosa a la base de datos: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

// Rutas para manejar imágenes
app.get('/images', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.images');
    res.json(result.rows);  // Devuelve las imágenes en formato JSON
  } catch (err) {
    console.error('Error al obtener imágenes:', err);
    res.status(500).send('Error al obtener imágenes');
  }
});

app.post('/images', async (req, res) => {
  const { name, url, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.images (name, url, category) VALUES ($1, $2, $3) RETURNING *',
      [name, url, category]
    );
    res.status(201).json(result.rows[0]);  // Devuelve la imagen insertada
  } catch (err) {
    console.error('Error al insertar la imagen:', err);
    res.status(500).send('Error al insertar la imagen');
  }
});

// Rutas para manejar el ranking
app.get('/ranking', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.ranking ORDER BY score DESC LIMIT 10');
    res.json(result.rows);  // Devuelve el top 10 del ranking
  } catch (err) {
    console.error('Error al obtener el ranking:', err);
    res.status(500).send('Error al obtener el ranking');
  }
});

app.post('/ranking', async (req, res) => {
  const { name, score } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.ranking (name, score) VALUES ($1, $2) RETURNING *',
      [name, score]
    );
    res.status(201).json(result.rows[0]);  // Devuelve la nueva puntuación
  } catch (err) {
    console.error('Error al agregar la puntuación:', err);
    res.status(500).send('Error al agregar la puntuación');
  }
});

// Eliminar una puntuación por ID
app.delete('/ranking/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.ranking WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Ranking no encontrado');
    }
    res.status(200).send('Ranking eliminado');
  } catch (err) {
    console.error('Error al eliminar el ranking:', err);
    res.status(500).send('Error al eliminar el ranking');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
