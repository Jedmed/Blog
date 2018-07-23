const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: String,
	message: String
});

const Blogs = mongoose.model('Blog', blogSchema);

module.exports = Blogs;
