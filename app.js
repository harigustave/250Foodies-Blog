const express=require('express');
const morgan = require('morgan');

// Crreate an express app
const app = express();

// Register view engine npm installed for templates to create/render dynamic web contents instead of static web only
app.set('view engine', 'ejs');

//listen for request
app.listen(3000);

//middleware for static files
app.use(express.static('public'));
app.use(morgan('dev'));

// Respond to requests
app.get('/', (req, res)=>{
    const blogs=[
        
    ];
    res.render('home', {title:'Home', blogs:blogs});
});

app.get('/about', (req, res)=>{
    res.render('about', {title:'About Us'});
});

app.get('/blogs/create', (req,res)=>{
    res.render('create', {title:'Create New Blog'});
});

//Set the 404 page
app.use((req,res)=>{
    res.status(404).render('404', {title:'404'});
});