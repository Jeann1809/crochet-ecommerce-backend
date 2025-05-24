import Order from '../schemas/orders.js';

class ordersModel {

    async create(order) {
        return await Order.create(order);
    }

    async getAll() {
        return await Order.find()
            .populate('user', '-password') // Exclude password for safety and populates user and product
            .populate('products.productId');
    }

    async getOneById(id) {
        return await Order.findById(id)
            .populate('user', '-password')
            .populate('products.productId');
    }


    async getOne(filter) {
        return await Order.findOne(filter);
    }

    async delete(id) {
        return await Order.findOneAndDelete({ _id: id });
    }

    async update(id, order) {
        return await Order.findOneAndUpdate({ _id: id }, { $set: order }, { new: true });
    }

    async getByUserId(userId) {
        return await Order.find({ user: userId })
            .populate('user', '-password')
            .populate('products.productId');
    }

}

export default new ordersModel();
