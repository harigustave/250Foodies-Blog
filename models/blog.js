const mongoose=require('mongoose');
const schema=mongoose.schema;

//Create a Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },

}, {timestamps:true});

//Create a model for the above schema

const Blog = mongoose.model('Blog', blogSchema);
module.exports=Blog;


