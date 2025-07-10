require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: [
    'https://milkipie-frontend.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Import routes: all under /api/auth to match your frontend
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth/customers', require('./routes/customers'));
app.use('/api/auth/products', require('./routes/products'));
app.use('/api/auth/orders', require('./routes/orders'));
app.use('/api/auth/payments', require('./routes/payments'));
app.use('/api/auth/inventory', require('./routes/inventory'));
app.use('/api/auth/expenses', require('./routes/expenses'));
app.use('/api/auth/dashboard', require('./routes/dashboard'));

app.get('/', (req, res) => res.send('Milkipie API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));

