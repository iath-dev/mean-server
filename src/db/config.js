import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.db, {
            autoIndex: true,
        });

        console.log('DB Online....');
    } catch (error) {
        console.log(error);
        throw new Error('No se puede conectar a la base de datos');
    }
}

export default dbConnection;
