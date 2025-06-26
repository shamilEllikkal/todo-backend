import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
const connectDb = async (req,res) =>{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
}
console.log(process.env.CONNECTION_STRING)

export default connectDb