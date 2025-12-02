const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vehiclesdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true
});

// Pool error handling
pool.on('error', (err) => {
  console.error('Pool error:', err);
});

console.log('Attempting to connect to MySQL at:', process.env.DB_HOST || '127.0.0.1');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get('/api/vehicles', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM vehicles');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/vehicles', async (req, res) => {
  const { make, model, year, licensePlate, dailyRate, status } = req.body;

  if (!make || !model || !year || !licensePlate || !dailyRate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO vehicles (make, model, year, licensePlate, dailyRate, status) VALUES (?, ?, ?, ?, ?, ?)',
      [make, model, year, licensePlate, dailyRate, status || 'available']
    );
    connection.release();
    res.json({ success: true, message: 'Vehicle added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  const { make, model, year, licensePlate, dailyRate, status } = req.body;

  if (!make || !model || !year || !licensePlate || !dailyRate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE vehicles SET make = ?, model = ?, year = ?, licensePlate = ?, dailyRate = ?, status = ? WHERE id = ?',
      [make, model, year, licensePlate, dailyRate, status, id]
    );
    connection.release();
    res.json({ success: true, message: 'Vehicle updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/vehicles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM vehicles WHERE id = ?', [id]);
    connection.release();
    res.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/rentals', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT r.id, r.customerId, r.vehicleId, r.startDate, r.endDate, r.totalCost, r.status, c.name, c.email, c.phone, v.make, v.model FROM rentals r JOIN customers c ON r.customerId = c.id JOIN vehicles v ON r.vehicleId = v.id'
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/rentals', async (req, res) => {
  const { customerId, vehicleId, startDate, endDate, totalCost } = req.body;

  if (!customerId || !vehicleId || !startDate || !endDate || !totalCost) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO rentals (customerId, vehicleId, startDate, endDate, totalCost, status) VALUES (?, ?, ?, ?, ?, ?)',
      [customerId, vehicleId, startDate, endDate, totalCost, 'active']
    );
    connection.release();
    res.json({ success: true, message: 'Rental created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO contacts (email, message) VALUES (?, ?)',
      [email, message]
    );
    connection.release();
    res.json({ success: true, message: 'Contact saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
