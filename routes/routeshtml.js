//dependencies
const router = require("express").Router();
let { notes } = require("../db/db.json");
//TSIRA - what is wrong witgb the uuid variable setting?
//const uuid = require("uuid");
//const uuidv4 = require('uuid/v4');
const path = require("path");
const fs = require("fs");
const { validateNoteType, addNewNote } = require("../library/validate");

// GET request
router.get("/notes", (req, res) => {
    console.log(notes);
    res.json(notes);
});

// POST request
router.post("/notes", (req, res) => {
    const newNote = {
        //create a random unique identifier id
        //id: uuid.v4(),
        //id: uuidv4,
        id: 1,
        title: req.body.title,
        text: req.body.text
    } // validate blank s
    if(!validateNoteType(newNote)) {
        return res.status(400).send("Add content to a note!");
    } else { 
        //call an add note function from library/validate.js
        addNewNote(newNote, notes);
        res.json(notes);
    }
  });
  
  // DELETE request
  router.delete("/notes/:id", (req, res) => {
    const exists = notes.some(notes => notes.id === req.params.id);
    if(exists) {
        //filter notes collection using an id parameter
        notes = notes.filter(note => note.id !== req.params.id);
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify({
        notes
        }, null, 2));
        res.json(notes);
    } else { //if there is a glitch and it breaks
        res.status(400).send("Note is not found")
    }
  });

  module.exports = router;