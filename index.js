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
const path = require('path');
const fs = require('fs');

mongoose.connect(URI)
.then(()=>{
console.log("Db has been connected successfully");
}).catch((err)=>{
    console.log(err);
})

app.use(cors())

app.use(express.json()) 



app.get('/api/blogs', (req, res) => {
    const filePath = path.join(__dirname, 'db.json');
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);
    res.json(data.blogs);
  });

  
app.post('/api/blogs', (req, res) => {
  console.log(req.body);
  const {title, content, author}= req.body

  const filePath = path.join(__dirname, 'db.json')
  const rawData = fs.readFileSync(filePath)
  const data = JSON.parse(rawData)

  const newBlog = {
    id: data.blogs.length +1,
    title,
    content,
    author
  }

  data.blogs.push(newBlog)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("new blog has been created successfully", newBlog);
});


  app.get('/api/blogs/:id', (req, res) => {
    const filePath = path.join(__dirname, 'db.json');
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);
  
    res.json(data.blogs);
  });


  // ... (existing code)

app.delete('/api/blogs/:id', (req, res) => {
  console.log(req);
  const blogIdToDelete = req.params.id;

  const filePath = path.join(__dirname, 'db.json');
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);

  // Find the index of the blog with the specified id
  const indexToDelete = data.blogs.findIndex(blog => blog.id === parseInt(blogIdToDelete));

  if (indexToDelete !== -1) {
    // Remove the blog from the array
    data.blogs.splice(indexToDelete, 1);

    // Save the modified data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(204).send(); // 204 No Content for successful deletion
  } else {
    res.status(404).send('Blog not found');
  }
});

// ... (remaining code)




app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", allRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))