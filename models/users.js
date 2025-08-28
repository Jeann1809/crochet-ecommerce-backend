import User from '../schemas/users.js';

class usersModel {

    async create(user){
        return await User.create(user);
    }

    async getAll(){
        return await User.find();
    }

    async getOneById(id){
        return await User.findById(id);
    }

    async getOne(filter){
        return await User.findOne(filter);
    }

    async delete(id){
        return await User.findOneAndDelete({ _id: id });
    }

    async update(id, user){
        return await User.findOneAndUpdate({ _id: id },{ $set: user },{new:true});
    }
}

export default new usersModel();