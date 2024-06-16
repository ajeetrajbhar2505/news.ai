const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

const news = require('./routes/newsRoute')

app.use('/', news);

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);

});





