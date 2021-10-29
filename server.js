import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import todoRoutes from './api/todoRoutes.js';
import { MongoClient } from 'mongodb';
import TodoDAO from './dao/todoDAO.js';

const __dirname = path.resolve();

const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))



//start server and connect to DB
const client = new MongoClient(process.env.ATLAS_URI);
app.listen(port, () => {
    console.log('server listening on port ', port);
    client.connect()
        .then(client => {
            TodoDAO.injectDB(client);
            console.log('connected to DB');
        })
        .catch(err=>console.log('DB error: ', err));
  });

//routes
app.use(todoRoutes);

//send client index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});