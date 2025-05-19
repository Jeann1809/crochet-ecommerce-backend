import express from 'express';
import 'dotenv/config';
import productRoutes from './routes/products.js'
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/products', productRoutes); //Using product routes

app.listen(PORT, () => {
    console.log(`API listening on PORT: ${PORT}`);
  });
  