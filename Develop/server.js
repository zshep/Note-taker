const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

//variable port to run server
const PORT = process.env.PORT || 3001;
// creating variable for express to use
const app = express();


//midleware for parsing JSON data
app.use(express.json());


//middleware to access public folder
app.use(express.static('public'));
 

        //WHEN I open the Note Taker
        //THEN I am presented with a landing page with a link to a notes page

//Route to Get landing page 
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Route to Get notes pages
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html')),
console.log('go to notes')
);


// listening for the port
app.listen(PORT, () =>
    console.log(`Success! App listeneing at http://localhost:${PORT}`)
);