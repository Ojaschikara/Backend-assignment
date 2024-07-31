const express = require('express');
const { connection } = require('./config');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');


const PORT = 8080;
const server = express();
server.use(express.json());
server.use(userRouter)
server.use(productRouter)
server.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Unable to connect to DB",error);
    }
    console.log(`Server is running on port ${PORT}`)
})