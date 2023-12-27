const express=require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog=require('./models/blog');

// Crreate an express app
const app = express();

//Connect to mongodb
const dbURI='mongodb+srv://admin:test1234@atlascluster.3daymde.mongodb.net/foodieblogdb?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=> console.log(err));

// Register view engine npm installed for templates to create/render dynamic web contents instead of static web only
app.set('view engine', 'ejs');


//middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));  //to allow parsing of requests through body
app.use(morgan('dev'));


// Respond to requests
app.get('/', (req, res)=>{
    res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
    res.render('about', {title:'About Us'});
});

app.get('/blogs/create', (req,res)=>{
    res.render('create', {title:'Create New Recipe'});
});

app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt:-1}) //Find blogs sorted in descending order
    .then((result)=>{
        res.render('home',{title: 'Home', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    });
});

// Create a blog
app.post('/blogs', (req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
});

//Get specific blog by id
app.get('/blogs/:id', (req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details', {blog: result, title: 'Recipe Details'})
    })
    .catch((err)=>{
        console.log(err)
    });
});

app.delete('/blogs/:id', (req, res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'})
    })
    .catch(err=>{
        console.log(err);
    });
});

//Set the 404 page
app.use((req,res)=>{
    res.status(404).render('404', {title:'404'});
});