const express = require ('express');
require ('./config/mongo');
const ejs = require('ejs');
const Post = require('./postSchema');

const app = express();


// Serve static files (CSS, JS) from the public directory
app.use(express.static('public'));

// Parse JSON and handle URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Create route for rendering the EJS file
app.get('/', async (req, res) => {
    try {
      // Fetch all posts from the database
      const posts = await Post.find().sort({ createdAt: -1 });
  
      // Render the EJS file with the posts data
      res.render('index', { posts });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Something went wrong.' });
    }
  });

  // Create route for posting a message
     app.post('/posts', async (req, res) => {
    const { name, message } = req.body;
  
    // Validate input
    if (message.length < 25) {
      return res.status(400).send({ error: 'Message must be at least 25 characters long.' });
    }
  
    // Create new post
    const newPost = new Post({ name, message });
  
    try {
      // Save post to database
      await newPost.save();
  
      // Redirect back to the root URL after posting
      res.status(201).redirect('/');
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).send({ error: 'Something went wrong.' });
    }
  });
  

const port = 2000;
app.listen(port, console.log(`app is on ${port}`));




