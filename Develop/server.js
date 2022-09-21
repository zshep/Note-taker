const express = require('express');
const path = require('path'); 
const fs = require('fs');
const db = require('./db/db.json');
const uuid = require('./helpers/uuid'); //unique id middleware
const { stringify } = require('querystring');
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
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
          } else {
            res.json(JSON.parse(data))


          }
    
        });
});



// post wrote to write data to db
app.post('/api/notes', (req,res) => {
    // deconstructing the Notetitle and notetext from request and adding to variable
    const { title, text } = req.body;
    if (req.body){
    const savedNotes = {
        title,
        text
        };
     fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
          } else {
            console.log(data);
            const parsedData = JSON.parse(data);
            parsedData.push(savedNotes);
            console.log(parsedData);
            fs.writeFile('./db/db.json',JSON.stringify(parsedData) , (err) => {
                 err ? console.error(err) : console.log("Success writing notes to db")
                });
                console.log(JSON.stringify(parsedData));
          }
     })

    }else{
        console.log("there was an error");
        }
        res.sendFile(path.join(__dirname, './public/notes.html'));
    })



    // // variable to hold parsed data of notes
    // const noteData = JSON.parse(fs.readFile('./db/db.json', (err) => {
    //     err ? console.error(err) : console.log("Success writing notes to db")
    // }));
    // noteData.push(savedNotes);
    // //debugging
    // console.log(savedNotes);
    // console.log(noteData);

    // stringyNote = JSON.stringify(noteData)
    // //writing data with new added note    
    // fs.writeFile('./db/db.json', stringyNote, (err) => {
    // err ? console.error(err) : console.log("Success writing notes to db")
    // });

    // //send savedNOtes
    // res.json(savedNotes);


// route to delete notes when clicked on trashcan
app.delete('/api/notes/', (req, res) =>{

})


//html routes???


// listening for the port
app.listen(PORT, () =>
    console.log(`Success! App listeneing at http://localhost:${PORT}`)
);