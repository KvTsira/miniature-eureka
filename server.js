//dependencies
const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const uud = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");
const exp = require("constants");

//setting up servers
const app=express();
var PORT = process.env.PORT || 3001;

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//settings routes for APIs
//get notes 
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

//post notes
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = 1; //uuid.v4();
    notes.push(newNote);
    fs.writeFileSync("./db/db/json", JSON.stringify(notes));
    res.json(notes);
});

//delete a note
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSOB.parse(fs.readFileSync("./db/db.json"));
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

