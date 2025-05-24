import ordersModel from '../models/orders.js'

class ordersController {
    constructor(){

    }

    async create (req, res){
        try{
            const data = await ordersModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
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