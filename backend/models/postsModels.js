const mongoose = require('mongoose');   

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200,
    },
    content:{
        type: String,
        required: true,
        trim: true,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    modifiedAt:{
        type: Date,
        default: Date.now,
    },
});

postSchema.statics.createPost = async function (title, content){
    try {
        const post = new this({
        title, 
        content
    });
    const newpost = await post.save();
    return newpost;
    } catch (error){
        throw new Error('Error creating post: '+ error.message);
    }
}

postSchema.statics.getPost = async function (){
    try {
        const posts = await this.find();
        return posts;
    }catch (error){
        throw new Error ('error getting posts: '+error.message);    
    }
}

const postModel = mongoose.model('Posts',postSchema);


module.exports = postModel;
