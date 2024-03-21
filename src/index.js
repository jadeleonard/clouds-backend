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
    
});

app.get('/api/shoes',async (res,req) =>{
    try {
        const response = await prisma.shoes.findMany();
        if(response.ok){
            res.json(response)
        }
    } catch (error) {
        console.log(error)
    }
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Set the origin to your frontend URL

    res.setHeader('Access-Control-Allow-Origin', 'https://clouds-backend.onrender.com'); 
    res.setHeader('Access-Control-Allow-Origin', 'https://clouds-backend.onrender.com/api/navbar'); 
    res.setHeader('Access-Control-Allow-Origin', 'https://cloud-mount-3y2nneodq-lukabartos-projects.vercel.app'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE','get','post','delete'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Headers', `https://vercel-cloud-backend-git-main-lukabartos-projects.vercel.app/navbar`);
    res.setHeader('Access-Control-Allow-Headers', `https://vercel-cloud-backend-git-main-lukabartos-projects.vercel.app/getitems`);
    res.setHeader('Access-Control-Allow-Headers', `https://vercel-cloud-backend-git-main-lukabartos-projects.vercel.app/`);
    res.setHeader('Access-Control-Allow-Headers', `https://vercel-cloud-backend-git-main-lukabartos-projects.vercel.app/navbar`);
    next();
  });
  
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
