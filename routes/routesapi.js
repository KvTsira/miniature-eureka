
// Dependencies
const path = require("path");
const router = require("express").Router();

// GET index page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/", "index.html"));
});

// GET notes page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "notes.html"));
});

// GET all notes using wild card
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = router;