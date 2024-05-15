const express = require("express");
const morgan = require("morgan");
const { connectDB } = require("./db/mongod");
const Blog = require('./models/blog')

const app = express();

connectDB();

// register view engine
app.set("view engine", "ejs");

// listen for request
app.listen(3000);

// middleware and static files

// app.use((req, res, next) => {
//   console.log('New request made: ');
//   console.log('Host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// })

// app.use((req, res, next) => {
//   console.log("In the next middleware");
//   next();
// })

app.use(express.static("public"));
//  morgon for middleware
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => { 
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
      
    })
})

app.get("/", (req, res) => {
  const blogs = [
    // {title: "School event tommorrow", snippet: "HOD giving volunteer free sovernier"},
    // {title: "School event tommorrow", snippet: "HOD giving volunteer free sovernier"},
    // {title: "School event tommorrow", snippet: "HOD giving volunteer free sovernier"}
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
