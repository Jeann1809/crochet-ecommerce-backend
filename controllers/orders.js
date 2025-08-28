import ordersModel from '../models/orders.js'
import { sendEmail } from '../helpers/emailHandler.js';
import Order from '../schemas/orders.js';

class ordersController {
    constructor(){

    }

    async create (req, res){
        try{
            console.log("Received order creation request:", req.body);

            // Create the order
            const createdOrder = await ordersModel.create(req.body);
            console.log("Order created in DB:", createdOrder);

            // Fetch the order with populated product and user details
            const data = await Order.findById(createdOrder._id)
                .populate('products.productId')
                .populate('user'); // Populate user info

            console.log("Populated order data:", data);

            // Prepare user info for email
            const userInfo = data.user
                ? `
                    <h3>👤 Customer Information</h3>
                    <p><strong>Name:</strong> ${data.user.name}</p>
                    <p><strong>Email:</strong> ${data.user.email}</p>
                    <p><strong>Phone:</strong> ${data.user.phone || 'N/A'}</p>
                    <p><strong>Shipping Address:</strong><br>
                        ${data.user.shippingAddress.street},<br>
                        ${data.user.shippingAddress.city}, ${data.user.shippingAddress.zip},<br>
                        ${data.user.shippingAddress.country}
                    </p>
                  `
                : `<h3>👤 Customer Information</h3>
                   <p><strong>Email:</strong> ${data.email || 'N/A'}</p>`;

            // Prepare product list as a table
            const productRows = data.products.map(p => {
                if (!p.productId) {
                    return `
                        <tr>
                            <td colspan="3" style="padding:8px;border:1px solid #ddd; color:red;">
                                Product not found (ID: ${p._id || 'N/A'})
                            </td>
                        </tr>
                    `;
                }
                return `
                    <tr>
                        <td style="padding:8px;border:1px solid #ddd;">${p.productId.name}</td>
                        <td style="padding:8px;border:1px solid #ddd;">${p.productId.description}</td>
                        <td style="padding:8px;border:1px solid #ddd; text-align:center;">${p.quantity}</td>
                    </tr>
                `;
            }).join('');

            // Full order email HTML
            const orderInfo = `
                <div style="font-family:Arial, sans-serif; line-height:1.5; color:#333;">
                    <h2 style="color:#2E8B57;">🧶 New Order Placed!</h2>
                    
                    ${userInfo}

                    <h3>📦 Order Summary</h3>
                    <p><strong>Total:</strong> $${Number(data.total).toFixed(2)}</p>
                    <p><strong>Status:</strong> ${data.status}</p>

                    <h3>🛍 Products</h3>
                    <table style="border-collapse:collapse; width:100%; border:1px solid #ddd;">
                        <thead>
                            <tr>
                                <th style="padding:8px; border:1px solid #ddd; background:#f7f7f7;">Name</th>
                                <th style="padding:8px; border:1px solid #ddd; background:#f7f7f7;">Description</th>
                                <th style="padding:8px; border:1px solid #ddd; background:#f7f7f7;">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productRows}
                        </tbody>
                    </table>

                    <p style="margin-top:20px; font-size:0.9em; color:#555;">
                        <em>Order placed at: ${new Date(data.createdAt).toLocaleString()}</em>
                    </p>
                </div>
            `;

            console.log("Prepared order email HTML:", orderInfo);

            // Send email to marimarcrochet@gmail.com
            await sendEmail(
                'marimarcrochet@gmail.com',
                'New Order Notification',
                orderInfo
            );
            console.log("Order notification email sent.");

            res.status(201).json(data);
        }catch(e){
            console.error("Error in order creation:", e);
            res.status(500).send(e);
        }
    }
    
    async update (req, res){
        try{
            const { id } = req.params;
            const data = await ordersModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async delete (req, res){
       try{
            const { id } = req.params;
            const data = await ordersModel.delete(id);
            res.status(200).json({status: 'delete-ok'});
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOne (req, res){
        try{
            const { id } = req.params;
            const data = await ordersModel.getOneById(id);
            res.status(200).json({data});
        }catch(e){
            console.log(e);
            res.status(500).send(e);
        }
    }

    async getAll (req, res){
        try{
            const data = await ordersModel.getAll();
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getByUser(req, res) {
        try {
            const { id } = req.params;
            const data = await ordersModel.getByUserId(id);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }



}

export default new ordersController();