import 'dotenv/config';
import { MongoClient } from "mongodb";

class dbClient {
    constructor(){
        const queryString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}/?retryWrites=true&w=majority&appName=crochet-cluster`;
        this.client = new MongoClient(queryString);
        this.connectDB();
    }

    async connectDB(){
        try {
            await this.client.connect();
            this.db = this.client.db('crochet_store');
            console.log('Successfully connected to the data base');
        } catch (e) {
            console.log(e);
        }
    }
}

export default new dbClient();