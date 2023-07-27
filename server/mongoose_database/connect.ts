import mongoose from "mongoose";

export default async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(useRuntimeConfig().MONGO_API.secret.URL);
        console.log('Successfully connected');
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
}