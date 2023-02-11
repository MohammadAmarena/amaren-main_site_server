import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;

export const MONGODB_CONNECTION = `mongodb+srv://Mohammad:${process.env.MONGODB_PASSWORD}@amaren.wiznlhc.mongodb.net/Amaren-Main_Site?retryWrites=true&w=majority`