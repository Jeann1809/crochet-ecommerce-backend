import productsModel from '../models/products.js'

class productsController {
    constructor(){

    }

    async create (req, res){
        try{
            const data = await productsModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }
    
    async update (req, res){
        try{
            const { id } = req.params;
            const data = await productsModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async delete (req, res){
       try{
            const { id } = req.params;
            const data = await productsModel.delete(id);
            res.status(200).json({status: 'delete-ok'});
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOne (req, res){
        try{
            const { id } = req.params;
            const data = await productsModel.getOne(id);
            res.status(200).json({data});
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getAll (req, res){
        try{
            const data = await productsModel.getAll();
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

}

export default new productsController();