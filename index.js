const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json({limit:"20mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"20mb", extended: true}));

app.use(cors());

const port = process.env.PORT || 5000;
require('./route/auth')(app);
require('./route/product')(app);
require('./route/user')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
  });

app.listen(port, () => 
        console.log(`Application running on port: ${port}`)
);

