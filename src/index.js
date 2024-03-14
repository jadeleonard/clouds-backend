const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cacheController = require('express-cache-controller');








// Middleware to parse JSON bodies
app.use(express.json());
app.use(cacheController());

// Define routes
app.get('/api/getitem',async (res,req) =>{
    try {
        const response = await prisma.phone.findMany();
        if(response.ok){
            res.json(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.post('/api/createitems', async (req, res) => {
    const { name, price, details, seller, image } = req.body;
    try {
        const response = await prisma.items.create({
            data: { name, price, details, seller, image }
        });
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/updateitem/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, details, seller, image } = req.body;
    try {
        const updatedItem = await prisma.items.update({
            where: { id },
            data: { name, description, price, details, seller, image }
        });
        res.json(updatedItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/deleteitem/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.items.delete({
            where: { id }
        });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/navbar', async (req, res) => {
    try {
        const navbarItems = await prisma.navbar.findMany();
        res.json(navbarItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
