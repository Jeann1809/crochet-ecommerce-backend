import express from 'express';
import productController from '../controllers/products.js'
import { authorizeRoles, verifyToken } from '../helpers/authentication.js';

const route = express.Router();

route.post('/', verifyToken, authorizeRoles, productController.create); //CREATE
route.get('/', productController.getAll); //READ
route.get('/:id', productController.getOne); //READ
route.put('/:id', verifyToken, authorizeRoles, productController.update); //UPDATE
route.delete('/:id', verifyToken, authorizeRoles, productController.delete); //DELETE

export default route;