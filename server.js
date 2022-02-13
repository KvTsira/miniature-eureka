//dependencies
const express = require("express");
const path = require("path");

//setting up servers
const app = express();
const PORT = process.env.PORT || 3001;

const routesAPI = require("./routes/routesapi");
const routesHTML = require("./routes/routeshtml");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join (__dirname, "public")));

app.use("/api", routesAPI);
app.use("/", routesHTML);


app.listen(PORT, () => { 
    console.log(`App listening on: ${PORT}`);
});