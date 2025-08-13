import express from 'express';
import 'dotenv/config';
import productRoutes from './routes/products.js';
import usersRoutes from './routes/users.js';
import ordersRoutes from './routes/orders.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // ✅ Import CORS
import dbClient from './config/dbClient.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow requests from your frontend (Next.js)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your Next.js URL
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);

app.listen(PORT, () => {
  console.log(`API listening on PORT: ${PORT}`);
});

process.on('SIGINT', async () => {
  dbClient.closeDB();
  process.exit(0);
});
