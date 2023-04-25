import mongoose from 'mongoose';
import config from 'config';
import { setTimeout } from 'timers/promises';

// const dbURL = `mongodb://${config.get('dbName')}:${config.get('dbPass')}@localhost:6000/jwtAuth?authSource=admin`;
const dbURL = `mongodb+srv://${config.get('dbName')}:${config.get('dbPass')}@cluster0.uy715i4.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
    console.log("Trying to connect to database");
    try{
        await mongoose.connect(dbURL);
        console.log('Connected to MongoDB!');
    } catch (error: any) {
        console.log(error.message);
        setTimeout(5000, connectDB);
    }
}

export default connectDB;
