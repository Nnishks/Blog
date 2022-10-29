
const mongoose= require("mongoose");

const BlogIn = new mongoose.Schema({
    id:{type:Number,required:true},
    title:{type:String,required:true},
    imgUrl:{type:String,required:true},
    description:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:String,required:true},
    name:{type:String,required:true},
    mail:{type:String,required:true}
})

const AddBlogmodel = mongoose.model("Addblog",BlogIn);
module.exports=AddBlogmodel