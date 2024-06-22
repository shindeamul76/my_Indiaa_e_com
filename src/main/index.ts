import "module-alias/register";
import { app } from "./app"
import { connectDB } from "./db/connect"
import { MONGO_URI, PORT } from "./config"
import dotenv from 'dotenv';
dotenv.config();


const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log(`server is running in port ${PORT}... `));
    } catch (error) {
        console.log(error);
    }
}


start();