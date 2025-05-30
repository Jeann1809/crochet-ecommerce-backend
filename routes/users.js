import express from 'express';
import usersController from '../controllers/users.js'
import { verifyToken } from '../helpers/authentication.js';

const route = express.Router();

route.post('/register', usersController.register); //REGISTER
route.post('/login',  usersController.login); //LOGIN
route.get('/profile/:id', verifyToken, usersController.profile); //PROFILE
route.delete('/delete/:id', verifyToken, usersController.delete);
route.put('/update/:id', verifyToken, usersController.update);
route.put('/updatepass/:id', verifyToken, usersController.updatePass);
route.put('/forgetpass', usersController.forgetPassword);
route.put('/resetpass/:token', usersController.resetPassword);
route.get('/cart/:id', verifyToken, usersController.getCart);
route.post('/cart/:id', verifyToken, usersController.addToCart);
route.delete('/cart/:id/:productId', verifyToken, usersController.removeFromCart);



export default route;