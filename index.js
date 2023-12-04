const express = require('express')
const app = express()
const env = require("dotenv").config()
port = process.env.port
URI = process.env.URI
URITWO = process.env.URITWO
const cors = require("cors")
const allRoutes = require("./Routes/user.route")
const mongoose= require('mongoose')
const bodyParser = require('body-parser');


mongoose.connect(URI)
.then(()=>{
console.log("Db has been connected successfully");
}).catch((err)=>{
    console.log(err);
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) 
app.use("/user", allRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))