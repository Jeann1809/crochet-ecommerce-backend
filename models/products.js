import Product from '../schemas/products.js';

class productsModel {

    async create(product){
        return await Product.create(product);
    }

    async getAll(){
        return await Product.find();
    }

    async getOne(id){
        return await Product.findById(id);
    }

    async delete(id){
        return await Product.findOneAndDelete({ _id: id });
    }

    async update(id, product){
        return await Product.findOneAndUpdate({ _id: id },{ $set: product },{new:true});
    }
}

export default new productsModel();