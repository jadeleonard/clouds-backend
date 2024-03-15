const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cacheController = require('express-cache-controller');
const cors = require('cors');


app.use(cors());




// Middleware to parse JSON bodies
app.use(express.json());
app.use(cacheController());

// Define routes


app.get('/api/navbar',async (res,req) =>{
    try {
        const response = await prisma.navbar.findMany();
        if(response.ok){
            res.json(response)
        }
    } catch (error) {
        console.log(error)
    }
})
const data = [
    {"title":"Official backend of cloud"},
    {"api":"https://clouds-backend.onrender.com"},
    {"navbar":"https://clouds-backend.onrender.com/api/navbar"}
]
app.get('/', (req, res) => {
    res.send(data);
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
