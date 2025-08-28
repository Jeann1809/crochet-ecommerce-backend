import express from 'express';
import ordersController from '../controllers/orders.js';
import { authorizeRoles, verifyToken } from '../helpers/authentication.js';

const route = express.Router();

route.post('/', ordersController.create); //CREATE
route.get('/',verifyToken, authorizeRoles, ordersController.getAll); //READ
route.get('/:id',verifyToken, authorizeRoles, ordersController.getOne); //READ
route.get('/user/:id', verifyToken, ordersController.getByUser);
route.put('/:id', verifyToken, ordersController.update); //UPDATE
route.delete('/:id', verifyToken, authorizeRoles, ordersController.delete); //DELETE


export default route;