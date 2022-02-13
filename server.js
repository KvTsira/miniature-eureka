//dependencies
const express = require("express");
const fs = require("fs");

//assign express to an app variable
const app = express();


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });