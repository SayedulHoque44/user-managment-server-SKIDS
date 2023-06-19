const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()


// middleware 
app.use(cors())
app.use(express.json())

// ___________________________________MongoDb Start_____________________________________________

// ___________________________________MongoDb End_____________________________________________


app.get('/', (req, res) => {
  res.send('SKIDS Running')
})

app.listen(port, () => {
  console.log(`SKIDS app listening on port ${port}`)
})