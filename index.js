require('dotenv').config()
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORt || 5000;


app.use(cors())
app.use(express.json())

// mongodb connection 


// const verifyToken=(req,res,next)=>{
//   const token=req?.cookies?.token
//   if(!token){
//     return res.send({massage:'unothoris'})
//   }
//   jwt.verify(token,'AD42AEEC73759E8F49FD2B96FF936B0C1D920B5B3D3E6E769281928EB538D1C2',(err,decode)=>{
//     if(err){
//       return res.send({massage:'again login'})
//     }
//     req.user=decode
//     next()
//   })
  
// }


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyv8hzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const database = client.db("task");
    const taskCollections = database.collection("tasks");
 


    

    app.get('/api/tasks', async (req, res) => {
      const curser = taskCollections.find()
      const result = await curser.toArray()
      res.send(result)

    })
    app.post("/api/tasks", async (req, res) => {
        const review = req.body;
        
        const result = await taskCollections.insertOne(review);
        res.send(result);
      });
      app.patch("/api/tasks/:id", async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: { status: status }
        };
    
        const result = await taskCollections.updateOne(query, updateDoc);
        
        if (result.modifiedCount > 0) {
            res.send({ message: "Task status updated successfully", success: true });
        } else {
            res.status(404).send({ message: "Task not found or already updated", success: false });
        }
    });
    app.get('/api/tasks/incomplete', async (req, res) => {
        const cursor = taskCollections.find({ status: "incomplete" }); 
        const result = await cursor.toArray();
        res.send(result);
    });
    app.get('/api/tasks/complete', async (req, res) => {
        const cursor = taskCollections.find({ status: "complete" }); 
        const result = await cursor.toArray();
        res.send(result);
    });
    app.delete('/api/tasks/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const result = await taskCollections.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 1) {
                res.send({ message: "Task deleted successfully" });
            } else {
                res.status(404).send({ message: "Task not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "Error deleting task", error });
        }
    });
    app.patch('/api/tasks/update/:id', async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
    
        try {
            const result = await taskCollections.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
    
            if (result.modifiedCount > 0) {
                res.send({ message: "Task updated successfully" });
            } else {
                res.status(404).send({ message: "Task not found or no changes made" });
            }
        } catch (error) {
            res.status(500).send({ message: "Error updating task", error });
        }
    });
    
    










    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send("This is Task Server")
})

app.listen(port, () => {
  console.log(`surver is running ${port}`)
})
