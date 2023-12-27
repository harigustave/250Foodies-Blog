const express=require('express');
const router=express.Router();
const Blog=require('../models/blog');

router.get('/create', (req,res)=>{
    res.render('create', {title:'Create New Recipe'});
});

router.get('/', (req, res)=>{
    Blog.find().sort({createdAt:-1}) //Find blogs sorted in descending order
    .then((result)=>{
        res.render('home',{title: 'Home', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    });
});

// Create a blog
router.post('/', (req,res)=>{
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
router.get('/:id', (req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details', {blog: result, title: 'Recipe Details'})
    })
    .catch((err)=>{
        console.log(err)
    });
});

router.delete('/:id', (req, res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'})
    })
    .catch(err=>{
        console.log(err);
    });
});

module.exports=router;