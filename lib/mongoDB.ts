import mongoose from "mongoose";

const connectMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string); // You may need to specify the correct type for process.env.MONGODB_URI in ypur envirenment
        console.log('connect');
    } catch (error) {
        console.log("something wrong happened: ", error);
    }
};

export default connectMongo;
