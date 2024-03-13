const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();









app.get('/api/navbar', async (req, res) => {
    try {
        // Assuming you want to return a JSON object with a key 'message' and value 'Hello, world!'
        const responseObject = await prisma.navbar.findMany();

        // Send the JSON object as a response
        res.json(responseObject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});
const server = app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
