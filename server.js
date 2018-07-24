// Get Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';
const session = require('express-session');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret:'feedmeseymour',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({extended:false}));

const blogsController = require('./controllers/blog.js');
app.use('/blogs', blogsController);
const userController = require('./controllers/users.js')
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


app.get('/blog', (req, res)=>{
    if(req.session.currentUser){
        res.json(req.session.currentUser);
    } else {
        res.status(401).json({
            status: 401,
            message: 'not logged in'
        });
    }
})


mongoose.connect(mongoUri,
{ useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...');
});

// Listener
app.listen(port, () => {
  console.log('Listening on port:', port);
})
