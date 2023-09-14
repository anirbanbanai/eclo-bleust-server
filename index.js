const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ndskif7.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // await client.connect();

        const postCollection = client.db('AniBleust').collection('post')
        const usersCollection = client.db('AniBleust').collection('users')

        app.get('/all', async (req, res) => {
            const result = await postCollection.find().toArray();
            res.send(result)
        })
        app.post('/all', async (req, res) => {
            const all = req.body;
            const result = await postCollection.insertOne(all);
            res.send(result)
        })
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result)
        })
        app.post('/users', async (req, res) => {
            const all = req.body;
            const result = await usersCollection.insertOne(all);
            res.send(result)
        })
        // app.patch('/all/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const updateItem = {
        //         $set: {
        //             name,
                 
        //         }
        //     }
        //     const result = await allCollection.updateOne(query, updateItem);
        //     res.send(result)
        // })
        app.delete('/all/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await postCollection.deleteOne(query);
            res.send(result)
        })
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.use('/', (req, res) => {
    res.send('Assignment 12 running')
})
app.listen(port, (req, res) => {
    console.log(`This server running on ${port}`);
})