
require('dotenv').config();

const express = require('express')
const cors = require('cors')

const todoRoutes = require('./routes/todoRoutes');
const { initializeDatabase } = require('./db/quires');

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 6000

//db connection
require('./db/connection')
initializeDatabase();

app.use('/api', todoRoutes);

app.get("/", (req,res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})