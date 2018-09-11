const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profil = require('./routes/api/profil');
const posts = require('./routes/api/posts');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connection to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => res.send('Lets play ma gueule'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profil', profil);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));