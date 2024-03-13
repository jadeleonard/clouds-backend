const express = require("express");
const app = express();
const port = process.env.PORT || 3001
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();





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

const server = app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

