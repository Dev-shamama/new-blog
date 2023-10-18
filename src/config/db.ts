import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.NEXT_PUBLIC_DB_URL!;
        const db = await mongoose.connect(mongoURI);
        if (db) {
            console.log('Connected to MongoDB');
        }
    }
    catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }
}
export default connectDB;