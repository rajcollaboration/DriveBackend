const express = require( "express");
const bodyParser = require('body-parser');
const app = express();
const post = require("./routes/post.js");

require('./models/index.js');
// app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(express.urlencoded({extended:false}));
const port = 3000;

app.use('/',post);
app.listen(port,()=>{
    console.log("app is running at "+port);
});