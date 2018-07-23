const express = require('express');
const router = express.Router();
const Blogs = require('../models/blog.js');

// index route
router.get('/', (req, res) => {
	Blogs.find({}, (err, foundBlog) => {
		res.json(foundBlog);
	});
});

// create route
router.post('/', (req, res) => {
	Blogs.create(req.body, (err, createdBlog) => {
		res.json(createdBlog);
	});
});

// delete route
router.delete('/:id', (req, res)=>{
    Blogs.findByIdAndRemove(req.params.id, (err, deletedBlog)=>{
        res.json(deletedBlog);
    });
});

// update route
router.put('/:id', (req, res)=>{
    Blogs.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBlog)=>{
        res.json(updatedBlog);
    });
});

module.exports = router;
