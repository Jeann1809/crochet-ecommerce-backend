import 'dotenv/config';
import mongoose from 'mongoose';

class dbClient {
    
    constructor(){
        this.connectDB();
    }

    async connectDB(){
        const queryString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@crochet-cluster.0zbdci0.mongodb.net/crochet-cluster?retryWrites=true&w=majority&appName=crochet-cluster`;
        await mongoose.connect(queryString);
        console.log("Successfully connected to the data base");
    }

    async closeDB(){
        try {
            await mongoose.disconnect();
            console.log("Data base closed");
        } catch (e) {
            console.error("Error while closing the data base", e);
        }
    }

}

export default new dbClient();