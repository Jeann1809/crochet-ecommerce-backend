import usersModel from '../models/users.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/authentication.js';
import { sendEmail } from '../helpers/emailHandler.js';
import jwt from 'jsonwebtoken';

class usersController {
    constructor(){
    }

    async register(req, res){
        try{
            const {email, firstName, lastName, address, orders, phone, password, role } = req.body;
            //Search for an user with the same email in the database
            const userExists = await usersModel.getOne({email});

            //Throw error if already exists
            if (userExists){
                return res.status(400).json({error: "The user already exists"});
            }

            const encryptedPass = await bcrypt.hash(password,10);

            const data = await usersModel.create({
                email,
                firstName, 
                lastName, 
                address, 
                orders, 
                phone,
                role, 
                password: encryptedPass
            });

            res.status(201).json(data);
        } catch(e) {
            res.status(500).send(e);
        }
    }

    async login(req, res){
        const {email, password} = req.body;

        const userExists = await usersModel.getOne({email});

        if (!userExists){
            return res.status(400).json({error: "The user does not exist"});
        }

        const validPass = await bcrypt.compare(password, userExists.password);

        if (!validPass){
            return res.status(400).json({error: "Invalid Password"});
        }

        const token = generateToken(userExists);

        return res.status(200).json({ msg: "User authenticated", token});
    }

    async profile(req, res){
        try{
            const { id } = req.params;
            const data = await usersModel.getOneById(id);
            res.status(200).json({data});
        }catch(e){
             res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const { id } = req.params;
            await usersModel.delete(id);
            res.status(200).json({status: 'delete-ok'});
        }catch(e){
             res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const { id } = req.params;
            const updates = (({ firstName, lastName, address, phone }) => ({ firstName, lastName, address, phone }))(req.body);
            const data = await usersModel.update(id, updates);
            res.status(200).json({data});
        }catch(e){
             res.status(500).send(e);
        }
    }

    async updatePass(req, res){
        try{
            const {password} = req.body;
            if (!password) {
                return res.status(400).json({ error: 'Password is required' });
            }
            const encryptedPass = await bcrypt.hash(password,10);
            const { id } = req.params;
            await usersModel.update(id, {password: encryptedPass});
            res.status(200).json({status: 'Password updated'});
        }catch(e){
             res.status(500).send(e);
        }
    }

    async forgetPassword (req, res){
        const {email} = req.body;
        const user = await usersModel.getOne({email});
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
        const resetLink = `http://localhost:${process.env.PORT}/users/resetpass/${token}`;

        const html = `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #5a3e36;">
                        <h2 style="color: #d77a61;">🧶 Hello dear ${user.firstName},</h2>
                        <p>
                        We noticed you requested a password reset. No worries — even the coziest yarn can get tangled sometimes. 🧵
                        </p>
                        <p>
                        Just click the button below to weave a new password:
                        </p>
                        <p>
                        <a href="${resetLink}" style="display: inline-block; background-color: #f9c6c9; color: #5a3e36; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                            Reset My Password
                        </a>
                        </p>
                        <p>This link will be snug and safe for the next <strong>30 minutes</strong>.</p>
                        <p>
                        With warmth,<br/>
                        <em>Your Crochet Corner Team 🧵💖</em>
                        </p>
                    </div>
                    `;


        try {
            await sendEmail(email, 'Reset Your Password', html);
            res.status(200).json({ message: 'Password reset email sent' });
        } catch (e) {
            return res.status(400).json({ error: 'Failure sending the password reset email' });
        }

    }

    async resetPassword (req, res){
        const { token } = req.params;
        const { newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const encrypted = await bcrypt.hash(newPassword, 10);
            await usersModel.update(decoded.id, { password: encrypted });

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (e) {
            res.status(400).json({ error: 'Invalid or expired token' });
        }
    }

}
export default new usersController();