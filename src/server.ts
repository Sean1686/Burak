import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import app from "./app";

mongoose.connect(process.env.MONGO_URL as string,{})
.then((data) => {
    console.log("MongoDB connection succeed!");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function() {
        console.info(`The server is running on successfully on PORT: ${PORT} `)
        console.info(`Admin projecton http://localhost:${PORT}/admin \n`);
    })
})
.catch(err => console.log("Error on connection", err))