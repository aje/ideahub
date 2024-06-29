import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const dbConnect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("connect ok", mongoose.connection.host);
    } catch (error) {
        console.log("connect fail", error);
    }
};

// let cached = global.mongoose;
//
// if (!cached) {
//     cached =  {conn: null, promise: null};
//     global.mongoose = cached
// }
//
// async function dbConnect() {
//     if (cached.conn) {
//         return cached.conn;
//     }
//
//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//         };
//
//         cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
//             return mongoose;
//         });
//     }
//
//     cached.conn = await cached.promise;
//     return cached.conn;
// }
