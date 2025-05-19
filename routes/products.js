import express from 'express';
import productController from '../controllers/products.js'

const route = express.Router();

route.post('/', productController.create); //CREATE
route.get('/', productController.getAll); //READ
route.get('/:id', productController.getOne); //READ
route.put('/:id', productController.update); //UPDATE
route.delete('/:id', productController.delete); //DELETE

export default route;