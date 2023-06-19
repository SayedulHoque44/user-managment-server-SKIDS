const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware 
app.use(cors())
app.use(express.json())

// ___________________________________MongoDb Start_____________________________________________

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.501jhgk.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
     client.connect();

    // Collection 
    const usersCollection = client.db("skidsDb").collection("users")

    //  User Related 
    // User POST
    app.post('/users',async(req,res)=>{
        const newUser = req.body

        const result = await usersCollection.insertOne(newUser)
        res.send(result)
    })
    // User GET
    app.get('/users',async(req,res)=>{

        const result = await usersCollection.find().toArray()
        res.send(result)
    })
    // User DELETE
    app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await usersCollection.deleteOne(query)
        res.send(result)
    })
    // User PATCH
    app.patch('/users/:id',async(req,res)=>{
        const id = req.params.id
        const user = req.body
        const query = {_id: new ObjectId(id)}
        const updateDoc = {
            $set:{
                name:user.name,
                email:user.email,
                phone_number:user.phone_number
            }
        }
        const result = await usersCollection.updateOne(query,updateDoc)
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// ___________________________________MongoDb End_____________________________________________


app.get('/', (req, res) => {
  res.send('SKIDS Running')
})

app.listen(port, () => {
  console.log(`SKIDS app listening on port ${port}`)
})