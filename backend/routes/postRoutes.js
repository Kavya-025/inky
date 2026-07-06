const express = require('express');
const {createPost, getPost} = require('../controllers/postController');
const router = express.Router();

router.get('/', (req,res)=>{
    getPost(req,res);
});

router.post('/', (req, res)=>{
    createPost(req,res);
}); 
module.exports = router;