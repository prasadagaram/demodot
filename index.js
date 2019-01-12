const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/ram');

// mongoose.connect("localhost:27017/ram",function(err){
//     if(err){
//         console.log("Mongoose connection failed");
//     }
//     console.log("Conneccted to mongodb ram");
// });


const app = express();
const morgan = require('morgan');

let routes = require("./routes");
app.use('/api/v0',routes);

app.use(bodyParser.json());

app.use(morgan('dev'));

app.get("/test", function(req,res){
    res.send("test success");
});




app.listen(8000);
console.log("App running on 8000");

