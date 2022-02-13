//dependencies
const router = require("express").Router();
let { notes } = require("../db/notes.json");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const { validateNoteType, addNewNote } = require("../library/validate");

// GET request
router.get("/notes", (req, res) => {
    //console.log(notes);
    res.json(notes);
});

// POST request
router.post("/notes", (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    } // validate blank s
    if(!validateNoteType(newNote)) {
        return res.status(400).send("Add content to a note!");
    } else { 
        addNewNote(newNote, notes);
        res.json(notes);
    }
  });
  
  // DELETE request
  router.delete("/notes/:id", (req, res) => {
    const exists = notes.some(notes => notes.id === req.params.id);
    if(exists) {
        notes = notes.filter(note => note.id !== req.params.id);
        fs.writeFileSync(path.join(__dirname, "../db/notes.json"), JSON.stringify({
        notes
        }, null, 2));
        res.json(notes);
    } else { //if there is a glitch and it breaks
        res.status(400).send("No matching note found")
    }
  });
  module.exports = router;