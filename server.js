const express = require('express');
const path = require('path'); 
const fs = require('fs');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001; //variable port to run server
const uniqid = require('uniqid'); //unique npm package


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
    
    fs.readFile('./db/db.json', function(err, data){
        
            res.json(JSON.parse(data))
            
        })        
});

app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// route POST to write data to db
app.post('/api/notes', (req,res) => {
    // deconstructing the Notetitle and notetext from request and adding to variable
    const unique_id = uniqid.time();
    const { title, text } = req.body;
    if (req.body){
    const savedNotes = {
        title,
        text,
        id: unique_id,
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


// route to delete notes when clicked on trashcan
app.delete('/api/notes/:id', (req, res) =>{
    let deleteId = req.params.id
    fs.readFile('./db/db.json', function (err, data) {
        if(err) {
            console.error(err);
        } else {
        //grab the list of notes already there
        let oldArray = JSON.parse(data);
        //create new rray by filtering out the selected id to be deleted
        let newArray = oldArray.filter(object => object.id !== deleteId);
        //rewrite the new array to the db.json
        fs.writeFile('./db/db.json', JSON.stringify(newArray), (err) =>{
            err ? console.error(err) : console.log("Success deleting note")
            });
        }
    //response
    res.sendFile(path.join(__dirname, '.public/notes.html'));
    });
});


// listening for the port
app.listen(PORT, () =>
    console.log(`Success! App listeneing at http://localhost:${PORT}`)
);