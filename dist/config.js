import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;
export const MONGODB_CONNECTION = `mongodb+srv://Mohammad:${process.env.MONGODB_PASSWORD}@amaren.wiznlhc.mongodb.net/Amaren-Main_Site?retryWrites=true&w=majority`;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const BACKEND_URL = process.env.BACKEND_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const SECONDS_TILL_SESSION_TIMEOUT = Number(process.env.SECONDS_TILL_SESSION_TIMEOUT);
//# sourceMappingURL=config.js.map