const express = require('express');
const path = require('path'); 
const fs = require('fs');
const db = require('./db/db.json');
const uuid = require('./helpers/uuid'); //unique id middleware
const PORT = process.env.PORT || 3001; //variable port to run server
// creating variable for express to use
const app = express();


//midleware for parsing JSON data
console.log('loading middleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



//Route to Get landing page 
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Route to Get notes pages
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Get request for api/notes
app.get('/api/notes', (req,res) =>{
    res.json({db});
    console.log(db);
    //fs read and parse
    const readData = JSON.parse(fs.readFile('./db/db.json', (err) => {
        err ? console.error(err) : console.log("Success writing notes to db")
    }));
    console.log(readData);
});

// post wrote to write data to db
app.post('/api/notes', (req,res) =>{
    // deconstructing the Notetitle and notetext from request and adding to variable
    const { noteTitle, noteText } = req.body
    const savedNotes = {
        noteTitle,
        noteText,
    }

    
    // variable to hold parsed data of notes
    const noteData = JSON.parse(fs.readFile('./db/db.json', (err) => {
        err ? console.error(err) : console.log("Success writing notes to db")
    }));
    noteData.push(savedNotes);
    //debugging
    console.log(savedNotes);
    console.log(noteData);

    stringyNote = JSON.stringify(noteData)
    //writing data with new added note    
    fs.writeFile('./db/db.json', stringyNote, (err) => {
    err ? console.error(err) : console.log("Success writing notes to db")
    });

    //send savedNOtes
    res.json(savedNotes);

})


// route to delete notes when clicked on trashcan
app.delete('/api/notes/', (req, res) =>{



})



// listening for the port
app.listen(PORT, () =>
    console.log(`Success! App listeneing at http://localhost:${PORT}`)
);