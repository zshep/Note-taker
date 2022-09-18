const express = require('express');
const path = require('path'); 
const db = require('./db/db.json');
const fs = require('fs');

//variable port to run server
const PORT = process.env.PORT || 3001;
// creating variable for express to use
const app = express();


//midleware for parsing JSON data
console.log('loading middleware');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



//Route to Get landing page 
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get request for api/notes
app.get('/api/notes', (req,res) =>{
    res.json({db});
    console.log(db);
});


//Route to Get notes pages
app.get('/notes', (req, res) =>
  console.log('/notes .get');
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);







// listening for the port
app.listen(PORT, () =>
    console.log(`Success! App listeneing at http://localhost:${PORT}`)
);