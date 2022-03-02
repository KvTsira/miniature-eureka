//dependencies
const express = require("express");
const fs = require("fs");
let { notes }  = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");
const { validateNoteType, addNewNote } = require("./library/validate");

//setting up servers
const app=express();
var PORT = process.env.PORT || 3001;

//Static Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//settings routes for APIs
//get request 
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

//post request
app.post("/api/notes", (req, res) => {
    const newNote = {
        id: uuid.v4(),
        //id: notes.length + 1,
        title: req.body.title,
        text: req.body.text
      } // Checks if blank 
      if(!validateNoteType(newNote)) {
        return res.status(400).send("The title and the body are required to add a note!");
      } else { // add note
        addNewNote(newNote, notes);
        res.json(notes);
      }
});

//delete request
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("./db/db/json", JSON.stringify(newNotes));
    res.json(newNotes);
});

//call home HTML page
app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//call notes HTML page
app.get("/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//start to listen
app.listen(PORT, function () {
    console.log("App listening on PORT : " + PORT);
});

