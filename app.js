import express from 'express';
import 'dotenv/config';
import productRoutes from './routes/products.js';
import usersRoutes from './routes/users.js';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/products', productRoutes); //Using product routes
app.use('/users', usersRoutes); //Using product routes


app.listen(PORT, () => {
    console.log(`API listening on PORT: ${PORT}`);
  });

process.on('SIGINT', async() =>{
    dbClient.closeDB();
    process.exit(0);
});