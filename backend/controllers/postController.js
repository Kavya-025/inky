const Posts = require('../models/postsModels');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = await Posts.createPost(title, content);

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getPost = async (req, res) => {
    try {
        const posts = await Posts.getPost();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    createPost,
    getPost,    
};