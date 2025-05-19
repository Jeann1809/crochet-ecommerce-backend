import dbClient from '../config/dbClient.js'
import { ObjectId } from 'mongodb';

class productsModel {

    async create(product){
        const col_products = dbClient.db.collection('products');
        return await col_products.insertOne(product);
    }

    async getAll(){
        const col_products = dbClient.db.collection('products');
        return await col_products.find({}).toArray();
    }

    async getOne(id){
        const col_products = dbClient.db.collection('products');
        return await col_products.findOne({ _id: new ObjectId(id)});
    }

    async delete(id){
        const col_products = dbClient.db.collection('products');
        return await col_products.deleteOne({ _id: new ObjectId(id)});
    }

    async update(id, product){
        const col_products = dbClient.db.collection('products');
        return await col_products.updateOne({ _id: new ObjectId(id)}, {$set: product});
    }
}

export default new productsModel();